export const getHeading = (value) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = value;
  const headingElement = tempDiv.querySelector("h1");
  return headingElement ? headingElement.textContent : "Default heading";
};
