import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

const getCrecheDetails = async (userName) => {
  try {
    const userInfo = await axios.get(BaseUrl + `/web/creches/${userName}`);
    return userInfo.data.response.record[0];
  } catch (err) {
    throw new Error(err);
  }
};

export default getCrecheDetails;
