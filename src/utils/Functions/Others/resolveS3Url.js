import { StaticMediaBaseUrl } from "../../Constants/Url";

export const resolveS3Url = (url) => {
  if (!url || typeof url !== "string") return "";
  if (url.startsWith("data:") || url.startsWith("blob:")) return url;
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${StaticMediaBaseUrl}${url}`;
};

