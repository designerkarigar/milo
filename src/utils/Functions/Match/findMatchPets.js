import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
import { getAuthToken } from "../Pets/getAuthToken";

export const findMatchPets = async ({
  pageNo = 1,
  pageSize = 10,
  petType,
  gender,
  breed,
  age,
  weight,
}) => {
  const token = await getAuthToken();
  if (!token) {
    throw new Error("No authentication token available");
  }

  const optionalParams = {
    petType,
    gender,
    breed,
    age,
    weight,
  };

  const filteredOptionalParams = Object.entries(optionalParams).reduce(
    (acc, [key, value]) => {
      if (value === null || value === undefined) {
        return acc;
      }

      if (typeof value === "string" && value.trim() === "") {
        return acc;
      }

      acc[key] = value;
      return acc;
    },
    {}
  );

  const response = await axios.get(`${BaseUrl}/match/find`, {
    headers: {
      token,
    },
    params: {
      useQueryFilter: true,
      pageNo,
      pageSize,
      ...filteredOptionalParams,
    },
  });

  return response?.data?.response?.record || [];
};

