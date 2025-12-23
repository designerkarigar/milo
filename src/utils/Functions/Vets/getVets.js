import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getVets = async (pageNo = 0, pageSize = 20) => {
  try {
    const userInfo = await axios.get(
      BaseUrl + `/web/vets?useQueryFilter=true&pageNo=${pageNo}&pageSize=${pageSize}`
    );
    
    // Return full record data for display
    return userInfo.data.response.record || [];
  } catch (err) {
    throw new Error(err);
  }
};
