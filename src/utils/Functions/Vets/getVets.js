import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { auth } from "../../../firebase";

// Helper function to get auth token (Firebase or localStorage)
const getAuthToken = async () => {
  // First try to get Firebase token
  const currentUser = auth.currentUser;
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

export const getVets = async (pageNo = 0, pageSize = 20) => {
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
    const userInfo = await axios.get(
      BaseUrl + `/vets?useQueryFilter=true&pageNo=${pageNo}&pageSize=${pageSize}`,
      config
    );
    
    // Return full record data for display
    return userInfo.data.response.record || [];
  } catch (err) {
    throw new Error(err);
  }
};
