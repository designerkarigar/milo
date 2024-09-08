import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

export const getBlogs = async () => {
  try {
    const blogs = await axios.get(
      BaseUrl + `/blogs?pageSize=999999&userQueryFilter=true`
    );

    console.log(blogs);
    const { record } = blogs.data.response;
    return record;
  } catch (error) {
    alert("network error");
    throw new Error(error);
  }
};
