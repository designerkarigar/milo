import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getAuthToken } from "./getAuthToken";

export const detectPetFromImage = async (url) => {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("No authentication token available");
  }

  const response = await axios.put(
    `${BaseUrl}/aiOperations/petDetection`,
    { url },
    {
      headers: {
        token,
      },
    }
  );

  return response?.data?.response?.record || null;
};

