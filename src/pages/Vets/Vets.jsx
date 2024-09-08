import React from "react";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import line_3_pink from "../../images/svgfiles/3line-pink.png";
import vet_paws_1 from "../../images/svgfiles/vet-paws-1.svg";
import vet_paws_2 from "../../images/svgfiles/vet-paws-2.svg";
import vetcare_1 from "../../images/svgfiles/vetcare-1.svg";
import vetcare_2 from "../../images/svgfiles/vetcare-2.svg";
import vetcare_3 from "../../images/svgfiles/vetcare-3.svg";

import { VetStyledComponent } from "./styledComponent";
export const VetsPage = () => {
  return (
    <>
      <VetStyledComponent>
        <div className="vet-navbar">
          <NewNavbar />
        </div>

        <div className="vet-banner">
          <div className="vet-banner-content">
            <h1>
              <img className="vet-lines" src={line_3_pink} alt="" />
              Ready to find a vet?
              <br />
              Don't wait!{" "}
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
              animi sequi totam autem magni nobis ut at deleniti nemo cum?
            </p>
            <div className="vet-join-btn">Launching Soon</div>
          </div>
          <div className="vet-wave">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>

        <div className="vet-card-con">
          <div className="vet-big-card">
            <img className="vet-paws-big-card" src={vet_paws_1} alt="" />
            <img className="vet-big-img" src={vetcare_1} alt="" />

            <div className="big-card-text">
              <h1>BOOK</h1>
              <h3>Schedule vet appointments easily</h3>
            </div>
          </div>
          <div className="vet-small-card-con">
            <img className="vet-paws-small-card" src={vet_paws_2} alt="" />
            <div className="vet-small-card">
              <img className="vet-small-img" src={vetcare_2} alt="" />
              <div className="small-card-text">
                <h1>Consult</h1>
                <h3>Connect with vets online</h3>
              </div>
            </div>
            <div className="vet-small-card">
              <img className="vet-small-img" src={vetcare_3} alt="" />
              <div className="small-card-text">
                <h1>App</h1>
                <h3>Find vets on the go</h3>
              </div>
            </div>
          </div>
        </div>
      </VetStyledComponent>
      <NewFooter />
    </>
  );
};
