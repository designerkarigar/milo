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
            <img src={F_1} alt="Veterinary care services for all pets - dogs, cats, birds, reptiles, horses, and farm animals" />
          </div>
          <div className="feature-text">
            <h1>Vet Care</h1>
            <p>
              Find trusted <Link to="/vets">veterinarians near me</Link> for dogs, cats, birds, reptiles, horses, and more. Search for experienced <Link to="/vets">pet vets</Link>, <Link to="/vets">animal hospitals</Link>, and <Link to="/vets">veterinary clinics</Link> in your area. Get expert pet care services, routine checkups, emergency vet services, and specialized treatment for all types of pets.
            </p>
          </div>
        </div>

        <div className="feature">
          <div className="feature-text">
            <h1>Daycare & Boarding</h1>
            <p>
              Find <Link to="/daycare">pet daycare and boarding near me</Link>. Safe, loving spaces for every pet — from puppies to parrots, and all companions. Discover reliable <Link to="/daycare">pet boarding facilities</Link>, <Link to="/daycare">daycare centers</Link>, <Link to="/daycare">boarding services</Link>, and pet sitting options in your neighborhood. Book overnight pet boarding, daily daycare, and extended pet care services for all pets.
            </p>
          </div>
          <div className="feature-image">
            <img src={F_2} alt="Pet daycare and boarding services for all pets - dogs, cats, birds, and small animals" />
          </div>
        </div>

        <div className="feature">
          <div className="feature-image">
            <img src={F_3} alt="Professional pet grooming and spa services for all pets - coats, feathers, and scales" />
          </div>
          <div className="feature-text">
            <h1>Grooming & Spa</h1>
            <p>
              Find <Link to="/marketplace">pet grooming services near me</Link>. Professional grooming for coats, feathers, and scales. Search for <Link to="/marketplace">grooming salons</Link>, <Link to="/marketplace">pet groomers</Link>, <Link to="/marketplace">pet spas</Link>, and mobile grooming services nearby. Book pet haircuts, nail trimming, bathing, and full grooming packages for all your pets - from dogs and cats to birds and small animals.
            </p>
          </div>
        </div>
      </div>
    </StyledFeatures>
  );
};
