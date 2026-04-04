import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import VetCard from "../../components/VetCard";
import VetDetailModal from "../../components/VetDetailModal";
import { LoginModal } from "../../components/LoginModal";
import { getVets } from "../../utils/Functions/Vets/getVets";
import { FadeLoader } from "react-spinners";
import { VetStyledComponent } from "./styledComponent";
import { SEO } from "../../components/SEO";
import { useLocation } from "../../utils/hooks/useLocation";
import { SearchBox } from "../../components/SearchBox";
import { INDIAN_CITIES } from "../../utils/Constants/IndianCities";

export const VetsPage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Veterinary Services",
    "provider": {
      "@type": "Organization",
      "name": "Milo"
    },
    "description": "Find trusted veterinarians and veterinary clinics for your pets. Book appointments with verified vets specializing in dog and cat care.",
    "areaServed": "India"
  };
  const [vets, setVets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedVet, setSelectedVet] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);
  const [useLocationFilter, setUseLocationFilter] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [cityFilter, setCityFilter] = useState(null);
  const pageSize = 20;
  
  // Get user location
  const { location, isLocationLoading } = useLocation();

  useEffect(() => {
    // Wait for location to be determined (either loaded or failed) before fetching
    if (!isLocationLoading) {
      fetchVets(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, isLocationLoading, searchQuery, cityFilter]);

  // Reset fallback flag only when location changes (not on every page 0 visit)
  useEffect(() => {
    // Reset when location becomes available (first time)
    if (!isLocationLoading && location.lat !== null && location.long !== null) {
      setHasTriedFallback(false);
      setUseLocationFilter(true);
    }
  }, [isLocationLoading, location.lat, location.long]);

  // Reset to page 0 when search changes
  useEffect(() => {
    setCurrentPage(0);
    setHasTriedFallback(false);
  }, [searchQuery, cityFilter]);

  const fetchVets = async (pageNo) => {
    try {
      setLoading(true);
      // Determine if we should use location (only if no city filter is active)
      const shouldUseLocation = useLocationFilter && location.lat !== null && location.long !== null && !cityFilter;
      
      // Check if search query matches a city name (case-insensitive)
      const isCitySearch = searchQuery && INDIAN_CITIES.some(
        city => city.toLowerCase() === searchQuery.toLowerCase()
      );
      
      // Determine city and search query
      const city = cityFilter || (isCitySearch ? searchQuery : null);
      const generalSearch = isCitySearch ? null : searchQuery;
      
      // Pass lat and long if available and we want to use location
      const data = await getVets(
        pageNo, 
        pageSize, 
        shouldUseLocation ? location.lat : null, 
        shouldUseLocation ? location.long : null,
        generalSearch,
        city
      );
      
      // Fallback logic: if no results found on first page with location, try without location
      if (data.length === 0 && pageNo === 0 && shouldUseLocation && !hasTriedFallback && !cityFilter && !searchQuery) {
        setHasTriedFallback(true);
        setUseLocationFilter(false);
        // Retry without location filter
        const fallbackData = await getVets(pageNo, pageSize, null, null, null, null);
        setVets(fallbackData);
        setHasMore(fallbackData.length === pageSize);
      } else {
        setVets(data);
        setHasMore(data.length === pageSize);
      }
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching vets:", error);
      // If error occurs with location, try fallback
      if (useLocationFilter && location.lat !== null && location.long !== null && !hasTriedFallback && currentPage === 0 && !cityFilter && !searchQuery) {
        setHasTriedFallback(true);
        setUseLocationFilter(false);
        try {
          const fallbackData = await getVets(pageNo, pageSize, null, null, null, null);
          setVets(fallbackData);
          setHasMore(fallbackData.length === pageSize);
          setLoading(false);
        } catch (fallbackError) {
          console.error("Error fetching vets (fallback):", fallbackError);
          alert("Error loading vets. Please try again later.");
          setLoading(false);
        }
      } else {
        alert("Error loading vets. Please try again later.");
        setLoading(false);
      }
    }
  };

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
    
    // Check if query matches a city
    const matchedCity = INDIAN_CITIES.find(
      city => city.toLowerCase() === query.toLowerCase()
    );
    
    if (matchedCity) {
      setCityFilter(matchedCity);
    } else {
      setCityFilter(null);
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

  const handleLoginRequired = () => {
    setIsLoginModalOpen(true);
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
      <SEO
        title="Find Trusted Veterinarians & Vets for Your Pets | Milo Vet Services"
        description="Browse and book appointments with verified veterinarians and veterinary clinics. Find the best vets for your dogs, cats, and all pets. Expert pet healthcare services across India."
        keywords="vet, veterinarian, vets, pet vet, dog vet, cat vet, veterinary services, pet healthcare, animal doctor, pet clinic, veterinary clinic, pet medical care"
        url="https://milo.social/vets"
        structuredData={structuredData}
      />
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
              and book appointments easily. Whether you need a vet for your dogs, cats, or any other pet, 
              our platform connects you with trusted veterinary professionals across India. 
              Explore our <Link to="/daycare" style={{color: '#0066BA', textDecoration: 'underline'}}>pet daycare creches</Link> and 
              <Link to="/match-making" style={{color: '#0066BA', textDecoration: 'underline', marginLeft: '5px'}}>pet breeding services</Link> for comprehensive pet care.
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
          <SearchBox 
            onSearch={handleSearch}
            placeholder="Search vets by name, city (e.g., Noida, Mumbai), or services..."
          />
          
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
                    onLoginRequired={handleLoginRequired}
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
        onLoginRequired={handleLoginRequired}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />

      <NewFooter />
    </>
  );
};
