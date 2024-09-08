import {
  SetValueInLocalStorage,
  Zero,
  key,
} from "../Others/Setter_GetterLocalStorage";
const { Auth } = require("aws-amplify");

export const _Logout = async () => {
  try {
    await Auth.signOut();
    console.log("sucess logout");
    localStorage.setItem("idToken", "0");
    SetValueInLocalStorage(key, Zero);
    localStorage.setItem("username", "none");
    localStorage.setItem("role", "");
  } catch (error) {
    throw new Error("Error Signing Out");
  }
};
