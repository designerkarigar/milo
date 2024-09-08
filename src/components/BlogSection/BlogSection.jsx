import React, { useEffect, useState } from "react";
import "./styledComponent.js";
import { getBlogs } from "../../utils/Functions/Blogs/getBlogs";
import { BaseUrlS3 } from "../../utils/Constants/Url";
import dog_blog from "../../images/svgfiles/dog-blog.svg";
import { StyledBlogSection } from "./styledComponent.js";

export const BlogSection = () => {
  const [blogData, setBlogData] = useState([]);
  const Divs = [];

  useEffect(() => {
    (async () => {
      try {
        const blog = await getBlogs();
        setBlogData(blog.slice(0, 4));
      } catch (error) {
        alert("error while fetching blogs");
        console.log(error);
      }
    })();
  }, []);

  return (
    <StyledBlogSection>
      <div className="blog-main-container">
        <div className="content-con">
          <div className="text-con">
            <h3 className="small-heading">FROM THE</h3>
            <h1 className="big-heading">DOG BLOG</h1>
            <p className="paragraph">
              At Milo, our passion for pets drives everything we do. Our blogs
              are crafted with love, dedicated to honouring them for the
              happiness they bring to us. Our expert tips and heartwarming
              content are designed to assist you and your beloved pet in leading
              your best lives, side by side.
            </p>

            <a href="/blogs" className="blog-btn">
              Read Now
            </a>
          </div>
          <div className="content-img">
            <img src={dog_blog} alt="" />
          </div>
        </div>

        <div className="card-con">
          {blogData.map((blog, index) => (
            <a className="card" href={`/blogview?id=${blog.uid}`} key={index}>
              <div className="card-img">
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

              <div className="card-text">{blog.title}</div>
            </a>
          ))}
        </div>
      </div>
    </StyledBlogSection>
  );
};
