import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBlogByID } from "../../utils/Functions/Blogs/getBlogByID";
import { StyledBlogView } from "./styledComponent";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchContent } from "../../utils/Functions/Blogs/fetchContent";
import { FadeLoader } from "react-spinners";
import Footer from "../../components/Footer/index";
import NewNavbar from "../../components/Navbar";

export const BlogView = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  const modules = {
    toolbar: false,
  };

  useEffect(() => {
    if (id !== "0") {
      const getData = async () => {
        try {
          setLoading(true);
          const data = await getBlogByID(id);
          const photo = data.photos.find((photo) => photo.type === "content");
          const content = await fetchContent(photo.url);
          setLoading(false);
          setValue(content);
        } catch (error) {
          alert("check your internet connection");
          console.log(error);
          // navigate("/");
        }
      };
      getData();
    } else {
    }
  }, []);

  return (
    <>
      <StyledBlogView>
        <div className="blogview-nav-con">
          <NewNavbar />
        </div>
        {loading ? (
          <div className="blog-fade-loader">
            <FadeLoader />
          </div>
        ) : (
          <ReactQuill
            id="editor"
            theme="snow"
            value={value}
            defaultValue={value}
            className="editor"
            onChange={setValue}
            placeholder="loading..."
            readOnly="true"
            modules={modules}
          ></ReactQuill>
        )}
      </StyledBlogView>
      <Footer />
    </>
  );
};
