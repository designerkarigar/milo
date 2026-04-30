import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { uploadBlogContentToS3 } from "./uploadBlogContentToS3";

export const updateBlog = async (data, id) => {
  const idToken = localStorage.getItem("idToken");

  const config = {
    headers: {
      token: idToken,
    },
  };

  const payload = {
    title: data.heading,
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
    await axios.put(BaseUrl + `/blogs/${id}`, payload, config);
    if (id && data?.rawHtml) {
      await uploadBlogContentToS3({
        blogId: id,
        htmlContent: data.rawHtml,
      });
    }
    alert("updated sucess");
  } catch (error) {
    throw new Error(error);
  }
};
