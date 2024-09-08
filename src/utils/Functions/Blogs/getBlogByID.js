import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getBlogByID = async (id) => {
  try {
    if (id) {
      const Blogdata = await axios.get(BaseUrl + `/blogs/${id}`);
      const { record } = Blogdata.data.response;
      return record[0];
    } else {
      return {
        content: "",
        description: "",
        title: "",
        photos: [" ", " "],
        urls: [" ", " ", " "],
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("api error login again");
  }
};
