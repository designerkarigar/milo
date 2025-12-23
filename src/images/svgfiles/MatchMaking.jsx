import React from "react";
import { Link } from "react-router-dom";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import { MatchMakingStyledComponent } from "../../pages/Match-Making/styledComponent";
import { SEO } from "../../components/SEO";
import match_1 from "../../images/svgfiles/match-1.svg";
import match_2 from "../../images/svgfiles/match-2.svg";
import match_3 from "../../images/svgfiles/match-3.svg";
import match_4 from "../../images/svgfiles/match-4.svg";

import avatar_1 from "../../images/svgfiles/avatar-1.svg";
import avatar_2 from "../../images/svgfiles/avatar-2.svg";
import avatar_3 from "../../images/svgfiles/avatar-3.svg";
export const MatchMaking = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Pet Breeding and Matching Services",
    "provider": {
      "@type": "Organization",
      "name": "Milo"
    },
    "description": "Find the perfect breeding partner for your pet. Responsible pet breeding and matching services for dogs and cats. Connect with reputable breeders who prioritize animal welfare.",
    "areaServed": "India"
  };

  return (
    <>
      <SEO
        title="Pet Breeding & Matching Services | Find Perfect Breeding Partners for Dogs & Cats | Milo"
        description="Help your pet find the perfect breeding partner. Milo promotes responsible pet breeding and matching services for dogs and cats. Connect with reputable breeders who prioritize animal welfare and follow best breeding standards."
        keywords="breeding, matching, pet breeding, dog breeding, cat breeding, pet matching, dog matching, cat matching, breeding services, pet breeding services, responsible breeding, dog breeding partner, cat breeding partner"
        url="https://milo.social/match-making"
        structuredData={structuredData}
      />
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
          <h1>Pet Breeding & Matching Services</h1>
          <p>
            Help your furry friend find love and breed with our responsible pet breeding and matching service. 
            Discover the perfect breeding partner for your dogs and cats today! Our platform connects you with 
            reputable breeders who prioritize animal welfare and follow ethical breeding standards. Whether you're 
            looking for dog breeding or cat breeding services, we ensure healthy and responsible pet matching. 
            Explore our <Link to="/vets" style={{color: '#f1c21b', textDecoration: 'underline'}}>veterinary services</Link> and 
            <Link to="/daycare" style={{color: '#f1c21b', textDecoration: 'underline', marginLeft: '5px'}}>pet daycare creches</Link> for complete pet care solutions.
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
              <img className="gallery-img" src={match_1} alt="Happy dog couple from pet breeding" />
              <img className="gallery-img" src={match_2} alt="Pet breeding success story" />
            </div>
            <div className="row">
              <img className="gallery-img" src={match_3} alt="Matched dogs from breeding service" />
              <img className="gallery-img" src={match_4} alt="Pet matching success" />
            </div>
          </div>
        </div>
      </div>

      <NewFooter />
    </MatchMakingStyledComponent>
    </>
  );
};
