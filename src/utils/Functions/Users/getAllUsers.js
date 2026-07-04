import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getAllUsers = async () => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };
  try {
    const userInfo = await axios.get(
      BaseUrl + "/user?useQueryFilter=true&pageSize=9999",
      config
    );
    const mapdata = userInfo.data.response.record.map((data) => {
      const firstName = data.firstName || "";
      const lastName = data.lastName || "";
      const fullname = `${firstName} ${lastName}`.trim() || "N/A";
      
      let type = "";
      if (data.vets && Array.isArray(data.vets) && data.vets.length > 0) {
        type = type + "Vet ";
      }
      if (data.creches && Array.isArray(data.creches) && data.creches.length > 0) {
        type = type + "Creche ";
      }
      if (data.ngo && Array.isArray(data.ngo) && data.ngo.length > 0) {
        type = type + "NGO ";
      }
      if (data.activists && Array.isArray(data.activists) && data.activists.length > 0) {
        type = type + "Activist ";
      }
      if (!type) {
        type = "User";
      }

      const location = data.location?.city || "N/A";

      return {
        name: fullname,
        type: type.trim(),
        mobile: data.mobile || "N/A",
        email: data.email || "N/A",
        location: location,
        uid: data.uid || data.userName || "N/A",
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
