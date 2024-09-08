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
      if (data.name) {
        name = data.name;
      }
      if (data.firstName) {
        name = data.firstName;
      }

      const daysOfOperation = data.daysofoperation.join(", ");

      return {
        name: name,
        mobile: data.mobile,
        location: data.location.city,
        uid: data.uid,
        verified: data.verified.toString(),
        daysOfOperation: daysOfOperation,
        email: data.email,
        userName: data.userName,
      };
    });

    return mapdata;
  } catch (err) {
    throw new Error(err);
  }
};
