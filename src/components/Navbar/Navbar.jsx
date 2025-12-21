import React, { useEffect, useRef, useState } from "react";
import { StyledNavbar } from "./styledComponent";
import logo from "../../images/milo.logo.svg";
import burger_icon from "../../images/svgfiles/burger-icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import CloseIcon from "@mui/icons-material/Close";
import { LoginModal } from "../LoginModal";
import { useAuth } from "../../contexts/AuthContext";
import { loggedInUser } from "../../utils/Functions/Users/loggedInUser";

export const Navbar = () => {
  const header = useRef(null);
  const res_navbar = useRef(null);
  const avatarRef = useRef(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userData, setUserData] = useState(null);
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

  // Fetch user data when logged in
  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const data = await loggedInUser();
          setUserData(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
    };

    fetchUserData();
  }, [currentUser]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (avatarRef.current && !avatarRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserMenu]);

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
      setShowUserMenu(false);
      await signOut();
      setUserData(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleMenuClick = (action) => {
    setShowUserMenu(false);
    if (action === "logout") {
      handleLogout();
    } else if (action === "my-pets") {
      // Navigate to My Pets page
      window.location.href = "/my-pets";
    } else if (action === "settings") {
      // Navigate to Settings page
      window.location.href = "/settings";
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
                <div ref={avatarRef} className="user-avatar-container">
                  <img
                    src={userData?.profilePhoto || "https://via.placeholder.com/40"}
                    alt="User Avatar"
                    className="user-avatar"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  />
                  {showUserMenu && (
                    <div className="user-menu">
                      <button
                        className="user-menu-item"
                        onClick={() => handleMenuClick("my-pets")}
                      >
                        My Pets
                      </button>
                      <button
                        className="user-menu-item"
                        onClick={() => handleMenuClick("settings")}
                      >
                        Settings
                      </button>
                      <button
                        className="user-menu-item"
                        onClick={() => handleMenuClick("logout")}
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
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
            <div className="res-user-section">
              {userData?.profilePhoto && (
                <img
                  src={userData.profilePhoto}
                  alt="User Avatar"
                  className="res-user-avatar"
                />
              )}
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
            </div>
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
