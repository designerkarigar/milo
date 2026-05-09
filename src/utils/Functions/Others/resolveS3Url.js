import { StaticMediaBaseUrl } from "../../Constants/Url";

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

