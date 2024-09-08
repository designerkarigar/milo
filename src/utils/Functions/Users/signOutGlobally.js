import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const signOutUserGlobally = async (cognitoUsername) => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };
  try {
    const userInfo = await axios.put(
      BaseUrl +
        `/cognitoAdminOperations/signoutUserGlobally?username=${cognitoUsername}`,
      config
    );
    return;
  } catch (err) {
    throw new Error(err);
  }
};
