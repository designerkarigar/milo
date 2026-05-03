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

export const updatePetFromAi = async ({ uid, name, imageUrl, aiData = {} }) => {
  if (!uid) {
    throw new Error("Missing pet uid");
  }

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
    petType: aiData.petType || "",
    breed: aiData.breed || "",
    breedCategory: aiData.breedCategory || "",
    origin: aiData.origin || "",
    avgMass: aiData.avgMass || "",
    lifespan: aiData.lifespan || "",
    description: aiData.description || "",
    diet: aiData.diet || "",
    careTips: aiData.careTips || "",
    specialTraits: aiData.specialTraits || "",
    images: Array.isArray(aiData.images) ? aiData.images : [],
    mostSimilarTraits: Array.isArray(aiData.mostSimilarTraits)
      ? aiData.mostSimilarTraits
      : [],
  };

  const response = await axios.put(`${BaseUrl}/pets/${uid}`, payload, {
    headers: {
      token,
    },
  });

  return response?.data?.response?.record || null;
};

