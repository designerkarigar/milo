import React from "react";
import { Link } from "react-router-dom";
import { StyledFeatures } from "./styledComponent";
import F_1 from "../../images/svgfiles/pet-boarding-image.svg";
import F_2 from "../../images/svgfiles/pet-breeding-image.svg";
import F_3 from "../../images/svgfiles/pet-grooming-image.svg";
import bg_image from "../../images/svgfiles/feature-bg.svg";

export const Features = () => {
  return (
    <StyledFeatures>
      <div className="feature-main-con">
        <img className="feature-bg-image" src={bg_image} alt="Pet care services background" />
        <div className="feature">
          <div className="feature-image">
            <img src={F_1} alt="Pet boarding services for dogs and cats" />
          </div>
          <div className="feature-text">
            <h1>Vet Care</h1>
            <p>
              Find vets for dogs, cats, birds, reptiles, horses, and more
            </p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-text">
            <h1>Daycare & Boarding</h1>
            <p>
              Safe, loving spaces for every pet — from puppies to parrots
            </p>
          </div>
          <div className="feature-image">
            <img src={F_2} alt="Responsible pet breeding services for dogs and cats" />
          </div>
        </div>

        <div className="feature">
          <div className="feature-image">
            <img src={F_3} alt="Pet grooming services for dogs and cats" />
          </div>
          <div className="feature-text">
            <h1>Grooming & Spa</h1>
            <p>
              Professional grooming for coats, feathers, and scales
            </p>
          </div>
        </div>
      </div>
    </StyledFeatures>
  );
};
