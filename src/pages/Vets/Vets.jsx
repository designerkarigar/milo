import React, { useState, useEffect } from "react";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import VetCard from "../../components/VetCard";
import VetDetailModal from "../../components/VetDetailModal";
import { getVets } from "../../utils/Functions/Vets/getVets";
import { FadeLoader } from "react-spinners";
import { VetStyledComponent } from "./styledComponent";

export const VetsPage = () => {
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedVet, setSelectedVet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;

  useEffect(() => {
    fetchVets(currentPage);
  }, [currentPage]);

  const fetchVets = async (pageNo) => {
    try {
      setLoading(true);
      const data = await getVets(pageNo, pageSize);
      setVets(data);
      // If we got less than pageSize items, there are no more pages
      setHasMore(data.length === pageSize);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vets:", error);
      alert("Error loading vets. Please try again later.");
      setLoading(false);
    }
  };

  const handleCardClick = (vet) => {
    setSelectedVet(vet);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVet(null);
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
      <VetStyledComponent>
        <div className="vet-navbar">
          <NewNavbar />
        </div>

        <div className="vet-banner">
          <div className="vet-banner-content">
            <h1>
              Ready to find a vet?
              <br />
              Don't wait!
            </h1>
            <p>
              Find the best veterinarians near you. Browse through verified vets
              and book appointments easily.
            </p>
          </div>
          <div className="vet-wave">
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
        </div>

        <div className="vet-content">
          {loading ? (
            <div className="loading-container">
              <FadeLoader color="#0066BA" />
            </div>
          ) : vets.length > 0 ? (
            <>
              <div className="vets-grid">
                {vets.map((vet, index) => (
                  <VetCard
                    key={vet.uid || index}
                    vet={vet}
                    onClick={() => handleCardClick(vet)}
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
                <span className="page-indicator">Page {currentPage + 1}</span>
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
              <p>No vets found.</p>
            </div>
          )}
        </div>
      </VetStyledComponent>

      <VetDetailModal
        vet={selectedVet}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <NewFooter />
    </>
  );
};
