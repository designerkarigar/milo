import React from "react";
import { StyledMarketPlace } from "./StyledComponent";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import market_bg from "../../images/svgfiles/marketplace_bg.svg";
import marketplace_1 from "../../images/svgfiles/marketplace_1.svg";
import marketplace_2 from "../../images/svgfiles/marketplace_2.svg";
import marketplace_3 from "../../images/svgfiles/marketplace_3.svg";
import line_3_pink from "../../images/svgfiles/3line-pink.png";
import pink_thread from "../../images/svgfiles/thread-pink.svg";

export const MarketPlace = () => {
  return (
    <>
      <StyledMarketPlace>
        <div className="market-nav-con">
          <NewNavbar />
        </div>

        <div className="market-main-con">
          <div className="wave">
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

          <div className="market-banner-content">
            <div className="market-heading">
              <h1>
                <img className="market-lines" src={line_3_pink} alt="" />
                <img className="market-thread" src={pink_thread} alt="" />
                Shop for your
                <br />
                beloved furry
                <br />
                Companions
              </h1>
            </div>
            <div className="market-banner-img">
              <img src={marketplace_1} alt="" />
            </div>
          </div>

          <div className="market-card-con">
            <img className="market-bg" src={market_bg} alt="" />
            <div className="market-card">
              <div className="market-card-text">
                <h1>Endless Variety of Pet Food and Treats</h1>
                <p>
                  Select from an outstanding collection of high-quality pet
                  food. You'll find top brands like Pawsitively Gourmet and
                  Happy Tails Kitchen.
                </p>
              </div>
              <div className="market-card-img">
                <img src={marketplace_2} alt="" />
              </div>
            </div>
            <div className="market-card">
              <div className="market-card-text">
                <h1>Endless Variety of Pet Food and Treats</h1>
                <p>
                  Select from an outstanding collection of high-quality pet
                  food. You'll find top brands like Pawsitively Gourmet and
                  Happy Tails Kitchen.
                </p>
              </div>
              <div className="market-card-img">
                <img src={marketplace_3} alt="" />
              </div>
            </div>
          </div>

          <div className="market-join">
            <h1>VISIT OUT STORE !</h1>
            <p>
              Discover a world of extraordinary pet products at our store.
              Experience the best and most enticing selection. Visit us today !
            </p>
            <a className="market-join-btn">Opening Soon</a>
          </div>
        </div>
      </StyledMarketPlace>
      <NewFooter />
    </>
  );
};
