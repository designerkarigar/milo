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
import { getPastelColorForKey } from "../../utils/Functions/Others/getPastelColorForKey";

function decodeBase64Html(base64Text) {
  if (!base64Text || typeof base64Text !== "string") return "";
  try {
    return decodeURIComponent(escape(atob(base64Text)));
  } catch {
    try {
      return atob(base64Text);
    } catch {
      return "";
    }
  }
}

export const BlogView = () => {
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [titleColor, setTitleColor] = useState(getPastelColorForKey(""));
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
          setBlogTitle(data?.title || "Blog");
          setTitleColor(getPastelColorForKey(data?.uid || data?.title || id));
          const photo =
            data?.photos?.find((item) => item?.type === "content") ||
            data?.photos?.[0];
          const inlineHtml =
            decodeBase64Html(data?.content) || decodeBase64Html(photo?.image);
          if (inlineHtml) {
            setLoading(false);
            setValue(inlineHtml);
            return;
          }

          if (!photo?.url) {
            throw new Error("Blog content file is missing");
          }
          const content = await fetchContent(photo.url);
          setLoading(false);
          setValue(content);
        } catch (error) {
          setLoading(false);
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
          <>
            <h1 className="blog-title" style={{ color: titleColor }}>
              {blogTitle}
            </h1>
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
          </>
        )}
      </StyledBlogView>
      <Footer />
    </>
  );
};
