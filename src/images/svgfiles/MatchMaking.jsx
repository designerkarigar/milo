import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import { MatchMakingStyledComponent } from "../../pages/Match-Making/styledComponent";
import { SEO } from "../../components/SEO";
import { useAuth } from "../../contexts/AuthContext";
import { getPets } from "../../utils/Functions/Pets/getPets";
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
  const [basePet, setBasePet] = useState(null);

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
        const myPets = await getPets();
        if (!Array.isArray(myPets) || myPets.length === 0) {
          navigate("/add-pet/capture");
          return;
        }

        const petForMatch = myPets[0];
        setBasePet(petForMatch);

        const firstBatch = await findMatchPets({
          pageNo: 1,
          pageSize: 10,
          petType: petForMatch?.petType || "",
          gender: petForMatch?.gender || "",
          breed: petForMatch?.breed || "",
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

  const loadNextPage = async () => {
    if (!hasMore || loadingMore || !basePet) return;
    try {
      setLoadingMore(true);
      const nextPage = pageNo + 1;
      const nextBatch = await findMatchPets({
        pageNo: nextPage,
        pageSize: 10,
        petType: basePet?.petType || "",
        gender: basePet?.gender || "",
        breed: basePet?.breed || "",
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

  const handleNext = async () => {
    if (matchingPets.length === 0) return;

    const nextIndex = currentIndex + 1;
    if (nextIndex >= matchingPets.length - 2 && hasMore) {
      await loadNextPage();
    }

    setCurrentIndex((prev) => {
      const max = matchingPets.length - 1;
      return prev >= max ? prev : prev + 1;
    });
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const activePet = useMemo(
    () => (matchingPets.length ? matchingPets[currentIndex] : null),
    [matchingPets, currentIndex]
  );

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
        ) : !activePet ? (
          <div className="empty-con">
            <h2>No match pets found right now.</h2>
          </div>
        ) : (
          <div className="match-feed">
            <button
              type="button"
              className="arrow-btn left"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            <div className="swipe-card">
              <img
                src={resolveS3Url(
                  activePet?.profilePhoto ||
                    activePet?.photos?.[0]?.url ||
                    activePet?.photos?.[0] ||
                    ""
                )}
                alt={activePet?.name || "Pet"}
                onError={(event) => {
                  event.target.src =
                    "https://via.placeholder.com/400x600?text=No+Image";
                }}
              />
              <div className="overlay">
                <h3>{activePet?.name || "Unnamed pet"}</h3>
                <p>{activePet?.breed || "Breed"}</p>
                <div className="meta-row">
                  <span>{activePet?.petType || "Pet type"}</span>
                  <span>{activePet?.gender || "Gender"}</span>
                </div>
                <p className="location">
                  <FontAwesomeIcon icon={faMapMarkerAlt} />
                  <span>
                    {activePet?.location?.city || "Location"}
                    {activePet?.location?.state
                      ? `, ${activePet.location.state}`
                      : ""}
                  </span>
                </p>
              </div>
              <div className="actions">
                <button type="button" className="cross" onClick={handleNext}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <button type="button" className="heart" onClick={handleNext}>
                  <FontAwesomeIcon icon={faHeart} />
                </button>
              </div>
            </div>

            <button
              type="button"
              className="arrow-btn right"
              onClick={handleNext}
              disabled={currentIndex >= matchingPets.length - 1 && !hasMore}
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
