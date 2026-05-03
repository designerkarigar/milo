import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";

const waitForAuth = () =>
  new Promise((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });

    setTimeout(() => {
      unsubscribe();
      resolve(auth.currentUser);
    }, 5000);
  });

export const getAuthToken = async () => {
  const currentUser = await waitForAuth();
  if (currentUser) {
    try {
      return await currentUser.getIdToken();
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }
  }
  return localStorage.getItem("idToken");
};

