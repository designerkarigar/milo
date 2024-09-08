import React from "react";
import { StyledFooter } from "./FooterStyledComponent";

import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import YoutubeIcon from "@mui/icons-material/YouTube";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

export const Footer = () => {
  return (
    <StyledFooter>
      <div className="footer-wave">
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
      <div className="footer-con">
        <div className="footer-content">
          <div className="heading-con">
            <h1>
              <span className="yellow">How can we help?</span>
              <br />
              Contact us anytime.
            </h1>
          </div>

          <div className="foot-link-con">
            <ul className="contact-list">
              <a>
                <span className="footer-icon">
                  <FontAwesomeIcon icon={faLocationDot} />
                </span>
                Gurugram
              </a>
              <a href="tel:+9112345678">
                <span className="footer-icon">
                  <FontAwesomeIcon icon={faPhone} />
                </span>
                12345678
              </a>
              <a href="mailto:help@milo.social">
                <span className="footer-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </span>
                help@milo.social
              </a>
            </ul>

            <div className="footer-nav">
              <ul className="footer-navbar">
                <a href="/home">Home</a>
                <a href="/events">Events</a>
                <a href="/blogs">Blogs</a>
                <a href="/privacy_policy">Privacy Policy</a>
                <a href="/terms">Terms & Conditions</a>
              </ul>

              <ul className="app-link">
                <li className="link"></li>
                <li className="link"></li>
              </ul>
            </div>
          </div>
          <div className="line">
            <ul>
              <a
                href="https://www.facebook.com/profile.php?id=100090751023297"
                target="_blank"
              >
                <FacebookIcon fontSize="inherit" />
              </a>
              <a
                href="https://www.instagram.com/milo.social.app/"
                target="_blank"
              >
                <InstagramIcon fontSize="inherit" />
              </a>
              <a
                href="https://www.linkedin.com/company/milo-social/"
                target="_blank"
              >
                <LinkedInIcon fontSize="inherit" />
              </a>
              <a href="https://www.youtube.com/@milo.social" target="_blank">
                <YoutubeIcon fontSize="inherit" />
              </a>
            </ul>
            <p> &copy; 2023 by Milo Pvt. Limited. All rights reserved</p>
          </div>
        </div>
      </div>
    </StyledFooter>
  );
};
