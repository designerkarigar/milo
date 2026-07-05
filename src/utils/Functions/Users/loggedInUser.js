import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { auth } from "../../../firebase";
import { onAuthStateChanged } from "firebase/auth";

// Helper function to wait for auth to be ready
const waitForAuth = () => {
  return new Promise((resolve) => {
    if (auth.currentUser) {
      resolve(auth.currentUser);
      return;
    }
    
    // Wait for auth state to be ready
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe(); // Unsubscribe after first change
      resolve(user);
    });
    
    // Timeout after 5 seconds
    setTimeout(() => {
      unsubscribe();
      resolve(auth.currentUser);
    }, 5000);
  });
};

// Helper function to get auth token (Firebase or localStorage)
const getAuthToken = async () => {
  // Wait for auth to be ready first
  const currentUser = await waitForAuth();
  
  if (currentUser) {
    try {
      const token = await currentUser.getIdToken();
      return token;
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }
  }
  
  // Fallback to localStorage token
  const idToken = localStorage.getItem("idToken");
  return idToken;
};

export const loggedInUser = async () => {
  const token = await getAuthToken();
  
  if (!token) {
    throw new Error("No authentication token available");
  }

  const config = {
    headers: {
      token: token,
    },
  };
  
  try {
    const user = await axios.get(BaseUrl + "/loggedInUser", config);
    return user.data?.response?.record || user.data?.record || user.data;
  } catch (err) {
    throw new Error("Network Error");
  }
};
