import { StaticMediaBaseUrl } from "../../Constants/Url";

/**
 * Extract S3 object key from a full HTTPS URL (path-style or virtual-hosted).
 * Path-style: https://s3.<region>.amazonaws.com/<bucket>/<key segments...>
 * Virtual-hosted: https://<bucket>.s3.<region>.amazonaws.com/<key segments...>
 */
export function parseAwsS3HttpUrlToObjectKey(url) {
  if (!url || typeof url !== "string") return "";
  const u = url.trim();
  if (!u.startsWith("http://") && !u.startsWith("https://")) return "";
  try {
    const parsed = new URL(u);
    const host = parsed.hostname.toLowerCase();
    const segments = parsed.pathname.split("/").filter(Boolean);
    if (!segments.length) return "";

    // Path-style: s3.ap-south-1.amazonaws.com/bucket/key/...
    if (host.startsWith("s3.") && host.endsWith(".amazonaws.com") && segments.length >= 2) {
      return segments.slice(1).join("/");
    }

    // Virtual-hosted: bucket.s3.ap-south-1.amazonaws.com/key/...
    const vh = host.match(/^([^.]+)\.s3[.-][a-z0-9-]+\.amazonaws\.com$/i);
    if (vh && segments.length >= 1) {
      return segments.join("/");
    }
  } catch {
    /* ignore */
  }
  return "";
}

/** Encode each path segment (@, spaces, etc.) without breaking slashes — matches uploadImage encodedS3Key. */
function encodeRelativeMediaPath(path) {
  const trimmed = path.replace(/^\/+/, "");
  return trimmed
    .split("/")
    .filter((seg) => seg.length > 0)
    .map((segment) => {
      try {
        return encodeURIComponent(decodeURIComponent(segment));
      } catch {
        return encodeURIComponent(segment);
      }
    })
    .join("/");
}

export const resolveS3Url = (url) => {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("data:") || url.startsWith("blob:")) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;

  const base = StaticMediaBaseUrl.endsWith("/")
    ? StaticMediaBaseUrl
    : `${StaticMediaBaseUrl}/`;
  return `${base}${encodeRelativeMediaPath(url)}`;
};

/**
 * Use for `<img src>`: Milo APIs often return raw S3 HTTPS URLs that browsers cannot load (private bucket).
 * When the URL is path-style or virtual-hosted S3, rewrite to CloudFront (`resolveS3Url` on object key).
 */
export function resolveS3UrlForDisplay(value) {
  if (!value || typeof value !== "string") return "";
  const s = value.trim();
  if (!s) return "";
  if (s.startsWith("data:") || s.startsWith("blob:")) return s;
  if (s.startsWith("http://") || s.startsWith("https://")) {
    const key = parseAwsS3HttpUrlToObjectKey(s);
    if (key) return resolveS3Url(key);
    return s;
  }
  return resolveS3Url(s);
}
