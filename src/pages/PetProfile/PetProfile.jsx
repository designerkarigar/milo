import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import { getPetById } from "../../utils/Functions/Pets/getPetById";
import { FadeLoader } from "react-spinners";
import { StyledPetProfile } from "./styledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faPaw, faHeart, faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../images/Default_pfp.svg.png";

export const PetProfilePage = () => {
  const { petId } = useParams();
  const navigate = useNavigate();
  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPetDetails();
  }, [petId]);

  const fetchPetDetails = async () => {
    try {
      setLoading(true);
      const data = await getPetById(petId);
      setPet(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pet details:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <NewNavbar />
        <StyledPetProfile>
          <div className="loading-container">
            <FadeLoader color="#f06a8a" />
          </div>
        </StyledPetProfile>
        <NewFooter />
      </>
    );
  }

  if (!pet) {
    return (
      <>
        <NewNavbar />
        <StyledPetProfile>
          <div className="error-container">
            <h2>Pet not found</h2>
            <button onClick={() => navigate("/my-pets")} className="back-button">
              Back to My Pets
            </button>
          </div>
        </StyledPetProfile>
        <NewFooter />
      </>
    );
  }

  return (
    <>
      <StyledPetProfile>
        <div className="pet-profile-nav-con">
          <NewNavbar />
        </div>
        <div className="pet-profile-main-con">
          <div className="pet-profile-wave">
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

          <div className="pet-profile-container">
            {/* Header Section with Pet Name */}
            <div className="pet-profile-header">
              <button onClick={() => navigate("/my-pets")} className="back-button">
                ← Back to My Pets
              </button>
              <h1 className="pet-name-title">{pet.name || "Unnamed Pet"}</h1>
            </div>

            {/* Main Content */}
            <div className="pet-profile-content">
              {/* Left Column - Pet Image */}
              <div className="pet-image-section">
                <div className="pet-main-image">
                  <img
                    src={pet.profilePhoto || defaultAvatar}
                    alt={pet.name || "Pet"}
                    onError={(e) => {
                      e.target.src = defaultAvatar;
                    }}
                  />
                </div>
                {pet.photos && Array.isArray(pet.photos) && pet.photos.length > 0 && (
                  <div className="pet-photos-grid">
                    {pet.photos.map((photo, index) => {
                      const photoUrl = typeof photo === 'string' ? photo : (photo.url || photo);
                      return (
                        <div key={index} className="pet-photo-item">
                          <img
                            src={photoUrl}
                            alt={`${pet.name} photo ${index + 1}`}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Right Column - Pet Details */}
              <div className="pet-details-section">
                {/* Status Badges */}
                <div className="pet-badges">
                  {pet.verified && (
                    <div className="badge verified-badge">
                      <FontAwesomeIcon icon={faCheckCircle} />
                      <span>Verified</span>
                    </div>
                  )}
                  {pet.availableForAdoption && (
                    <div className="badge adoption-badge">
                      <FontAwesomeIcon icon={faHeart} />
                      <span>Available for Adoption</span>
                    </div>
                  )}
                  {pet.matchingDiscoveryEnabled && (
                    <div className="badge matching-badge">
                      <FontAwesomeIcon icon={faPaw} />
                      <span>Matching Enabled</span>
                    </div>
                  )}
                </div>

                {/* Basic Information */}
                <div className="info-card">
                  <h2 className="info-card-title">
                    <FontAwesomeIcon icon={faPaw} />
                    Basic Information
                  </h2>
                  <div className="info-grid">
                    <div className="info-item">
                      <span className="info-label">Name</span>
                      <span className="info-value">{pet.name || "Not specified"}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Breed</span>
                      <span className="info-value">{pet.breed || "Not specified"}</span>
                    </div>
                    {pet.location && (
                      <>
                        {pet.location.city && (
                          <div className="info-item">
                            <span className="info-label">
                              <FontAwesomeIcon icon={faMapMarkerAlt} />
                              Location
                            </span>
                            <span className="info-value">
                              {pet.location.city}
                              {pet.location.state && `, ${pet.location.state}`}
                              {pet.location.country && pet.location.country !== "null" && `, ${pet.location.country}`}
                            </span>
                          </div>
                        )}
                        {pet.location.address && pet.location.address !== "null" && (
                          <div className="info-item full-width">
                            <span className="info-label">Address</span>
                            <span className="info-value">{pet.location.address}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Additional Information */}
                {pet.info && pet.info !== "null" && (
                  <div className="info-card">
                    <h2 className="info-card-title">About</h2>
                    <p className="about-text">{pet.info}</p>
                  </div>
                )}

                {/* Status Information */}
                <div className="info-card">
                  <h2 className="info-card-title">Status</h2>
                  <div className="status-grid">
                    <div className="status-item">
                      <span className="status-label">Available for Adoption</span>
                      <span className={`status-value ${pet.availableForAdoption ? "yes" : "no"}`}>
                        {pet.availableForAdoption ? (
                          <>
                            <FontAwesomeIcon icon={faCheckCircle} />
                            Yes
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faTimesCircle} />
                            No
                          </>
                        )}
                      </span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">Matching Discovery</span>
                      <span className={`status-value ${pet.matchingDiscoveryEnabled ? "yes" : "no"}`}>
                        {pet.matchingDiscoveryEnabled ? (
                          <>
                            <FontAwesomeIcon icon={faCheckCircle} />
                            Enabled
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faTimesCircle} />
                            Disabled
                          </>
                        )}
                      </span>
                    </div>
                    <div className="status-item">
                      <span className="status-label">Verified</span>
                      <span className={`status-value ${pet.verified ? "yes" : "no"}`}>
                        {pet.verified ? (
                          <>
                            <FontAwesomeIcon icon={faCheckCircle} />
                            Verified
                          </>
                        ) : (
                          <>
                            <FontAwesomeIcon icon={faTimesCircle} />
                            Not Verified
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </StyledPetProfile>
      <NewFooter />
    </>
  );
};

