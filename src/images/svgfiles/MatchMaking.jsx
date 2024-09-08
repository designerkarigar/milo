import React from "react";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import { MatchMakingStyledComponent } from "../../pages/Match-Making/styledComponent";
import match_1 from "../../images/svgfiles/match-1.svg";
import match_2 from "../../images/svgfiles/match-2.svg";
import match_3 from "../../images/svgfiles/match-3.svg";
import match_4 from "../../images/svgfiles/match-4.svg";

import avatar_1 from "../../images/svgfiles/avatar-1.svg";
import avatar_2 from "../../images/svgfiles/avatar-2.svg";
import avatar_3 from "../../images/svgfiles/avatar-3.svg";
export const MatchMaking = () => {
  return (
    <MatchMakingStyledComponent>
      <div className="match-top-con">
        <div className="match-shade"></div>
        <div className="match-nav-con">
          <NewNavbar />
        </div>
        <div className="match-banner">
          <h1>
            Find your dog's perfect
            <br />
            partner
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

      <div className="match-data">
        <div className="match-content">
          <h1>Match Making</h1>
          <p>
            Help your furry friend find love and breed with our simple dog match
            making service. Discover the perfect partner for your pup today!
          </p>
          <div className="join-btn">Launching Soon</div>
        </div>

        <div className="match-card-con">
          <div className="match-card">
            <div className="match-card-img">
              <img src={avatar_3} alt="" className="match-dp" />
            </div>
            <h4>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vero,
              dignissimos.
            </h4>
            <p>Vishal Chandana</p>
          </div>
          <div className="match-card">
            <div className="match-card-img">
              <img src={avatar_2} alt="" className="match-dp" />
            </div>
            <h4>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ab,
              enim!
            </h4>
            <p>Anil Aggarwal</p>
          </div>
          <div className="match-card">
            <div className="match-card-img">
              <img src={avatar_1} alt="" className="match-dp" />
            </div>
            <h4>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse,
              facere?
            </h4>
            <p>Gopal Arora</p>
          </div>
        </div>

        <div className="pup-gallery">
          <h1>Happy PUP Couples</h1>
          <div className="gallery-con">
            <div className="row">
              <img className="gallery-img" src={match_1} alt="" />
              <img className="gallery-img" src={match_2} alt="" />
            </div>
            <div className="row">
              <img className="gallery-img" src={match_3} alt="" />
              <img className="gallery-img" src={match_4} alt="" />
            </div>
          </div>
        </div>
      </div>

      <NewFooter />
    </MatchMakingStyledComponent>
  );
};
