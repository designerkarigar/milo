import axios from "axios";
import { BaseUrl } from "../../Constants/Url";

function firstRecordFromResponse(responseData) {
  const record = responseData?.response?.record;
  if (Array.isArray(record)) return record[0] || null;
  if (record && typeof record === "object") return record;
  return null;
}

export const getBlogByID = async (id) => {
  try {
    if (id) {
      const idToken = localStorage.getItem("idToken");

      if (idToken && idToken !== "0") {
        try {
          const privateBlog = await axios.get(BaseUrl + `/blogs/${id}`, {
            headers: {
              token: idToken,
            },
          });
          const privateRecord = firstRecordFromResponse(privateBlog?.data);
          if (privateRecord) return privateRecord;
        } catch (error) {
          // Fallback to web endpoint below.
          console.log("Private blog fetch failed, falling back to web endpoint", error);
        }
      }

      const webBlog = await axios.get(BaseUrl + `/web/blogs/${id}`);
      const webRecord = firstRecordFromResponse(webBlog?.data);
      if (webRecord) return webRecord;

      throw new Error("Blog record not found");
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
