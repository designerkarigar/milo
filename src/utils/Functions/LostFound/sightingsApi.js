import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getAuthToken } from "../Pets/getAuthToken";

export async function createSighting(reportId, payload) {
  if (!reportId) throw new Error("Missing reportId");
  const token = await getAuthToken().catch(() => "");
  if (!token) throw new Error("No authentication token available");

  const response = await axios.post(`${BaseUrl}/reports/${reportId}/sightings`, payload, {
    headers: {
      token,
      "Content-Type": "application/json",
      accept: "application/json",
    },
  });

  return response?.data?.response?.record || null;
}

