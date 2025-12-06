import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const updateNGO = async (uid, data) => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.put(
      BaseUrl + `/ngo/${uid}`,
      data,
      config
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

