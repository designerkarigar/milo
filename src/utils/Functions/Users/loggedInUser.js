import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const loggedInUser = async () => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };
  try {
    const user = await axios.get(BaseUrl + "/loggedInUser", config);
    return user.data.response.record;
  } catch (err) {
    throw new Error("Network Error");
  }
};
