import axios from "axios";
import {
  SetValueInLocalStorage,
  Union,
} from "../Others/Setter_GetterLocalStorage";
import { isValid } from "../Others/isValid";
import { getUserInfo } from "../Users/getUserInfo";
import { BaseUrl } from "../../Constants/Url";
import { loggedInUser } from "../Users/loggedInUser";

export const _Login = async (username, password) => {
  try {
    const payload = {
      username: username,
      password: password,
    };

    const user = await axios.post(BaseUrl + "/auth/signIn", payload);
    const idToken = user.data.response.AuthenticationResult.IdToken;
    localStorage.setItem("idToken", idToken);
    const userInfo = await loggedInUser();
    localStorage.setItem("username", userInfo.userName);
    localStorage.setItem("role", userInfo.role);
    SetValueInLocalStorage("token", Union);
    isValid();
  } catch (error) {
    throw new Error(error);
  }
};
