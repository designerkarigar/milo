import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const deleteUser = async (cognitoUserName) => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };
  try {
    const userInfo = await axios.delete(
      BaseUrl +
        `/cognitoAdminOperations/deleteUser?username=${cognitoUserName}`,
      config
    );
    return;
  } catch (err) {
    throw new Error(err);
  }
};
