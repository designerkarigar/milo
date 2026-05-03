import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getAuthToken } from "./getAuthToken";

const DEFAULT_LOCATION = {
  city: "Noida",
  zip: "201301",
  country: "India",
  state: "UP",
  address: "Flat No. 1103, Gardenia Square, Sector-75",
  lat: 28.671982403645234,
  long: 77.21181524175785,
};

export const createPet = async ({ name, imageUrl }) => {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("No authentication token available");
  }

  const payload = {
    name,
    photos: [
      {
        isProfile: true,
        url: imageUrl,
      },
    ],
    location: DEFAULT_LOCATION,
  };

  const response = await axios.post(`${BaseUrl}/pets`, payload, {
    headers: {
      token,
    },
  });

  return response?.data?.response?.record || null;
};

