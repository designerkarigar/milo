import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const deleteBlog = async (id) => {
  const idToken = localStorage.getItem("idToken");

  const config = {
    headers: {
      token: idToken,
    },
  };
  try {
    await axios.delete(BaseUrl + `/blogs/${id}`, config);
  } catch (error) {
    throw new Error(error);
  }
};
