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

export const getPetById = async (petId) => {
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
    const response = await axios.get(
      BaseUrl + `/pets/${petId}`,
      config
    );
    
    // Return the pet record (first item in array)
    const petData = response.data.response.record;
    if (Array.isArray(petData) && petData.length > 0) {
      return petData[0];
    }
    return null;
  } catch (err) {
    console.error("Error fetching pet by ID:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch pet details");
  }
};

