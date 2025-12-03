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
      // Use the name field directly from API response
      const fullname = data.name || `${data.firstName || ''} ${data.lastName || ''}`.trim() || 'N/A';
      let availableHours = null;
      let daysOfOperation = null;
      
      // Fix: Use camelCase availableHours instead of lowercase availablehours
      if (data.availableHours && data.availableHours.length > 0) {
        availableHours = data.availableHours
          .map((timeSlot) => `${timeSlot.from} - ${timeSlot.to}`)
          .join(", ");
      } else {
        availableHours = "Not Known";
      }

      // Fix: Use camelCase daysOfOperation instead of lowercase daysofoperation
      if (data.daysOfOperation && data.daysOfOperation.length > 0) {
        daysOfOperation = data.daysOfOperation.join(", ");
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
        clinicName: data.clinicName || "", // Add clinicName to the mapped data
      };
    });

    return mapdata;
  } catch (err) {
    throw new Error(err);
  }
};
