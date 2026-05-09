import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getAuthToken } from "../Pets/getAuthToken";

// GET list/search
export async function fetchLostAndFound(params = {}) {
  const token = await getAuthToken().catch(() => "");

  const response = await axios.get(`${BaseUrl}/lostAndFound`, {
    params,
    headers: token ? { token } : undefined,
  });

  return response?.data?.response?.record || [];
}

// POST create (JSON body per backend contract)
export async function createLostAndFound(payload = {}) {
  const token = await getAuthToken().catch(() => "");

  const response = await axios.post(`${BaseUrl}/lostAndFound`, payload, {
    headers: token ? { token } : undefined,
  });

  return response?.data?.response?.record || [];
}

