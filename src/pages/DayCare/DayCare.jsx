import React from "react";
import { StyledDayCare } from "./StyledComponent";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import bg_day from "../../images/svgfiles/marketplace_bg.svg";
import day_care_card_1 from "../../images/svgfiles/daycare-card.svg";
import day_care_card_2 from "../../images/svgfiles/daycare-card-2.svg";
import day_care_card_3 from "../../images/svgfiles/daycare-card-3.svg";

export const DayCare = () => {
  return (
    <>
      <StyledDayCare>
        <div className="nav-bar">
          <NewNavbar />
        </div>
        <div className="daycare-banner-con">
          <div className="shade"></div>
          <div className="daycare-banner-content">
            <h1>
              Discover the perfect daycare
              <br />
              for your furry friends
            </h1>
          </div>
          <div className="custom-shape-divider-bottom-1690829630">
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
        </div>

        <div className="daycare-content">
          <img src={bg_day} alt="" className="daycare-bg" />
          <div className="daycare-heading">
            <h1>Pet daycare services</h1>
            <h3>"Nurturing your furry loved one, the daycare way!"</h3>
          </div>

          <div className="daycare-card-con">
            <div className="daycare-card">
              <img className="daycare-img" src={day_care_card_1} alt="" />

              <div className="daycare-card-content">
                <h1>Outdoor Playtime</h1>
                <p>
                  Let your pets romp and play in our spacious, secure outdoor
                  yards
                </p>
              </div>
            </div>
            <div className="daycare-card">
              <img className="daycare-img" src={day_care_card_2} alt="" />
              <div className="daycare-card-content">
                <h1>Indoor Resting</h1>
                <p>
                  Provide your pets with the cozy, comfy indoor spaces they’ll
                  love.
                </p>
              </div>
            </div>
            <div className="daycare-card">
              <img className="daycare-img" src={day_care_card_3} alt="" />
              <div className="daycare-card-content">
                <h1>Online Booking</h1>
                <p>Reserve daycare slots for your pets in just a few clicks.</p>
              </div>
            </div>
          </div>
          <div className="join">
            <h1>JOIN US</h1>
            <p>
              Don't miss out on exclusive discounts and pet care tips! Subscribe
              to our newsletter and stay ahead in pet pampering
            </p>
            <a className="join-btn">Launching Soon</a>
          </div>
        </div>
      </StyledDayCare>
      <NewFooter />
    </>
  );
};
