import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StyledNavbar } from "./styledComponent";
import logo from "../../images/milo.logo.svg";
import burger_icon from "../../images/svgfiles/burger-icon.svg";
import defaultAvatar from "../../images/Default_pfp.svg.png";
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
  const navigate = useNavigate();
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
      navigate("/my-pets");
      floatNavRemove();
    } else if (action === "my-bookings") {
      navigate("/my-bookings");
      floatNavRemove();
    } else if (action === "settings") {
      navigate("/settings");
      floatNavRemove();
    }
  };

  return (
    <>
      <StyledNavbar>
        <header ref={header} className="header">
          <Link to="/home">
            <img src={logo} alt="" className="logo" />
          </Link>
          <nav className="nav-bar-con">
            <ul className="nav-bar">
              <Link to="/home" className="list-item underline">
                Home
              </Link>
              <Link to="/events" className="list-item underline">
                Events
              </Link>
              <li className="list-item">
                Services{" "}
                <span className="down">
                  <FontAwesomeIcon icon={faCaretDown} />
                </span>
                <ul className="drop-down">
                  <Link to="/marketplace" className="drop-list-item">
                    MarketsPlace
                  </Link>
                  <Link to="/match-making" className="drop-list-item">
                    MatchMaking
                  </Link>
                  <Link to="/vets" className="drop-list-item">
                    Vets
                  </Link>
                  <Link to="/daycare" className="drop-list-item">
                    DayCare
                  </Link>
                </ul>
              </li>
              <Link to="/blogs" className="list-item underline">
                Blogs
              </Link>
              {currentUser ? (
                <div ref={avatarRef} className="user-avatar-container">
                  <img
                    src={userData?.profilePhoto || defaultAvatar}
                    alt="User Avatar"
                    className="user-avatar"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    onError={(e) => {
                      e.target.src = defaultAvatar;
                    }}
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
                        onClick={() => handleMenuClick("my-bookings")}
                      >
                        My Bookings
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
            <Link className="res-list-item" to="/home" onClick={floatNavRemove}>
              Home
            </Link>
            <Link className="res-list-item" to="/blogs" onClick={floatNavRemove}>
              Blogs
            </Link>
            <Link className="res-list-item" to="/events" onClick={floatNavRemove}>
              Events
            </Link>
            <Link className="res-list-item" to="/vets" onClick={floatNavRemove}>
              Vets
            </Link>
            <Link className="res-list-item" to="/match-making" onClick={floatNavRemove}>
              MatchMaking
            </Link>
            <Link className="res-list-item" to="/daycare" onClick={floatNavRemove}>
              DayCare
            </Link>
            <Link className="res-list-item" to="/marketplace" onClick={floatNavRemove}>
              MarketPlace
            </Link>
          </ul>
          {currentUser ? (
            <div className="res-user-section">
              <img
                src={userData?.profilePhoto || defaultAvatar}
                alt="User Avatar"
                className="res-user-avatar"
                onError={(e) => {
                  e.target.src = defaultAvatar;
                }}
              />
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
