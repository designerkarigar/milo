import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const uploadImage = async (file) => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };
  const payload = {
    type: "blogs",
    contentType: "image/jpeg",
    name: "blog-image",
    base64Data: file,
  };
  try {
    const res = await axios.post(
      BaseUrl + "/commonOperations/uploadFile",
      payload,
      config
    );
    return res.data.response.record.url;
  } catch (error) {
    throw new Error(error);
  }
};
