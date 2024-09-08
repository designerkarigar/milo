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
      const fullname = `${data.firstName} ${data.lastName}`;
      let type = "";
      if (data.vets) {
        type = type + "Vet ";
      }
      if (data.creches) {
        type = type + "Creche ";
      }

      return {
        name: fullname,
        type: type,
        mobile: data.mobile,
        location: data.location.city,
        uid: data.uid,
        verified: data.verified.toString(),
        userName: data.userName,
      };
    });

    return mapdata;
  } catch (err) {
    throw new Error(err);
  }
};
