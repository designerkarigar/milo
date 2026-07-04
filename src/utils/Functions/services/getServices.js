import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getServices = async () => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };

  try {
    const userInfo = await axios.get(
      BaseUrl + "/services?useQueryFilter=true&pageSize=9999",
      config
    );
    const mapdata = userInfo.data.response.record.map((data) => {
      // Service providers can have different name fields
      let name = "N/A";
      if (data.name) {
        name = data.name;
      } else if (data.fullName) {
        name = data.fullName;
      } else if (data.businessName) {
        name = data.businessName;
      }

      let mobile = data.mobile || data.phoneNumber || "N/A";
      const location = data.location?.city || "N/A";
      
      let serviceType = data.serviceType || "N/A";

      return {
        name: name,
        mobile: mobile,
        location: location,
        serviceType: serviceType,
        uid: data.uid || "N/A",
        verified: data.verified?.toString() || "false",
        userName: data.userName || "N/A",
        crdt: data.crdt,
      };
    });

    return mapdata;
  } catch (err) {
    throw new Error(err);
  }
};

