import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getVetDetails = async (userName) => {
  try {
    const userInfo = await axios.get(BaseUrl + `/web/vets/${userName}`);
    return userInfo.data.response.record[0];
  } catch (err) {
    throw new Error(err);
  }
};
