import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styledComponent.js";
import { getBlogs } from "../../utils/Functions/Blogs/getBlogs";
import { resolveS3Url } from "../../utils/Functions/Others/resolveS3Url";
import { getBlogThumbnailUrl } from "../../utils/Functions/Blogs/getBlogThumbnailUrl";
import { getPastelColorForKey } from "../../utils/Functions/Others/getPastelColorForKey";
import dog_blog from "../../images/svgfiles/dog-blog.svg";
import { StyledBlogSection } from "./styledComponent.js";

const DEFAULT_THUMBNAIL = "https://via.placeholder.com/600x400?text=No+Image";

export const BlogSection = () => {
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const blog = await getBlogs();
        const subset = (blog || []).slice(0, 4);
        const withThumbnails = await Promise.all(
          subset.map(async (item) => {
            const thumbnailUrl = await getBlogThumbnailUrl(
              item,
              DEFAULT_THUMBNAIL
            );
            return {
              ...item,
              thumbnailUrl,
              titleColor: getPastelColorForKey(item?.uid || item?.title || ""),
            };
          })
        );
        setBlogData(withThumbnails);
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
                  src={resolveS3Url(blog.thumbnailUrl || DEFAULT_THUMBNAIL)}
                  alt={blog.title || "Pet care blog article"}
                  onError={(e) => {
                    e.target.src = DEFAULT_THUMBNAIL;
                  }}
                />
              </div>

              <div className="card-text" style={{ color: blog.titleColor }}>
                {blog.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </StyledBlogSection>
  );
};
