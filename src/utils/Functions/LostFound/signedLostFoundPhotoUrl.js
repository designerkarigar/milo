import { Auth, Storage } from "aws-amplify";
import { parseAwsS3HttpUrlToObjectKey } from "../Others/resolveS3Url";

const S3_BUCKET = "milo-s3-bucket-25";
const S3_REGION = "ap-south-1";
const COGNITO_USER_POOL_ID = "ap-south-1_HSc9Q5dtl";

async function ensureAwsCredentialsForRead() {
  const existingCreds = await Auth.currentCredentials().catch(() => null);
  if (existingCreds?.accessKeyId) return;

  const idToken = localStorage.getItem("idToken");
  if (!idToken || idToken === "0") {
    throw new Error("Missing auth token to read S3 content");
  }

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

/**
 * When public CloudFront URL 404s or is blocked, try Amplify signed URL for the same object key.
 * @param {string} keyOrUrl — Storage object key, or full S3 HTTPS URL (path-style / virtual-hosted).
 */
export async function tryGetSignedPublicUrl(keyOrUrl) {
  if (!keyOrUrl || typeof keyOrUrl !== "string") return "";
  if (keyOrUrl.startsWith("data:")) return keyOrUrl;

  let key = keyOrUrl.trim();
  if (key.startsWith("http://") || key.startsWith("https://")) {
    const extracted = parseAwsS3HttpUrlToObjectKey(key);
    if (!extracted) return "";
    key = extracted;
  }

  try {
    await ensureAwsCredentialsForRead();
  } catch {
    /* try Storage.get anyway */
  }

  try {
    const signed = await Storage.get(key, {
      level: "public",
      bucket: S3_BUCKET,
      region: S3_REGION,
      customPrefix: {
        public: "",
      },
    });
    return typeof signed === "string" ? signed : "";
  } catch {
    return "";
  }
}
