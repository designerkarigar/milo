import React from "react";
import { StyledBanner } from "./styledComponent";
import dog_svg from "../../images/svgfiles/First-Dog-Image.svg";
import second_dog from "../../images/svgfiles/second-dog-image.svg";

export const Banner = () => {
  return (
    <StyledBanner>
      <div className="banner-con">
        <div className="banner-content">
          <div className="heading">
            <h2>MAKING DOGS</h2>
            <h1>HAPPY</h1>
          </div>
          <p>
            “If You Don’t Own a Dog, at least one , there is not necessarily
            anything wrong with you , but there may be something wrong with your
            Life.”
          </p>
        </div>
        <img className="banner-img second-image" src={second_dog} alt="" />
        <img className="banner-img first-image" src={dog_svg} alt="" />
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
