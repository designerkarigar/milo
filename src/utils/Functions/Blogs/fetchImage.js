import { BaseUrlS3 } from "../../Constants/Url";

export const fetchImage = async (url) => {
  return await fetch(BaseUrlS3 + url)
    .then(async (response) => {
      const res = await response.text();
    })

    .catch((error) => {
      console.error(error);
    });
};
