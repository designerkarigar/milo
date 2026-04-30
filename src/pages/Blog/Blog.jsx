import React, { useState } from "react";
import { Link } from "react-router-dom";
import { StyledBlog } from "./styledComponent";
import NewNavbar from "../../components/Navbar/index";
import { useEffect } from "react";
import { getBlogs } from "../../utils/Functions/Blogs/getBlogs";
import { resolveS3Url } from "../../utils/Functions/Others/resolveS3Url";
import { fetchContent } from "../../utils/Functions/Blogs/fetchContent";
import NewFooter from "../../components/Footer";
import { FadeLoader } from "react-spinners";
import { SEO } from "../../components/SEO";

const DEFAULT_THUMBNAIL = "https://via.placeholder.com/600x400?text=No+Image";

function firstImageFromHtml(html) {
  if (!html || typeof html !== "string") return "";
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return doc.querySelector("img")?.getAttribute("src") || "";
  } catch {
    return "";
  }
}

export const Blog = () => {
  const [blogdata, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const blogs = await getBlogs();
        const blogsWithThumbnail = await Promise.all(
          (blogs || []).map(async (blog) => {
            const contentPhoto =
              blog?.photos?.find((photoData) => photoData?.type === "content") ||
              blog?.photos?.[0];

            if (!contentPhoto?.url) {
              return { ...blog, thumbnailUrl: DEFAULT_THUMBNAIL };
            }

            try {
              const html = await fetchContent(contentPhoto.url);
              const firstImage = firstImageFromHtml(html);
              return {
                ...blog,
                thumbnailUrl: firstImage || DEFAULT_THUMBNAIL,
              };
            } catch {
              return { ...blog, thumbnailUrl: DEFAULT_THUMBNAIL };
            }
          })
        );
        setBlogData(blogsWithThumbnail);
      } catch (error) {
        alert("Network error");
      } finally {
        setLoading(false);
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
      <SEO
        title="Pet Care Blog | Expert Tips for Dogs, Cats & All Pets | Milo"
        description="Read expert pet care tips, heartwarming stories, and comprehensive guides for dogs, cats, and all pets. Learn about pet health, training, nutrition, and more from Milo's pet care blog."
        keywords="pet blog, dog blog, cat blog, pet care tips, pet health, pet training, pet nutrition, dog care, cat care, pet advice, pet information"
        url="https://milo.social/blogs"
      />
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
                <Link
                  to={`/blogview?id=${blog.uid}`}
                  className="blog-card"
                  key={index}
                >
                  <div className="blog-card-img">
                    <img
                      src={resolveS3Url(blog.thumbnailUrl || DEFAULT_THUMBNAIL)}
                      alt={blog.title || "Pet care blog article"}
                      onError={(e) => {
                        e.target.src = DEFAULT_THUMBNAIL;
                      }}
                    />
                  </div>
                  <div className="blog-card-text-con">
                    <p className="blog-card-date">{blog.time}</p>
                    <p className="blog-card-text">{blog.title}</p>
                  </div>
                </Link>
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
