import React from "react";
import { Link } from "react-router-dom";
import { StyledBanner } from "./styledComponent";
import allpetsVideo from "../../videos/allpets.mp4";
import { resolveS3Url } from "../../utils/Functions/Others/resolveS3Url";
// import dog_svg from "../../images/svgfiles/First-Dog-Image.svg";
// import second_dog from "../../images/svgfiles/second-dog-image.svg";

export const Banner = () => {
  const cloudfrontVideoUrl = resolveS3Url("allpets.mp4");

  return (
    <StyledBanner>
      <div className="banner-con">
        <div className="banner-content">
          <div className="heading">
            <h1>Connect With Pet Care for Every Companion</h1>
            <h1 className="heading-second-line">From Dogs & Cats to Birds, Fish & Farm Friends</h1>
          </div>
          <p>
            Find trusted vets, sitters, grooming and services for all pets — whether furry, feathered, or scaled.
          </p>
          <Link to="/vets" className="banner-cta-button">
            Explore All Pet Care
          </Link>
        </div>
        {/* <img className="banner-img second-image" src={second_dog} alt="Happy dog playing" />
        <img className="banner-img first-image" src={dog_svg} alt="Pet dog illustration" /> */}
        <video className="banner-img banner-video" autoPlay muted loop playsInline>
          <source src={cloudfrontVideoUrl} type="video/mp4" />
          <source src={allpetsVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="banner-wave">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>
    </StyledBanner>
  );
};
