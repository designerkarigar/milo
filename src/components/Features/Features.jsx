import React from "react";
import { StyledFeatures } from "./styledComponent";
import F_1 from "../../images/svgfiles/pet-boarding-image.svg";
import F_2 from "../../images/svgfiles/pet-breeding-image.svg";
import F_3 from "../../images/svgfiles/pet-grooming-image.svg";
import bg_image from "../../images/svgfiles/feature-bg.svg";

export const Features = () => {
  return (
    <StyledFeatures>
      <div className="feature-main-con">
        <img className="feature-bg-image" src={bg_image} alt="" />
        <div className="feature">
          <div className="feature-image">
            <img src={F_1} alt="" />
          </div>
          <div className="feature-text">
            <h1>Pet Boarding</h1>
            <p>
              Find your pet's happiest home at Milo: safe, comfortable boarding
              houses with personalized care, spacious accommodations, and
              dedicated staff
            </p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-text">
            <h1>Pet Breading</h1>
            <p>
              Milo promotes responsible pet breeding practices. Our platform
              connects you with reputable breeders who prioritize animal welfare
              and follow the best breeding standards
            </p>
          </div>
          <div className="feature-image">
            <img src={F_2} alt="" />
          </div>
        </div>

        <div className="feature">
          <div className="feature-image">
            <img src={F_3} alt="" />
          </div>
          <div className="feature-text">
            <h1>Pet Grooming</h1>
            <p>
              Milo partners with leading grooming houses, providing personalized
              services to help your pets look and feel their best. Trust us for
              top-notch care and pampering experiences
            </p>
          </div>
        </div>
      </div>
    </StyledFeatures>
  );
};
