import React, { useState, useEffect } from "react";
import { StyledDayCare } from "./StyledComponent";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import DayCareCard from "../../components/DayCareCard";
import CrecheDetailModal from "../../components/CrecheDetailModal";
import { LoginModal } from "../../components/LoginModal";
import { getCreches } from "../../utils/Functions/creche/getCreches";
import { FadeLoader } from "react-spinners";

export const DayCare = () => {
  const [creches, setCreches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedCreche, setSelectedCreche] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;

  useEffect(() => {
    fetchCreches(currentPage);
  }, [currentPage]);

  const fetchCreches = async (pageNo) => {
    try {
      setLoading(true);
      const data = await getCreches(pageNo, pageSize);
      setCreches(data);
      // If we got less than pageSize items, there are no more pages
      setHasMore(data.length === pageSize);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching creches:", error);
      alert("Error loading daycares. Please try again later.");
      setLoading(false);
    }
  };

  const handleCardClick = (creche) => {
    setSelectedCreche(creche);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCreche(null);
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <StyledDayCare>
        <div className="nav-bar">
          <NewNavbar />
        </div>
        <div className="daycare-banner-con">
          <div className="shade"></div>
          <div className="daycare-banner-content">
            <h1>
              Discover the perfect daycare
              <br />
              for your furry friends
            </h1>
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

        <div className="daycare-content">
          <div className="daycare-heading">
            <h1>Pet daycare services</h1>
            <h3>"Nurturing your furry loved one, the daycare way!"</h3>
          </div>

          {loading ? (
            <div className="loading-container">
              <FadeLoader color="#0066BA" />
            </div>
          ) : creches.length > 0 ? (
            <>
              <div className="creches-grid">
                {creches.map((creche, index) => (
                  <DayCareCard
                    key={creche.uid || index}
                    creche={creche}
                    onClick={() => handleCardClick(creche)}
                    onLoginRequired={() => setIsLoginModalOpen(true)}
                  />
                ))}
              </div>

              <div className="pagination-controls">
                <button
                  className="pagination-btn"
                  onClick={handlePrevPage}
                  disabled={currentPage === 0 || loading}
                >
                  Previous
                </button>
                <span className="page-indicator">
                  Page {currentPage + 1}
                </span>
                <button
                  className="pagination-btn"
                  onClick={handleNextPage}
                  disabled={!hasMore || loading}
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <div className="no-results">
              <p>No daycares found.</p>
            </div>
          )}
        </div>
      </StyledDayCare>

      <CrecheDetailModal
        creche={selectedCreche}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onLoginRequired={() => {
          setIsModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <NewFooter />
    </>
  );
};
