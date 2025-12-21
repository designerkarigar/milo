import React, { useEffect, useRef, useState } from "react";
import { StyledNavbar } from "./styledComponent";
import logo from "../../images/milo.logo.svg";
import burger_icon from "../../images/svgfiles/burger-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import { LoginModal } from "../LoginModal";
import { useAuth } from "../../contexts/AuthContext";

export const Navbar = () => {
  const header = useRef(null);
  const res_navbar = useRef(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { currentUser, signOut } = useAuth();

  useEffect(() => {
    let lastScroll = window.scrollY;
    const element = header.current;
    
    const handleScroll = () => {
      if (lastScroll < window.scrollY) {
        element.classList.add("hidden");
      } else {
        element.classList.remove("hidden");
      }

      lastScroll = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const floatNavAdd = () => {
    res_navbar.current.classList.add("visible");
  };
  const floatNavRemove = () => {
    res_navbar.current.classList.remove("visible");
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <StyledNavbar>
        <header ref={header} className="header">
          <img src={logo} alt="" className="logo" />
          <nav className="nav-bar-con">
            <ul className="nav-bar">
              <a href="/home" className="list-item underline">
                Home
              </a>
              <a href="/events" className="list-item underline">
                Events
              </a>
              <li className="list-item">
                Services{" "}
                <span className="down">
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
                <ul className="drop-down">
                  <a href="marketplace" className="drop-list-item">
                    MarketsPlace
                  </a>
                  <a href="match-making" className="drop-list-item">
                    MatchMaking
                  </a>
                  <a href="/vets" className="drop-list-item">
                    Vets
                  </a>
                  <a href="daycare" className="drop-list-item">
                    DayCare
                  </a>
                </ul>
              </li>
              <a href="/blogs" className="list-item underline">
                Blogs
              </a>
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="list-item register-btn"
                  style={{ border: "none", background: "transparent", cursor: "pointer" }}
                >
                  Logout
                </button>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="list-item login-btn"
                >
                  Login
                </button>
              )}
              <a href="/login" className="list-item register-btn" style={{ display: "none" }}>
                Sign In
              </a>
            </ul>
          </nav>

          <div onClick={floatNavAdd} className="burger-icon">
            <img src={burger_icon} alt="" />
          </div>
        </header>

        <div ref={res_navbar} className="res-navbar">
          <div onClick={floatNavRemove} className="close">
            <CloseIcon fontSize="inherit" color="inherit" />
          </div>
          <ul className="res-list">
            <a className="res-list-item" href="/home">
              Home
            </a>
            <a className="res-list-item" href="/blogs">
              Blogs
            </a>

            <a className="res-list-item" href="/events">
              Events
            </a>
            <a className="res-list-item" href="vets">
              Vets
            </a>
            <a className="res-list-item" href="/match-making">
              MatchMaking
            </a>
            <a className="res-list-item" href="/daycare">
              DayCare
            </a>
            <a className="res-list-item" href="/marketplace">
              MarketPlace
            </a>
          </ul>
          {currentUser ? (
            <button
              onClick={() => {
                handleLogout();
                floatNavRemove();
              }}
              className="res-register-btn"
              style={{ border: "none", background: "#f06a8a", color: "white", cursor: "pointer" }}
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => {
                handleLoginClick();
                floatNavRemove();
              }}
              className="res-register-btn"
              style={{ border: "none", background: "#f06a8a", color: "white", cursor: "pointer" }}
            >
              Login
            </button>
          )}
          <a href="/login" className="res-register-btn" style={{ marginTop: "10px", display: "none" }}>
            Sign In
          </a>
        </div>
      </StyledNavbar>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};
