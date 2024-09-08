import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const disableUser = async (cognitoUsername) => {
  const idToken = localStorage.getItem("idToken");
  const payload = {
    username: cognitoUsername,
  };
  const config = {
    headers: {
      token: idToken,
    },
  };
  try {
    const userInfo = await axios.put(
      BaseUrl + `/cognitoAdminOperations/disableUser`,
      config,
      payload
    );
    return userInfo.data.response.record[0];
  } catch (err) {
    throw new Error(err);
  }
};
