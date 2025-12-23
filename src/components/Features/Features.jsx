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
            <h1>Pet Boarding</h1>
            <p>
              Find your pet's happiest home at Milo: safe, comfortable boarding
              houses with personalized care, spacious accommodations, and
              dedicated staff. Whether you need <Link to="/daycare">pet daycare creches</Link> for your dogs and cats, 
              or temporary boarding for your beloved pets, we connect you with the best facilities.
            </p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-text">
            <h1>Pet Breeding</h1>
            <p>
              Milo promotes responsible pet breeding practices. Our platform
              connects you with reputable breeders who prioritize animal welfare
              and follow the best breeding standards. Explore our <Link to="/match-making">pet breeding and matching services</Link> 
              to find the perfect partner for your dogs and cats, ensuring healthy and ethical breeding practices.
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
            <h1>Pet Grooming</h1>
            <p>
              Milo partners with leading grooming houses, providing personalized
              services to help your pets look and feel their best. Trust us for
              top-notch care and pampering experiences. From professional grooming for dogs and cats 
              to comprehensive pet care services, we ensure your pets receive the best treatment.
            </p>
          </div>
        </div>
      </div>
    </StyledFeatures>
  );
};
