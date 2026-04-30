import { Auth, Storage } from "aws-amplify";

const S3_BUCKET = "milo-s3-bucket-25";
const S3_REGION = "ap-south-1";
const COGNITO_USER_POOL_ID = "ap-south-1_HSc9Q5dtl";

function userIdFromToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 2) return null;

  try {
    const payload = JSON.parse(atob(parts[1].replace(/-/g, "+").replace(/_/g, "/")));
    return payload?.sub || payload?.["cognito:username"] || payload?.username || null;
  } catch {
    return null;
  }
}

async function ensureAwsCredentials(idToken) {
  if (!idToken || idToken === "0") {
    throw new Error("Missing idToken for blog content upload");
  }

  const existingCreds = await Auth.currentCredentials().catch(() => null);
  if (existingCreds?.accessKeyId) return;

  const provider = `cognito-idp.${S3_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`;
  await Auth.federatedSignIn(
    provider,
    {
      token: idToken,
      expires_at: Date.now() + 55 * 60 * 1000,
    },
    {
      name: localStorage.getItem("username") || "user",
    }
  );
}

export const uploadBlogContentToS3 = async ({ blogId, htmlContent }) => {
  if (!blogId) {
    throw new Error("Missing blog id for content upload");
  }

  if (typeof htmlContent !== "string" || !htmlContent.length) {
    throw new Error("Missing html content for blog upload");
  }

  const idToken = localStorage.getItem("idToken");
  const userFolder =
    localStorage.getItem("username") || userIdFromToken(idToken) || "anonymous";
  const key = `${userFolder}/blogs/${blogId}/0/more`;
  const htmlBlob = new Blob([htmlContent], { type: "text/html" });

  await ensureAwsCredentials(idToken);
  try {
    await Storage.put(key, htmlBlob, {
      contentType: "text/html",
      level: "public",
      bucket: S3_BUCKET,
      region: S3_REGION,
      customPrefix: {
        public: "",
      },
    });
  } catch (error) {
    const message = String(error?.message || error);
    if (!message.includes("SignatureDoesNotMatch")) {
      throw error;
    }

    // Retry once without explicit contentType to avoid signature/header drift.
    await Storage.put(key, htmlBlob, {
      level: "public",
      bucket: S3_BUCKET,
      region: S3_REGION,
      customPrefix: {
        public: "",
      },
    });
  }

  return key;
};

