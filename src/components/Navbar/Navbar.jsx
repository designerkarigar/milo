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
  const userMenuRef = useRef(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isResProfileMenuOpen, setIsResProfileMenuOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState("");
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
    setIsResProfileMenuOpen(false);
  };

  const handleLoginClick = () => {
    setIsLoginModalOpen(true);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      setIsUserMenuOpen(false);
      setIsResProfileMenuOpen(false);
      setIsProfileModalOpen(false);
      setProfileDetails(null);
      floatNavRemove();
      window.location.href = "/home";
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleMyProfileClick = async () => {
    setIsUserMenuOpen(false);
    setIsResProfileMenuOpen(false);
    floatNavRemove();
    setIsProfileModalOpen(true);
    setIsProfileLoading(true);
    setProfileError("");

    try {
      const userDetails = await loggedInUser();
      setProfileDetails(userDetails);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfileError("Unable to load profile details. Please try again.");
    } finally {
      setIsProfileLoading(false);
    }
  };

  const profileName =
    localStorage.getItem("username") ||
    currentUser?.displayName ||
    currentUser?.email ||
    "User";

  const avatarInitial = String(profileName).trim().charAt(0).toUpperCase() || "U";
  const profilePhoto =
    profileDetails?.photos?.find((photo) => photo.isProfile)?.url ||
    profileDetails?.photos?.[0]?.url;
  const profileFullName = [profileDetails?.firstName, profileDetails?.lastName]
    .filter(Boolean)
    .join(" ");
  const profileLocation = [
    profileDetails?.location?.city,
    profileDetails?.location?.state,
    profileDetails?.location?.country,
  ]
    .filter(Boolean)
    .join(", ");

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
          <a href="/home" className="logo-link" aria-label="Go to home page">
            <img src={logo} alt="Milo" className="logo" />
          </a>
          <nav className="nav-bar-con">
            <ul className="nav-bar">
              <a href="/home" className="list-item underline">
                Home
              </a>
              <a href="/lost-found" className="list-item underline">
                Lost & Found
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
                      <button
                        type="button"
                        onClick={handleMyProfileClick}
                        className="user-menu-item"
                      >
                        My Profile
                      </button>
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
          {currentUser && isResProfileMenuOpen ? (
            <div className="res-profile-view">
              <button
                type="button"
                className="res-back-btn"
                onClick={() => setIsResProfileMenuOpen(false)}
              >
                &lt;-
              </button>
              <ul className="res-list">
                <button
                  type="button"
                  onClick={handleMyProfileClick}
                  className="res-list-item res-list-item-btn"
                >
                  My Profile
                </button>
                <a
                  href="/my-pets"
                  className="res-list-item"
                  onClick={floatNavRemove}
                >
                  My Pets
                </a>
                <a
                  href="/my-bookings"
                  className="res-list-item"
                  onClick={floatNavRemove}
                >
                  My Bookings
                </a>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="res-list-item res-list-item-btn"
                >
                  Logout
                </button>
              </ul>
            </div>
          ) : (
            <>
              {currentUser ? (
                <button
                  type="button"
                  className="res-profile-switch"
                  onClick={() => setIsResProfileMenuOpen(true)}
                  aria-label="Open profile menu"
                >
                  <span className="res-profile-avatar">{avatarInitial}</span>
                </button>
              ) : null}

              <ul className="res-list">
                <a className="res-list-item" href="/home">
                  Home
                </a>
                <a className="res-list-item" href="/lost-found">
                  Lost & Found
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
              {!currentUser ? (
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
              ) : null}
            </>
          )}
        </div>
        {isProfileModalOpen ? (
          <div className="profile-modal-backdrop" role="presentation">
            <div
              className="profile-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="profile-modal-title"
            >
              <button
                type="button"
                className="profile-modal-close"
                onClick={() => setIsProfileModalOpen(false)}
                aria-label="Close profile details"
              >
                x
              </button>
              <h2 id="profile-modal-title">My Profile</h2>
              {isProfileLoading ? (
                <p className="profile-status">Loading profile...</p>
              ) : profileError ? (
                <p className="profile-error">{profileError}</p>
              ) : profileDetails ? (
                <div className="profile-summary">
                  {profilePhoto ? (
                    <img
                      src={profilePhoto}
                      alt={profileFullName || "Profile"}
                      className="profile-photo"
                    />
                  ) : (
                    <div className="profile-photo-placeholder">
                      {(profileFullName || profileName).charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="profile-summary-details">
                    <h3>{profileFullName || profileDetails.userName || "User"}</h3>
                    {profileDetails.about ? <p>{profileDetails.about}</p> : null}
                    {profileDetails.email ? (
                      <div className="profile-field">
                        <span>Email</span>
                        <strong>{profileDetails.email}</strong>
                      </div>
                    ) : null}
                    {profileDetails.mobile ? (
                      <div className="profile-field">
                        <span>Mobile</span>
                        <strong>{profileDetails.mobile}</strong>
                      </div>
                    ) : null}
                    {profileLocation ? (
                      <div className="profile-field">
                        <span>Location</span>
                        <strong>{profileLocation}</strong>
                      </div>
                    ) : null}
                    {profileDetails.verified !== undefined ? (
                      <div className="profile-field">
                        <span>Status</span>
                        <strong>
                          {profileDetails.verified ? "Verified" : "Not verified"}
                        </strong>
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </StyledNavbar>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
};
