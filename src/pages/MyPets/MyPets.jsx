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
    if (pets.length <= 2) return;
    setCurrentIndex((prev) => {
      if (prev === 0) {
        // If at start, go to the last possible position that shows 2 cards
        return Math.max(0, pets.length - 2);
      }
      return prev - 1;
    });
  };

  const handleNext = () => {
    if (pets.length <= 2) return;
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, pets.length - 2);
      if (prev >= maxIndex) {
        return 0; // Loop back to start
      }
      return prev + 1;
    });
  };

  const getVisiblePets = () => {
    if (pets.length <= 2) return pets;
    const visible = [];
    const maxIndex = pets.length - 1;
    for (let i = 0; i < 2; i++) {
      let index = currentIndex + i;
      if (index > maxIndex) {
        index = index - pets.length;
      }
      if (index >= 0 && index <= maxIndex) {
        visible.push(pets[index]);
      }
    }
    return visible;
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
              {pets.length > 2 && (
                <button
                  className="carousel-button carousel-button-left"
                  onClick={handlePrevious}
                  aria-label="Previous pets"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              )}

              <div className="carousel-wrapper" ref={carouselRef}>
                <div className="carousel-track">
                  {getVisiblePets().map((pet, index) => (
                    <div
                      key={pet.uid || index}
                      className="pet-card"
                      onClick={() => navigate(`/pet/${pet.uid}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <div className="pet-card-image">
                        <img
                          src={
                            pet.profilePhoto ||
                            "https://via.placeholder.com/400x300?text=No+Image"
                          }
                          alt={pet.name || "Pet"}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/400x300?text=No+Image";
                          }}
                        />
                      </div>
                      <div className="pet-card-content">
                        <h2 className="pet-name">{pet.name || "Unnamed Pet"}</h2>
                        <div className="pet-details">
                          <div className="pet-detail-item">
                            <span className="detail-label">Breed:</span>
                            <span className="detail-value">
                              {pet.breed || "Not specified"}
                            </span>
                          </div>
                          {pet.location?.city && (
                            <div className="pet-detail-item">
                              <span className="detail-label">Location:</span>
                              <span className="detail-value">
                                {pet.location.city}
                                {pet.location.state && `, ${pet.location.state}`}
                              </span>
                            </div>
                          )}
                          <div className="pet-detail-item">
                            <span className="detail-label">Available for Adoption:</span>
                            <span
                              className={`detail-value ${
                                pet.availableForAdoption ? "available" : "not-available"
                              }`}
                            >
                              {pet.availableForAdoption ? "Yes" : "No"}
                            </span>
                          </div>
                          {pet.matchingDiscoveryEnabled !== undefined && (
                            <div className="pet-detail-item">
                              <span className="detail-label">Matching Enabled:</span>
                              <span className="detail-value">
                                {pet.matchingDiscoveryEnabled ? "Yes" : "No"}
                              </span>
                            </div>
                          )}
                        </div>
                        {pet.info && pet.info !== "null" && (
                          <div className="pet-info">
                            <p>{pet.info}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {pets.length > 2 && (
                <button
                  className="carousel-button carousel-button-right"
                  onClick={handleNext}
                  aria-label="Next pets"
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              )}

              {pets.length > 2 && (
                <div className="carousel-indicators">
                  {Array.from({ length: Math.ceil(pets.length / 2) }).map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${
                        Math.floor(currentIndex / 2) === index ? "active" : ""
                      }`}
                      onClick={() => setCurrentIndex(index * 2)}
                      aria-label={`Go to page ${index + 1}`}
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

