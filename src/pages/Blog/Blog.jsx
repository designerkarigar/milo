import React, { useState } from "react";
import { StyledBlog } from "./styledComponent";
import NewNavbar from "../../components/Navbar/index";
import { useEffect } from "react";
import { getBlogs } from "../../utils/Functions/Blogs/getBlogs";
import { BaseUrlS3 } from "../../utils/Constants/Url";
import NewFooter from "../../components/Footer";
import { FadeLoader } from "react-spinners";

export const Blog = () => {
  const [blogdata, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const blogs = await getBlogs();
        setBlogData(blogs);
        setLoading(false);
      } catch (error) {
        alert("Network error");
      }
    })();
  }, []);

  // const loadMore = async () => {
  //   try {
  //     const blogs = await getBlogs();
  //     setBlogData([...blogdata, ...blogs]);
  //   } catch (error) {
  //     alert("Network error");
  //     console.log(error);
  //   }
  // };

  return (
    <>
      <StyledBlog>
        <div className="blog-nav-con">
          <NewNavbar />
        </div>
        <div className="blog-main-con">
          <div className="blog-wave">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
          {loading ? (
            <div className="loading">
              <FadeLoader color="#0066BA" />
            </div>
          ) : (
            <div className="card-con">
              {blogdata.map((blog, index) => (
                <a
                  href={`/blogview?id=${blog.uid}`}
                  className="blog-card"
                  key={index}
                >
                  <div className="blog-card-img">
                    <img
                      src={
                        BaseUrlS3 +
                        (
                          blog.photos.find(
                            (photoData) => photoData.type === "banner"
                          ) || {}
                        ).url
                      }
                      alt=""
                    />
                  </div>
                  <div className="blog-card-text-con">
                    <p className="blog-card-date">{blog.time}</p>
                    <p className="blog-card-text">{blog.title}</p>
                  </div>
                </a>
              ))}
            </div>
          )}
          {/* <div onClick={loadMore} className="load-more">
            View More
          </div> */}
        </div>
      </StyledBlog>
      <NewFooter />
    </>
  );
};
