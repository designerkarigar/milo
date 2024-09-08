import React from "react";
// import "./TestimonialStyle.css";
import { StyledTestimonial } from "./styledTestimonial";
import test_bg_image from "../../images/test-bg-image.jpg";

export const Testimonial = () => {
  return (
    <>
      <StyledTestimonial>
        <div className="test-main-con">
          <div className="test-heading">
            <h1>
              {" "}
              <span className="yellow">LARGEST</span> PROVIDES OF DOG
              <br />
              SERVICES IN INDIA
            </h1>
          </div>

          <div className="test-logo-con">
            <div className="test-logo">
              <img
                src="https://www.dogtopia.com/wp-content/themes/dogtopia-2018/dist/images/locations-icon.svg"
                alt=""
                className="img-logo"
              />
              <h1 className="logo-heading-numeric">230+</h1>
              <h1 className="logo-heading">Locations</h1>
            </div>

            <div className="test-logo">
              <img
                src="https://www.dogtopia.com/wp-content/themes/dogtopia-2018/dist/images/heart-snout-icon.svg"
                alt=""
                className="img-logo"
              />
              <h1 className="logo-heading-numeric">100%</h1>
              <h1 className="logo-heading">Happy Dogs Every Day</h1>
            </div>

            <div className="test-logo">
              <img
                src="https://www.dogtopia.com/wp-content/themes/dogtopia-2018/dist/images/bfff-icon.svg"
                alt=""
                className="img-logo"
              />
              <h1 className="logo-heading-numeric">LIFETIME</h1>
              <h1 className="logo-heading">Friendships</h1>
            </div>
          </div>

          <div className="test-text-con">
            <p className="test-text">
              "At Milo, we provide a nurturing environment, comprehensive
              veterinary care, and early socialization to ensure the well-being
              and happiness of puppies and kittens. Our team is dedicated to
              their holistic development, setting them on a path to a lifetime
              of happiness."
            </p>
          </div>

          <img className="test-bg-img" src={test_bg_image} alt="" />

          <div className="test-shade"></div>
        </div>
      </StyledTestimonial>
    </>
  );
};
