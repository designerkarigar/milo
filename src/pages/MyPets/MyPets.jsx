import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import { getPets } from "../../utils/Functions/Pets/getPets";
import { FadeLoader } from "react-spinners";
import { StyledMyPets } from "./styledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

export const MyPetsPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  useEffect(() => {
    // Redirect to home if not logged in
    if (!currentUser) {
      navigate("/home");
      return;
    }
    fetchPets();
  }, [currentUser, navigate]);

  const fetchPets = async () => {
    try {
      setLoading(true);
      const data = await getPets();
      setPets(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pets:", error);
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => {
      if (pets.length <= 1) return prev;
      return prev === 0 ? pets.length - 1 : prev - 1;
    });
  };

  const handleNext = () => {
    setCurrentIndex((prev) => {
      if (pets.length <= 1) return prev;
      return prev >= pets.length - 1 ? 0 : prev + 1;
    });
  };

  const handleTouchStart = (event) => {
    touchStartXRef.current = event.changedTouches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    touchEndXRef.current = event.changedTouches[0].clientX;
    const deltaX = touchEndXRef.current - touchStartXRef.current;
    if (Math.abs(deltaX) < 50) return;
    if (deltaX > 0) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  return (
    <>
      <StyledMyPets>
        <div className="my-pets-nav-con">
          <NewNavbar />
        </div>
        <div className="my-pets-main-con">
          <div className="my-pets-wave">
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
          <div className="my-pets-container">
          <div className="header-section">
            <h1 className="page-title">My Pets</h1>
            <p className="page-subtitle">
              {pets.length > 0
                ? `You have ${pets.length} pet${pets.length > 1 ? "s" : ""}`
                : "No pets found"}
            </p>
          </div>

          {loading ? (
            <div className="loading-container">
              <FadeLoader color="#f06a8a" loading={loading} />
            </div>
          ) : pets.length === 0 ? (
            <div className="empty-state">
              <p>You don't have any pets yet.</p>
            </div>
          ) : (
            <div className="carousel-container">
              {pets.length > 1 && (
                <button
                  className="carousel-button carousel-button-left"
                  onClick={handlePrevious}
                  aria-label="Previous pets"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              )}

              <div
                className="carousel-wrapper"
                ref={carouselRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                <div className="carousel-track">
                  {pets[currentIndex] ? (
                    <div
                      key={pets[currentIndex].uid || currentIndex}
                      className="pet-card"
                      onClick={() => navigate(`/pet/${pets[currentIndex].uid}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="pet-card-image">
                        <img
                          src={
                            pets[currentIndex].profilePhoto ||
                            "https://via.placeholder.com/400x300?text=No+Image"
                          }
                          alt={pets[currentIndex].name || "Pet"}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/400x300?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="pet-card-content">
                        <h2 className="pet-name">{pets[currentIndex].name || "Unnamed Pet"}</h2>
                        <div className="pet-details">
                          <div className="pet-detail-item">
                            <span className="detail-label">Breed:</span>
                            <span className="detail-value">
                              {pets[currentIndex].breed || "Not specified"}
                            </span>
                          </div>
                          {pets[currentIndex].location?.city && (
                            <div className="pet-detail-item">
                              <span className="detail-label">Location:</span>
                              <span className="detail-value">
                                {pets[currentIndex].location.city}
                                {pets[currentIndex].location.state && `, ${pets[currentIndex].location.state}`}
                              </span>
                            </div>
                          )}
                          <div className="pet-detail-item">
                            <span className="detail-label">Available for Adoption:</span>
                            <span
                              className={`detail-value ${
                                pets[currentIndex].availableForAdoption ? "available" : "not-available"
                              }`}
                            >
                              {pets[currentIndex].availableForAdoption ? "Yes" : "No"}
                            </span>
                          </div>
                          {pets[currentIndex].matchingDiscoveryEnabled !== undefined && (
                            <div className="pet-detail-item">
                              <span className="detail-label">Matching Enabled:</span>
                              <span className="detail-value">
                                {pets[currentIndex].matchingDiscoveryEnabled ? "Yes" : "No"}
                              </span>
                            </div>
                          )}
                        </div>
                        {pets[currentIndex].info && pets[currentIndex].info !== "null" && (
                          <div className="pet-info">
                            <p>{pets[currentIndex].info}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>

              {pets.length > 1 && (
                <button
                  className="carousel-button carousel-button-right"
                  onClick={handleNext}
                  aria-label="Next pets"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              )}

              {pets.length > 1 && (
                <div className="carousel-indicators">
                  {pets.map((pet, index) => (
                    <button
                      key={pet.uid || index}
                      className={`indicator ${
                        currentIndex === index ? "active" : ""
                      }`}
                      onClick={() => setCurrentIndex(index)}
                      aria-label={`Go to pet ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
          </div>
        </div>
      </StyledMyPets>
      <NewFooter />
    </>
  );
};

