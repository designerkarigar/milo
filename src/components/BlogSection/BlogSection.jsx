import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
            <h1 className="big-heading">PET BLOG</h1>
            <p className="paragraph">
              At Milo, our passion for pets drives everything we do. Our blogs
              are crafted with love, dedicated to honouring all pets for the
              happiness they bring to us. Our expert tips and heartwarming
              content are designed to assist you and your beloved pets in leading
              your best lives, side by side. Discover comprehensive guides on pet care for dogs, cats, birds, fish, horses, and farm animals, 
              veterinary advice for all pet types, pet breeding best practices, and connect 
              with pet NGOs through our platform. Explore our <Link to="/vets" style={{color: '#0066BA', textDecoration: 'underline'}}>vet services</Link>, 
              <Link to="/daycare" style={{color: '#0066BA', textDecoration: 'underline', marginLeft: '5px'}}>pet creches</Link>, and 
              <Link to="/match-making" style={{color: '#0066BA', textDecoration: 'underline', marginLeft: '5px'}}>breeding services</Link> for all your pet needs.
            </p>

            <Link to="/blogs" className="blog-btn">
              Read Now
            </Link>
          </div>
          <div className="content-img">
            <img src={dog_blog} alt="Pet care blog covering all pets - dogs, cats, birds, fish, horses, and farm animals" />
          </div>
        </div>

        <div className="card-con">
          {blogData.map((blog, index) => (
            <Link className="card" to={`/blogview?id=${blog.uid}`} key={index}>
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
                  alt={blog.title || "Pet care blog article"}
                />
              </div>

              <div className="card-text">{blog.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </StyledBlogSection>
  );
};
