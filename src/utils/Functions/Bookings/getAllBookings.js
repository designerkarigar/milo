import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getAllBookings = async (serviceType, serviceUID) => {
  const idToken = localStorage.getItem("idToken");

  const config = {
    headers: {
      token: idToken,
    },
  };
  try {
    let bookings = null;
    if (serviceUID === null) {
      bookings = await axios.get(
        BaseUrl +
          `/bookings?serviceType=${serviceType}&pageSize=999999999&useQueryFilter=true`,
        config
      );
    } else {
      bookings = await axios.get(
        BaseUrl +
          `/bookings?serviceType=${serviceType}&serviceUID=${serviceUID}&pageSize=99999999&useQueryFilter=true`,
        config
      );
    }
    const mapdata = bookings.data.response.record.map((data) => {
      return {
        name: data.serviceUID,
        status: data.bookingStatus,
        amount: data.expBillAmount,
        bookingDate: data.bookingDate,
        time: data.bookingTime,
        uid: data.uid,
        date: data.date,
      };
    });
    return mapdata;
  } catch (err) {
    throw new Error("Bookings");
  }
};
