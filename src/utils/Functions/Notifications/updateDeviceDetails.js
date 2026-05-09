import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getAuthToken } from "../Pets/getAuthToken";

/**
 * Upsert device details for the current user.
 */
export async function updateDeviceDetails(payload) {
  const token = await getAuthToken();
  if (!token) throw new Error("No authentication token available");

  // Milo backend: PUT /v1/userOperations/updateDeviceDetails
  // `BaseUrl` already contains `/v1`.
  const response = await axios.put(`${BaseUrl}/userOperations/updateDeviceDetails`, payload, {
    headers: {
      token,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  return response?.data?.response?.record || null;
}

