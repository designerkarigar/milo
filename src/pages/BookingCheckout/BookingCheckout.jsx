import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import { createCrecheBooking } from "../../utils/Functions/Bookings/createCrecheBooking";
import { StyledBookingCheckout } from "./styledComponent";
import { FadeLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock, faPaw, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const BookingCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const creche = location.state?.creche;

  useEffect(() => {
    // Redirect to daycare page if not logged in or no creche data
    if (!currentUser) {
      navigate("/daycare");
      return;
    }
    if (!creche) {
      navigate("/daycare");
      return;
    }
  }, [currentUser, creche, navigate]);
  
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [noOfDays, setNoOfDays] = useState(0);
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Get available days from creche
  const availableDays = creche?.daysOfOperation || [];
  
  // Map day names to day numbers (0 = Sunday, 1 = Monday, etc.)
  const dayNameToNumber = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
  };

  const availableDayNumbers = availableDays.map(day => dayNameToNumber[day] ?? -1).filter(num => num !== -1);

  useEffect(() => {
    if (!creche) {
      navigate("/daycare");
    }
  }, [creche, navigate]);

  // Calculate days and amount when dates change
  useEffect(() => {
    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);
      
      if (to >= from) {
        // Count only available days
        let days = 0;
        const currentDate = new Date(from);
        
        while (currentDate <= to) {
          const dayOfWeek = currentDate.getDay();
          if (availableDayNumbers.includes(dayOfWeek)) {
            days++;
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
        
        setNoOfDays(days);
        
        // Calculate amount: pricingPerHour * 8 hours (assuming full day) * noOfDays
        const hourlyRate = creche?.pricingPerHour || 0;
        const hoursPerDay = 8; // Assuming 8 hours per day
        const calculatedAmount = hourlyRate * hoursPerDay * days;
        setAmount(calculatedAmount);
      } else {
        setNoOfDays(0);
        setAmount(0);
      }
    } else {
      setNoOfDays(0);
      setAmount(0);
    }
  }, [fromDate, toDate, creche, availableDayNumbers]);

  // Validate if date is available (matches daysOfOperation)
  const isDateAvailable = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const dayOfWeek = date.getDay();
    return availableDayNumbers.includes(dayOfWeek);
  };

  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Get current date and time in required format
  const getCurrentDateTime = () => {
    const now = new Date();
    const bookingDate = formatDate(now.toISOString().split('T')[0]);
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const bookingTime = `${hours}:${minutes}:${seconds}`;
    return { bookingDate, bookingTime };
  };

  // Get timezone
  const getTimezone = () => {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
  };

  const handleDateChange = (type, value) => {
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (type === "from") {
      // From date can be present or future
      if (date >= today || date.toDateString() === today.toDateString()) {
        if (isDateAvailable(value)) {
          setFromDate(value);
          setError("");
          
          // If toDate is before new fromDate, reset toDate
          if (toDate && new Date(toDate) < date) {
            setToDate("");
          }
        } else {
          setError(`Selected date is not available. Available days: ${availableDays.join(", ")}`);
        }
      } else {
        setError("From date cannot be in the past");
      }
    } else if (type === "to") {
      // To date must be future relative to fromDate (no daysOfOperation validation)
      if (!fromDate) {
        setError("Please select from date first");
        return;
      }
      
      const from = new Date(fromDate);
      if (date > from) {
        setToDate(value);
        setError("");
      } else {
        setError("To date must be after from date");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!fromDate || !toDate) {
      setError("Please select both from and to dates");
      setLoading(false);
      return;
    }

    if (noOfDays === 0) {
      setError("No available days in the selected range");
      setLoading(false);
      return;
    }

    try {
      const { bookingDate, bookingTime } = getCurrentDateTime();
      
      const bookingData = {
        serviceUID: creche.uid,
        bookingDate: bookingDate,
        bookingTime: bookingTime,
        fromDate: formatDate(fromDate),
        toDate: formatDate(toDate),
        noOfDays: noOfDays,
        expBillAmount: amount,
        timezone: getTimezone()
      };

      await createCrecheBooking(bookingData);
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/daycare");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!creche) {
    return null;
  }

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  
  // Get minimum to date (day after fromDate)
  const minToDate = fromDate ? (() => {
    const nextDay = new Date(fromDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split('T')[0];
  })() : "";

  return (
    <>
      <StyledBookingCheckout>
        <div className="booking-nav-con">
          <NewNavbar />
        </div>
        <div className="booking-main-con">
          <div className="booking-wave">
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

          <div className="booking-container">
            <h1 className="booking-title">Book Daycare Service</h1>
            
            {success ? (
              <div className="success-message">
                <FontAwesomeIcon icon={faCheckCircle} />
                <h2>Booking Successful!</h2>
                <p>Your booking has been confirmed. Redirecting...</p>
              </div>
            ) : (
              <>
                {/* Creche Info Card */}
                <div className="creche-info-card">
                  <h2>
                    <FontAwesomeIcon icon={faPaw} />
                    {creche.crecheName || "Daycare"}
                  </h2>
                  <div className="creche-details">
                    <p><strong>Owner:</strong> {creche.ownerName || "N/A"}</p>
                    <p><strong>Location:</strong> {creche.location?.city || creche.location?.address || "N/A"}</p>
                    <p><strong>Price:</strong> ₹{creche.pricingPerHour || 0}/hr</p>
                    <p><strong>Available Days:</strong> {availableDays.join(", ") || "N/A"}</p>
                  </div>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="booking-form">
                  {error && <div className="error-message">{error}</div>}

                  <div className="form-group">
                    <label htmlFor="fromDate">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      From Date
                    </label>
                    <input
                      type="date"
                      id="fromDate"
                      value={fromDate}
                      min={today}
                      onChange={(e) => handleDateChange("from", e.target.value)}
                      required
                      className="date-input"
                    />
                    <small className="help-text">
                      Select a date from available days: {availableDays.join(", ")}
                    </small>
                  </div>

                  <div className="form-group">
                    <label htmlFor="toDate">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      To Date
                    </label>
                    <input
                      type="date"
                      id="toDate"
                      value={toDate}
                      min={minToDate || today}
                      disabled={!fromDate}
                      onChange={(e) => handleDateChange("to", e.target.value)}
                      required
                      className="date-input"
                    />
                    <small className="help-text">
                      Select an end date that is after the from date
                    </small>
                  </div>

                  {/* Booking Summary */}
                  {(fromDate && toDate && noOfDays > 0) && (
                    <div className="booking-summary">
                      <h3>Booking Summary</h3>
                      <div className="summary-item">
                        <span>From Date:</span>
                        <span>{formatDate(fromDate)}</span>
                      </div>
                      <div className="summary-item">
                        <span>To Date:</span>
                        <span>{formatDate(toDate)}</span>
                      </div>
                      <div className="summary-item">
                        <span>Number of Days:</span>
                        <span>{noOfDays} day(s)</span>
                      </div>
                      <div className="summary-item">
                        <span>Rate per Hour:</span>
                        <span>₹{creche.pricingPerHour || 0}</span>
                      </div>
                      <div className="summary-item total">
                        <span>Total Amount:</span>
                        <span>₹{amount.toFixed(2)}</span>
                      </div>
                    </div>
                  )}

                  <div className="form-actions">
                    <button
                      type="button"
                      onClick={() => navigate("/daycare")}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !fromDate || !toDate || noOfDays === 0}
                      className="submit-button"
                    >
                      {loading ? (
                        <>
                          <FadeLoader color="#fff" height={10} width={2} />
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faCheckCircle} />
                          <span>Confirm Booking</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </StyledBookingCheckout>
      <NewFooter />
    </>
  );
};

