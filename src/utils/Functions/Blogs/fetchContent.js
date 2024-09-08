import { BaseUrlS3 } from "../../Constants/Url";

export const fetchContent = async (contentURL) => {
  return await fetch(BaseUrlS3 + contentURL)
    .then((res) => res.text())
    .then((html) => {
      return html;
    })
    .catch((error) => {
      throw new Error("There was a error in fetching content :-" + error);
    });
};
