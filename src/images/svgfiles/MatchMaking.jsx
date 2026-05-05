import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import { MatchMakingStyledComponent } from "../../pages/Match-Making/styledComponent";
import { SEO } from "../../components/SEO";
import { useAuth } from "../../contexts/AuthContext";
import { findMatchPets } from "../../utils/Functions/Match/findMatchPets";
import { resolveS3Url } from "../../utils/Functions/Others/resolveS3Url";
import { FadeLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTimes, faChevronLeft, faChevronRight, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

export const MatchMaking = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [matchingPets, setMatchingPets] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cardsPerView, setCardsPerView] = useState(1);

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

  useEffect(() => {
    const boot = async () => {
      if (!currentUser) {
        navigate("/login");
        return;
      }

      try {
        const firstBatch = await findMatchPets({
          pageNo: 1,
          pageSize: 10,
        });

        setMatchingPets(firstBatch || []);
        setHasMore((firstBatch || []).length === 10);
        setPageNo(1);
      } catch (error) {
        console.error("Error loading match pets:", error);
      } finally {
        setLoading(false);
      }
    };

    boot();
  }, [currentUser, navigate]);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCardsPerView(1);
      } else if (width < 1100) {
        setCardsPerView(2);
      } else if (width < 1450) {
        setCardsPerView(3);
      } else {
        setCardsPerView(4);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const loadNextPage = async () => {
    if (!hasMore || loadingMore) return;
    try {
      setLoadingMore(true);
      const nextPage = pageNo + 1;
      const nextBatch = await findMatchPets({
        pageNo: nextPage,
        pageSize: 10,
      });

      setMatchingPets((prev) => [...prev, ...(nextBatch || [])]);
      setPageNo(nextPage);
      setHasMore((nextBatch || []).length === 10);
    } catch (error) {
      console.error("Error loading more match pets:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleNext = () => {
    if (matchingPets.length === 0) return;
    const maxStartIndex = Math.max(matchingPets.length - cardsPerView, 0);
    setCurrentIndex((prev) =>
      prev >= maxStartIndex ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    if (matchingPets.length === 0) return;
    const maxStartIndex = Math.max(matchingPets.length - cardsPerView, 0);
    setCurrentIndex((prev) =>
      prev <= 0 ? maxStartIndex : prev - 1
    );
  };

  const handleOpenPetProfile = (petUid) => {
    if (!petUid) return;
    navigate(`/pet/${petUid}`, { state: { readOnly: true, source: "match-making" } });
  };

  useEffect(() => {
    const maxStartIndex = Math.max(matchingPets.length - cardsPerView, 0);
    if (currentIndex >= maxStartIndex - 2 && hasMore && !loadingMore) {
      loadNextPage();
    }
  }, [currentIndex, matchingPets.length, hasMore, loadingMore, cardsPerView]);

  useEffect(() => {
    if (loading || matchingPets.length <= cardsPerView) return undefined;
    const autoSlideTimer = setInterval(() => {
      const maxStartIndex = Math.max(matchingPets.length - cardsPerView, 0);
      setCurrentIndex((prev) => (prev >= maxStartIndex ? 0 : prev + 1));
    }, 2500);

    return () => clearInterval(autoSlideTimer);
  }, [loading, matchingPets.length, cardsPerView]);

  useEffect(() => {
    const maxStartIndex = Math.max(matchingPets.length - cardsPerView, 0);
    if (currentIndex > maxStartIndex) {
      setCurrentIndex(maxStartIndex);
    }
  }, [matchingPets.length, cardsPerView, currentIndex]);

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
          <h1>Find your pet's perfect partner</h1>
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
        {loading ? (
          <div className="loading-con">
            <FadeLoader color="#f06a8a" />
          </div>
        ) : matchingPets.length === 0 ? (
          <div className="empty-con">
            <h2>No match pets found right now.</h2>
          </div>
        ) : (
          <div className="match-feed">
            <button
              type="button"
              className="arrow-btn left"
              onClick={handlePrevious}
              disabled={matchingPets.length <= cardsPerView}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="carousel-window">
              <div
                className="carousel-track"
                style={{
                  transform: `translateX(-${(currentIndex * 100) / cardsPerView}%)`,
                }}
              >
                {matchingPets.map((pet, index) => (
                  <div
                    className="carousel-slide"
                    style={{ flex: `0 0 ${100 / cardsPerView}%` }}
                    key={`${pet?.id || "pet"}-${index}`}
                  >
                    <div
                      className="swipe-card"
                      onClick={() => handleOpenPetProfile(pet?.uid)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          handleOpenPetProfile(pet?.uid);
                        }
                      }}
                    >
                      <img
                        src={resolveS3Url(
                          pet?.profilePhoto ||
                            pet?.photos?.[0]?.url ||
                            pet?.photos?.[0] ||
                            ""
                        )}
                        alt={pet?.name || "Pet"}
                        onError={(event) => {
                          event.target.src =
                            "https://via.placeholder.com/400x600?text=No+Image";
                        }}
                      />
                      <div className="overlay">
                        <h3>{pet?.name || "Unnamed pet"}</h3>
                        <p>{pet?.breed || "Breed"}</p>
                        <div className="meta-row">
                          <span>{pet?.petType || "Pet type"}</span>
                          <span>{pet?.gender || "Gender"}</span>
                        </div>
                        <p className="location">
                          <FontAwesomeIcon icon={faMapMarkerAlt} />
                          <span>
                            {pet?.location?.city || "Location"}
                            {pet?.location?.state ? `, ${pet.location.state}` : ""}
                          </span>
                        </p>
                      </div>
                      <div className="actions">
                        <button
                          type="button"
                          className="cross"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleNext();
                          }}
                        >
                          <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <button
                          type="button"
                          className="heart"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleNext();
                          }}
                        >
                          <FontAwesomeIcon icon={faHeart} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="arrow-btn right"
              onClick={handleNext}
              disabled={matchingPets.length <= cardsPerView}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}

        {loadingMore ? <p className="loading-more">Loading more pets...</p> : null}
      </div>

      <NewFooter />
    </MatchMakingStyledComponent>
    </>
  );
};
