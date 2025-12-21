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
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    });
    
    setTimeout(() => {
      unsubscribe();
      resolve(auth.currentUser);
    }, 5000);
  });
};

// Helper function to get auth token
const getAuthToken = async () => {
  const currentUser = await waitForAuth();
  
  if (currentUser) {
    try {
      const token = await currentUser.getIdToken();
      return token;
    } catch (error) {
      console.error("Error getting Firebase token:", error);
    }
  }
  
  const idToken = localStorage.getItem("idToken");
  return idToken;
};

export const getBookings = async (pageNo = 0, pageSize = 20) => {
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
      BaseUrl + `/bookings?useQueryFilter=true&pageNo=${pageNo}&pageSize=${pageSize}`,
      config
    );
    
    return response.data.response.record || [];
  } catch (err) {
    console.error("Error fetching bookings:", err);
    throw new Error(err.response?.data?.message || "Failed to fetch bookings");
  }
};

