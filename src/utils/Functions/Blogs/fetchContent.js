import { resolveS3Url } from "../Others/resolveS3Url";
import { Auth, Storage } from "aws-amplify";

const S3_BUCKET = "milo-s3-bucket-25";
const S3_REGION = "ap-south-1";
const COGNITO_USER_POOL_ID = "ap-south-1_HSc9Q5dtl";
const CLOUDFRONT_HOST = (() => {
  const raw = process.env.REACT_APP_CLOUDFRONT_URL || "";
  if (!raw) return "";
  try {
    return new URL(raw).hostname;
  } catch {
    return raw.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
})();

function keyFromS3Url(urlOrKey) {
  if (!urlOrKey) return "";
  if (!urlOrKey.startsWith("http://") && !urlOrKey.startsWith("https://")) {
    return urlOrKey.replace(/^\/+/, "");
  }

  try {
    const parsed = new URL(urlOrKey);
    const host = parsed.hostname;
    const path = parsed.pathname.replace(/^\/+/, "");

    if (host.startsWith(`${S3_BUCKET}.s3.`)) {
      return path;
    }

    if (host.includes("s3.") && path.startsWith(`${S3_BUCKET}/`)) {
      return path.slice(`${S3_BUCKET}/`.length);
    }

    if (CLOUDFRONT_HOST && host === CLOUDFRONT_HOST) {
      return path;
    }

    return path;
  } catch {
    return urlOrKey;
  }
}

async function ensureAwsCredentialsForRead() {
  const existingCreds = await Auth.currentCredentials().catch(() => null);
  if (existingCreds?.accessKeyId) return;

  const idToken = localStorage.getItem("idToken");
  if (!idToken || idToken === "0") {
    throw new Error("Missing auth token to read private S3 content");
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

function isS3CandidateUrl(url) {
  if (!url || typeof url !== "string") return false;
  if (url.startsWith("data:") || url.startsWith("blob:")) return false;
  if (!url.startsWith("http://") && !url.startsWith("https://")) return true;

  try {
    const parsed = new URL(url);
    const host = parsed.hostname;
    const path = parsed.pathname.replace(/^\/+/, "");
    if (host.startsWith(`${S3_BUCKET}.s3.`)) return true;
    if (host.includes("s3.") && path.startsWith(`${S3_BUCKET}/`)) return true;
    return false;
  } catch {
    return false;
  }
}

async function toSignedS3Url(urlOrKey) {
  const key = keyFromS3Url(urlOrKey);
  if (!key) return urlOrKey;
  try {
    const signed = await Storage.get(key, {
      level: "public",
      bucket: S3_BUCKET,
      region: S3_REGION,
      customPrefix: {
        public: "",
      },
    });
    return signed || resolveS3Url(urlOrKey);
  } catch {
    return resolveS3Url(urlOrKey);
  }
}

async function signEmbeddedImageUrls(html) {
  if (!html || typeof html !== "string") return html;
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  const images = Array.from(doc.querySelectorAll("img"));
  if (!images.length) return html;

  await Promise.all(
    images.map(async (img) => {
      const src = img.getAttribute("src") || "";
      if (!isS3CandidateUrl(src)) return;
      const signed = await toSignedS3Url(src);
      if (signed) img.setAttribute("src", signed);
    })
  );

  return doc.body.innerHTML;
}

export const fetchContent = async (contentURL) => {
  const publicUrl = resolveS3Url(contentURL);
  try {
    const response = await fetch(publicUrl);
    if (response.ok) {
      const html = await response.text();
      return await signEmbeddedImageUrls(html);
    }

    if (response.status !== 401 && response.status !== 403) {
      throw new Error(`HTTP ${response.status} while fetching blog content`);
    }
  } catch (error) {
    if (
      !String(error?.message || error).includes("HTTP 401") &&
      !String(error?.message || error).includes("HTTP 403")
    ) {
      throw new Error("There was a error in fetching content :-" + error);
    }
  }

  try {
    await ensureAwsCredentialsForRead();
    const key = keyFromS3Url(contentURL);
    const signedUrl = await Storage.get(key, {
      level: "public",
      bucket: S3_BUCKET,
      region: S3_REGION,
      customPrefix: {
        public: "",
      },
    });
    const signedResponse = await fetch(signedUrl);
    if (!signedResponse.ok) {
      throw new Error(`HTTP ${signedResponse.status} while fetching signed content`);
    }
    const html = await signedResponse.text();
    return await signEmbeddedImageUrls(html);
  } catch (error) {
    throw new Error("There was a error in fetching content :-" + error);
  }
};
