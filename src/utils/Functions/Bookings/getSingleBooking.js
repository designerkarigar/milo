import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getSingleBookings = async (serviceType, UID) => {
  const idToken = localStorage.getItem("idToken");

  const config = {
    headers: {
      token: idToken,
    },
  };
  try {
    const bookings = await axios.get(
      BaseUrl + `/bookings/${serviceType}/${UID}`,
      config
    );
    return bookings.data.response.record[0];
  } catch (err) {
    throw new Error(err);
  }
};
