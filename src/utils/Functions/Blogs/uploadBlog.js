import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getDate } from "../Others/getDate";
import { uploadBlogContentToS3 } from "./uploadBlogContentToS3";

export const uploadBlog = async (data) => {
  const idToken = localStorage.getItem("idToken");

  const config = {
    headers: {
      token: idToken,
    },
  };

  const payload = {
    title: data.heading,
    time: getDate(),
    photos: [
      {
        image: data.content,
        isProfile: false,
        type: "content",
        contentType: "text/html",
      },
    ],
  };

  try {
    const response = await axios.post(BaseUrl + `/blogs`, payload, config);
    const createdBlogId =
      response?.data?.response?.record?.uid ||
      response?.data?.response?.record?.[0]?.uid ||
      response?.data?.response?.uid;

    if (createdBlogId && data?.rawHtml) {
      await uploadBlogContentToS3({
        blogId: createdBlogId,
        htmlContent: data.rawHtml,
      });
    }
    alert("Success Uploading");
  } catch (error) {
    throw new Error(error);
  }
};
