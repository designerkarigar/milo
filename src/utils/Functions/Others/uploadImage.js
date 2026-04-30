import { Auth, Storage } from "aws-amplify";
import { resolveS3Url } from "./resolveS3Url";

const S3_BUCKET = "milo-s3-bucket-25";
const S3_REGION = "ap-south-1";
const COGNITO_USER_POOL_ID = "ap-south-1_HSc9Q5dtl";

const MIME_TO_EXT = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
  "image/webp": "webp",
};

function extForMime(mime) {
  const key = (mime || "").toLowerCase();
  return MIME_TO_EXT[key] || "jpg";
}

/** Read blob: URL into a data URL so we can extract base64 + mime (Quill may use blob URLs). */
function blobUrlToDataUrl(blobUrl) {
  return fetch(blobUrl)
    .then((r) => r.blob())
    .then(
      (blob) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );
}

function fileFromDataUrl(dataUrl) {
  if (typeof dataUrl !== "string" || !dataUrl.startsWith("data:")) {
    return null;
  }
  const comma = dataUrl.indexOf(",");
  if (comma === -1) return null;

  const header = dataUrl.slice(5, comma);
  let body = dataUrl.slice(comma + 1);
  const segments = header.split(";").map((s) => s.trim());
  const mime = segments[0] || "image/jpeg";
  const isBase64 = segments.includes("base64");

  let base64Data = body.replace(/\s/g, "");
  if (!isBase64) {
    try {
      base64Data = btoa(unescape(encodeURIComponent(decodeURIComponent(body))));
    } catch {
      base64Data = btoa(unescape(encodeURIComponent(body)));
    }
  }

  const binary = atob(base64Data);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }

  return {
    blob: new Blob([bytes], { type: mime }),
    contentType: mime,
    ext: extForMime(mime),
  };
}

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

function encodedS3Key(key) {
  return key
    .split("/")
    .map((part) => encodeURIComponent(part))
    .join("/");
}

async function ensureAwsCredentials(idToken) {
  if (!idToken || idToken === "0") {
    throw new Error("Missing idToken for S3 upload");
  }

  const existingCreds = await Auth.currentCredentials().catch(() => null);
  if (existingCreds?.accessKeyId) {
    return existingCreds;
  }

  const provider = `cognito-idp.${S3_REGION}.amazonaws.com/${COGNITO_USER_POOL_ID}`;
  await Auth.federatedSignIn(
    provider,
    {
      token: idToken,
      // Keep enough buffer while avoiding stale credentials.
      expires_at: Date.now() + 55 * 60 * 1000,
    },
    {
      name: localStorage.getItem("username") || "user",
    }
  );

  const creds = await Auth.currentCredentials();
  if (!creds?.accessKeyId) {
    throw new Error("Unable to obtain AWS credentials for direct S3 upload");
  }
  return creds;
}

export const uploadImage = async (file) => {
  let source = file;

  if (typeof source === "string" && source.startsWith("blob:")) {
    source = await blobUrlToDataUrl(source);
  }

  const fileData = fileFromDataUrl(source);
  if (!fileData) {
    throw new Error("Could not read image data for upload");
  }

  const idToken = localStorage.getItem("idToken");
  const userId =
    localStorage.getItem("username") || userIdFromToken(idToken) || "anonymous";
  const key = `${userId}/images/${Date.now()}-${Math.round(
    Math.random() * 1e9
  )}.${fileData.ext}`;

  try {
    await ensureAwsCredentials(idToken);

    await Storage.put(key, fileData.blob, {
      contentType: fileData.contentType,
      level: "public",
      bucket: S3_BUCKET,
      region: S3_REGION,
      customPrefix: {
        public: "",
      },
    });

    return resolveS3Url(encodedS3Key(key));
  } catch (error) {
    const message =
      error?.response?.data?.message ??
      error?.response?.data?.error ??
      error?.message ??
      String(error);
    throw new Error(message);
  }
};
