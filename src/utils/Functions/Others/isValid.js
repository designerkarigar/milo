import { SetValueInLocalStorage, Zero } from "./Setter_GetterLocalStorage";

export const isValid = () => {
  setTimeout(() => {
    console.log("logging out");
    SetValueInLocalStorage("token", Zero);
    console.log(localStorage.getItem("idToken"));
  }, 1800000);
};
