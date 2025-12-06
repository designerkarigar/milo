import axios from "axios";
import { BaseUrl } from "../../Constants/Url";
export const getCreches = async () => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };

  try {
    const userInfo = await axios.get(
      BaseUrl + "/creches?useQueryFilter=true&pageSize=9999999",
      config
    );
    const mapdata = userInfo.data.response.record.map((data) => {
      let name = "unknown";
      if (data.crecheName) {
        name = data.crecheName;
      }
      if (data.firstName) {
        name = data.firstName;
      }

      // Fix: Use camelCase daysOfOperation and check if it exists
      let daysOfOperation = "Not Known";
      if (data.daysOfOperation && data.daysOfOperation.length > 0) {
        daysOfOperation = data.daysOfOperation.join(", ");
      }

      // Handle potential undefined location
      const location = data.location?.city || "N/A";

      return {
        name: name,
        mobile: data.mobile || "N/A",
        location: location,
        uid: data.uid,
        verified: data.verified?.toString() || "false",
        daysOfOperation: daysOfOperation,
        email: data.email || "N/A",
        userName: data.userName || "N/A",
      };
    });

    return mapdata;
  } catch (err) {
    throw new Error(err);
  }
};
