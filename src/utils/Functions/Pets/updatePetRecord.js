import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getAuthToken } from "./getAuthToken";

/**
 * PUT /pets/:id — body uses storage field names (e.g. availableForAdoption).
 */
export async function updatePetRecord(petId, payload) {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("No authentication token available");
  }

  const response = await axios.put(`${BaseUrl}/pets/${petId}`, payload, {
    headers: { token },
  });

  return response;
}
