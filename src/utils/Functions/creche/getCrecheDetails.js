import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

const getCrecheDetails = async (userName) => {
  const idToken = localStorage.getItem("idToken");
  const config = {
    headers: {
      token: idToken,
    },
  };

  try {
    const userInfo = await axios.get(BaseUrl + `/creches/${userName}`, config);
    return userInfo.data.response.record[0];
  } catch (err) {
    throw new Error(err);
  }
};

export default getCrecheDetails;
