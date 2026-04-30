import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

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

/**
 * Quill passes a data URL for inserted images. Backend expects raw base64 and matching contentType.
 */
function payloadFromDataUrl(dataUrl) {
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

  return {
    type: "IMAGE",
    contentType: mime,
    name: `blog-image.${extForMime(mime)}`,
    base64Data,
  };
}

export const uploadImage = async (file) => {
  let source = file;

  if (typeof source === "string" && source.startsWith("blob:")) {
    source = await blobUrlToDataUrl(source);
  }

  const payload = payloadFromDataUrl(source);
  if (!payload) {
    throw new Error("Could not read image data for upload");
  }

  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };

  try {
    const res = await axios.post(
      BaseUrl + "/commonOperations/uploadFile",
      payload,
      config
    );

    const url =
      res.data?.response?.record?.url ??
      res.data?.response?.record?.URL ??
      res.data?.response?.url;

    if (!url) {
      console.error("Unexpected upload response shape", res.data);
      throw new Error("Upload succeeded but no image URL was returned");
    }

    return url;
  } catch (error) {
    const message =
      error?.response?.data?.message ??
      error?.response?.data?.error ??
      error?.message ??
      String(error);
    throw new Error(message);
  }
};
