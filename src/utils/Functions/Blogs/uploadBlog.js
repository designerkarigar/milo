import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getDate } from "../Others/getDate";

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
    await axios.post(BaseUrl + `/blogs`, payload, config);
    alert("Success Uploading");
  } catch (error) {
    throw new Error(error);
  }
};
