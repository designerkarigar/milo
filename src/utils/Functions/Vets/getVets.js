import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getVets = async (pageNo = 0, pageSize = 20, lat = null, long = null, searchQuery = null, city = null) => {
  try {
    let url = BaseUrl + `/web/vets?useQueryFilter=true&pageNo=${pageNo}&pageSize=${pageSize}`;
    
    // Add lat and long query params if provided
    if (lat !== null && long !== null) {
      url += `&lat=${lat}&long=${long}`;
    }
    
    // Add city query param if provided (case-insensitive, API handles it)
    if (city && city.trim()) {
      url += `&city=${encodeURIComponent(city.trim())}`;
    }
    
    // Add search query if provided (for name, services, etc.)
    if (searchQuery && searchQuery.trim()) {
      url += `&search=${encodeURIComponent(searchQuery.trim())}`;
    }
    
    const userInfo = await axios.get(url);
    
    // Return full record data for display
    return userInfo.data.response.record || [];
  } catch (err) {
    throw new Error(err);
  }
};
