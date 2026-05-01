import { fetchContent } from "./fetchContent";

function firstImageFromHtml(html) {
  if (!html || typeof html !== "string") return "";
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.querySelector("img")?.getAttribute("src") || "";
  } catch {
    return "";
  }
}

export const getBlogThumbnailUrl = async (blog, defaultThumbnail) => {
  const contentPhoto =
    blog?.photos?.find((photoData) => photoData?.type === "content") ||
    blog?.photos?.[0];
  const fallbackPhotoUrl = contentPhoto?.url || defaultThumbnail;

  if (!contentPhoto?.url) {
    return defaultThumbnail;
  }

  try {
    const html = await fetchContent(contentPhoto.url);
    return firstImageFromHtml(html) || fallbackPhotoUrl;
  } catch {
    return fallbackPhotoUrl;
  }
};
