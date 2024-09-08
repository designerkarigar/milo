import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getVets = async () => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };

  try {
    const userInfo = await axios.get(
      BaseUrl + "/vets?useQueryFilter=true&pageSize=9999999",
      config
    );
    const mapdata = userInfo.data.response.record.map((data) => {
      const fullname = `${data.firstName} ${data.lastName}`;
      let availableHours = null;
      let daysOfOperation = null;
      if (data.availablehours) {
        availableHours = data.availablehours
          .map((timeSlot) => `${timeSlot.from} - ${timeSlot.to}`)
          .join(", ");
      } else {
        availableHours = "Not Known";
      }

      if (data.daysofoperation) {
        daysOfOperation = data.daysofoperation.join(", ");
      } else {
        daysOfOperation = "Not Known";
      }
      return {
        name: fullname,
        mobile: data.mobile,
        location: data.location.city,
        availableHours: availableHours,
        uid: data.uid,
        verified: data.verified.toString(),
        daysOfOperation: daysOfOperation,
        userName: data.userName,
      };
    });

    return mapdata;
  } catch (err) {
    throw new Error(err);
  }
};
