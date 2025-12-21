import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import { getBookings } from "../../utils/Functions/Bookings/getBookings";
import { FadeLoader } from "react-spinners";
import { StyledMyBookings } from "./styledComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock, faPaw, faHospital, faHome, faHandHoldingHeart, faRupeeSign } from "@fortawesome/free-solid-svg-icons";

export const MyBookingsPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const pageSize = 20;

  useEffect(() => {
    // Redirect to home if not logged in
    if (!currentUser) {
      navigate("/home");
      return;
    }
    fetchBookings(currentPage);
  }, [currentPage, currentUser, navigate]);

  const fetchBookings = async (pageNo) => {
    try {
      setLoading(true);
      const data = await getBookings(pageNo, pageSize);
      setBookings(data);
      setHasMore(data.length === pageSize);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (hasMore) {
      setCurrentPage((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const getServiceIcon = (serviceType) => {
    switch (serviceType) {
      case "vets":
        return faHospital;
      case "creches":
        return faHome;
      case "ngo":
        return faHandHoldingHeart;
      default:
        return faPaw;
    }
  };

  const getServiceName = (booking) => {
    switch (booking.serviceType) {
      case "vets":
        return booking.vetName || "Vet Service";
      case "creches":
        return booking.crecheName || "Daycare Service";
      case "ngo":
        return booking.ngoName || "NGO Service";
      default:
        return "Service";
    }
  };

  const getBookingDateRange = (booking) => {
    if (booking.serviceType === "creches" && booking.bookingFrom && booking.bookingTo) {
      return `${booking.bookingFrom} - ${booking.bookingTo}`;
    }
    if (booking.date) {
      return booking.date;
    }
    if (booking.bookingDate) {
      return booking.bookingDate;
    }
    return "N/A";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "CREATED":
        return "#0066ba";
      case "CONFIRMED":
        return "#4caf50";
      case "CANCELLED":
        return "#f44336";
      case "COMPLETED":
        return "#9e9e9e";
      default:
        return "#666";
    }
  };

  return (
    <>
      <StyledMyBookings>
        <div className="bookings-nav-con">
          <NewNavbar />
        </div>
        <div className="bookings-main-con">
          <div className="bookings-wave">
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

          <div className="bookings-container">
            <h1 className="page-title">My Bookings</h1>

            {loading ? (
              <div className="loading-container">
                <FadeLoader color="#0066BA" />
              </div>
            ) : bookings.length > 0 ? (
              <>
                <div className="bookings-grid">
                  {bookings.map((booking, index) => (
                    <div key={booking.uid || index} className="booking-card">
                      <div className="booking-header">
                        <div className="service-icon">
                          <FontAwesomeIcon icon={getServiceIcon(booking.serviceType)} />
                        </div>
                        <div className="service-info">
                          <h3 className="service-name">{getServiceName(booking)}</h3>
                          <span className="service-type">{booking.serviceType?.toUpperCase() || "SERVICE"}</span>
                        </div>
                        <div className="booking-status" style={{ backgroundColor: getStatusColor(booking.bookingStatus) }}>
                          {booking.bookingStatus || "CREATED"}
                        </div>
                      </div>

                      <div className="booking-details">
                        <div className="detail-row">
                          <FontAwesomeIcon icon={faPaw} />
                          <span className="detail-value">{booking.petName || "N/A"}</span>
                        </div>

                        <div className="detail-row">
                          <FontAwesomeIcon icon={faCalendarAlt} />
                          <span className="detail-label">Date:</span>
                          <span className="detail-value">{getBookingDateRange(booking)}</span>
                        </div>

                        {booking.bookingTime && (
                          <div className="detail-row">
                            <FontAwesomeIcon icon={faClock} />
                            <span className="detail-label">Time:</span>
                            <span className="detail-value">{booking.bookingTime}</span>
                          </div>
                        )}

                        {booking.noOfDays !== null && booking.noOfDays !== undefined && (
                          <div className="detail-row">
                            <FontAwesomeIcon icon={faCalendarAlt} />
                            <span className="detail-label">Number of Days:</span>
                            <span className="detail-value">{booking.noOfDays}</span>
                          </div>
                        )}

                        <div className="detail-row amount-row">
                          <FontAwesomeIcon icon={faRupeeSign} />
                          <span className="detail-label">Amount:</span>
                          <span className="detail-value amount">₹{booking.expBillAmount || 0}</span>
                        </div>
                      </div>

                      {booking.remark && (
                        <div className="booking-remark">
                          <strong>Remark:</strong> {booking.remark}
                        </div>
                      )}
                    </div>
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
              <div className="no-bookings">
                <FontAwesomeIcon icon={faCalendarAlt} />
                <h2>No Bookings Found</h2>
                <p>You haven't made any bookings yet.</p>
              </div>
            )}
          </div>
        </div>
      </StyledMyBookings>
      <NewFooter />
    </>
  );
};

