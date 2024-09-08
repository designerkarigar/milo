export const ImageExtract = async (content) => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(content, "text/html");
  const firstImage = doc.querySelector("img");

  if (firstImage) {
    const src = firstImage.src;
    const base64image = src.split(",")[1];
    return base64image;
  } else {
    console.log("no image in the document");
  }
};
