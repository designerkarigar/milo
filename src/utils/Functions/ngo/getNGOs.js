import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getNGOs = async () => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };

  try {
    const userInfo = await axios.get(
      BaseUrl + "/ngo?useQueryFilter=true&pageSize=9999",
      config
    );
    const mapdata = userInfo.data.response.record.map((data) => {
      const name = data.organizationName || "N/A";
      
      let availableHours = "Not Known";
      if (data.availableHours && data.availableHours.length > 0) {
        availableHours = data.availableHours
          .map((timeSlot) => `${timeSlot.from} - ${timeSlot.to}`)
          .join(", ");
      }

      let daysOfOperation = "Not Known";
      if (data.daysOfOperation && data.daysOfOperation.length > 0) {
        daysOfOperation = data.daysOfOperation.join(", ");
      }

      const location = data.location?.city || "N/A";

      return {
        name: name,
        mobile: data.mobile || "N/A",
        location: location,
        availableHours: availableHours,
        daysOfOperation: daysOfOperation,
        uid: data.uid || "N/A",
        verified: data.verified?.toString() || "false",
        userName: data.userName || "N/A",
      };
    });

    return mapdata;
  } catch (err) {
    throw new Error(err);
  }
};

