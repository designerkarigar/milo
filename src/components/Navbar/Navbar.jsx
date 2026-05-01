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
  const userMenuRef = useRef(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isResUserMenuOpen, setIsResUserMenuOpen] = useState(false);
  const { currentUser, signOut } = useAuth();

  useEffect(() => {
    let lastScroll = window.scrollY;
    const element = header.current;
    window.addEventListener("scroll", () => {
      if (lastScroll < window.scrollY) {
        element.classList.add("hidden");
      } else {
        element.classList.remove("hidden");
      }

      lastScroll = window.scrollY;
    });
  }, []);

  const floatNavAdd = () => {
    res_navbar.current.classList.add("visible");
  };
  const floatNavRemove = () => {
    res_navbar.current.classList.remove("visible");
    setIsResUserMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      setIsResUserMenuOpen(false);
      floatNavRemove();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const profileName =
    localStorage.getItem("username") ||
    currentUser?.displayName ||
    currentUser?.email ||
    "User";

  const avatarInitial = String(profileName).trim().charAt(0).toUpperCase() || "U";

  useEffect(() => {
    const closeOnOutsideClick = (event) => {
      if (!userMenuRef.current) return;
      if (!userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, []);

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
                <div className="user-avatar-container" ref={userMenuRef}>
                  <button
                    type="button"
                    className="user-avatar"
                    onClick={() => setIsUserMenuOpen((prev) => !prev)}
                    aria-label="Open profile menu"
                  >
                    {avatarInitial}
                  </button>
                  {isUserMenuOpen && (
                    <div className="user-menu">
                      <a href="/my-pets" className="user-menu-item">
                        My Pets
                      </a>
                      <a href="/my-bookings" className="user-menu-item">
                        My Bookings
                      </a>
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="user-menu-item"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleLoginClick}
                  className="list-item register-btn"
                >
                  Login
                </button>
              )}
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
              <button
                type="button"
                className="res-user-avatar"
                onClick={() => setIsResUserMenuOpen((prev) => !prev)}
                aria-label="Open profile menu"
              >
                {avatarInitial}
              </button>
              {isResUserMenuOpen && (
                <div className="res-user-menu">
                  <a
                    href="/my-pets"
                    className="res-register-btn"
                    onClick={floatNavRemove}
                  >
                    My Pets
                  </a>
                  <a
                    href="/my-bookings"
                    className="res-register-btn"
                    onClick={floatNavRemove}
                  >
                    My Bookings
                  </a>
                  <button
                    onClick={handleLogout}
                    className="res-register-btn"
                    style={{
                      border: "none",
                      background: "#f06a8a",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
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
        </div>
      </StyledNavbar>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};
