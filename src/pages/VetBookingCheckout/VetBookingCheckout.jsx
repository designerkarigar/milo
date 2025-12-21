import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NewNavbar from "../../components/Navbar";
import NewFooter from "../../components/Footer";
import { createVetBooking } from "../../utils/Functions/Bookings/createVetBooking";
import { StyledVetBookingCheckout } from "./styledComponent";
import { FadeLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faClock, faHospital, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export const VetBookingCheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const vet = location.state?.vet;

  useEffect(() => {
    // Redirect to vets page if not logged in or no vet data
    if (!currentUser) {
      navigate("/vets");
      return;
    }
    if (!vet) {
      navigate("/vets");
      return;
    }
  }, [currentUser, vet, navigate]);
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  // Get available days from vet
  const availableDays = vet?.daysOfOperation || [];
  
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

  // Generate time slots based on available hours
  useEffect(() => {
    if (vet?.availableHours && vet.availableHours.length > 0 && selectedDate) {
      const slots = [];
      vet.availableHours.forEach((hourRange) => {
        const from = parseTime(hourRange.from);
        const to = parseTime(hourRange.to);
        
        if (from && to) {
          // Convert to minutes for easier comparison
          const fromMinutes = from.hours * 60 + from.minutes;
          const toMinutes = to.hours * 60 + to.minutes;
          
          let currentMinutes = fromMinutes;
          while (currentMinutes + 60 <= toMinutes) {
            const slotStartHours = Math.floor(currentMinutes / 60);
            const slotStartMins = currentMinutes % 60;
            const slotEndMinutes = currentMinutes + 60;
            const slotEndHours = Math.floor(slotEndMinutes / 60);
            const slotEndMins = slotEndMinutes % 60;
            
            const slotStart = formatTime({ hours: slotStartHours, minutes: slotStartMins });
            const slotEnd = formatTime({ hours: slotEndHours, minutes: slotEndMins });
            
            slots.push({
              value: `${slotStart} - ${slotEnd}`,
              display: `${slotStart} - ${slotEnd}`,
              time: slotStart
            });
            
            currentMinutes += 60; // Move to next hour slot
          }
        }
      });
      setAvailableTimeSlots(slots);
    } else {
      setAvailableTimeSlots([]);
    }
  }, [vet, selectedDate]);

  // Calculate amount when date and time are selected
  useEffect(() => {
    if (selectedDate && selectedTimeSlot && vet?.consultationFee) {
      setAmount(vet.consultationFee);
    } else {
      setAmount(0);
    }
  }, [selectedDate, selectedTimeSlot, vet]);

  // Parse time string (e.g., "09:00" or "9:00 AM") to hours and minutes
  const parseTime = (timeString) => {
    if (!timeString) return null;
    
    // Handle 24-hour format (e.g., "09:00")
    if (timeString.includes(":")) {
      const parts = timeString.split(":");
      const hours = parseInt(parts[0], 10);
      const minutes = parseInt(parts[1]?.split(" ")[0] || "0", 10);
      return { hours, minutes };
    }
    return null;
  };

  // Add hours to time object
  const addHours = (time, hoursToAdd) => {
    return {
      hours: (time.hours + hoursToAdd) % 24,
      minutes: time.minutes
    };
  };

  // Format time object to string (HH:MM)
  const formatTime = (time) => {
    if (!time) return "";
    const hours = String(time.hours).padStart(2, "0");
    const minutes = String(time.minutes).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

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

  const handleDateChange = (value) => {
    const date = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Date must be future
    if (date > today) {
      if (isDateAvailable(value)) {
        setSelectedDate(value);
        setSelectedTimeSlot(""); // Reset time slot when date changes
        setError("");
      } else {
        setError(`Selected date is not available. Available days: ${availableDays.join(", ")}`);
      }
    } else {
      setError("Date must be in the future");
    }
  };

  const handleTimeSlotChange = (value) => {
    setSelectedTimeSlot(value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!selectedDate) {
      setError("Please select a date");
      setLoading(false);
      return;
    }

    if (!selectedTimeSlot) {
      setError("Please select a time slot");
      setLoading(false);
      return;
    }

    try {
      const { bookingDate, bookingTime } = getCurrentDateTime();
      const selectedTime = selectedTimeSlot.split(" - ")[0]; // Get start time from slot
      
      const bookingData = {
        serviceUID: vet.uid,
        bookingDate: formatDate(selectedDate),
        bookingTime: selectedTime,
        expBillAmount: amount,
        timezone: getTimezone()
      };

      await createVetBooking(bookingData);
      setSuccess(true);
      
      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/vets");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!vet) {
    return null;
  }

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <>
      <StyledVetBookingCheckout>
        <div className="vet-booking-nav-con">
          <NewNavbar />
        </div>
        <div className="vet-booking-main-con">
          <div className="vet-booking-wave">
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

          <div className="vet-booking-container">
            <h1 className="vet-booking-title">Book Vet Appointment</h1>
            
            {success ? (
              <div className="success-message">
                <FontAwesomeIcon icon={faCheckCircle} />
                <h2>Booking Successful!</h2>
                <p>Your appointment has been confirmed. Redirecting...</p>
              </div>
            ) : (
              <>
                {/* Vet Info Card */}
                <div className="vet-info-card">
                  <h2>
                    <FontAwesomeIcon icon={faHospital} />
                    {vet.name || "Vet"}
                  </h2>
                  <div className="vet-details">
                    {vet.clinicName && <p><strong>Clinic:</strong> {vet.clinicName}</p>}
                    <p><strong>Location:</strong> {vet.location?.city || vet.location?.address || "N/A"}</p>
                    <p><strong>Consultation Fee:</strong> ₹{vet.consultationFee || 0}</p>
                    <p><strong>Available Days:</strong> {availableDays.join(", ") || "N/A"}</p>
                    {vet.availableHours && vet.availableHours.length > 0 && (
                      <p><strong>Available Hours:</strong> {vet.availableHours.map(h => `${h.from} - ${h.to}`).join(", ")}</p>
                    )}
                  </div>
                </div>

                {/* Booking Form */}
                <form onSubmit={handleSubmit} className="vet-booking-form">
                  {error && <div className="error-message">{error}</div>}

                  <div className="form-group">
                    <label htmlFor="appointmentDate">
                      <FontAwesomeIcon icon={faCalendarAlt} />
                      Appointment Date
                    </label>
                    <input
                      type="date"
                      id="appointmentDate"
                      value={selectedDate}
                      min={minDate}
                      onChange={(e) => handleDateChange(e.target.value)}
                      required
                      className="date-input"
                    />
                    <small className="help-text">
                      Select a date from available days: {availableDays.join(", ")}
                    </small>
                  </div>

                  {selectedDate && availableTimeSlots.length > 0 && (
                    <div className="form-group">
                      <label htmlFor="timeSlot">
                        <FontAwesomeIcon icon={faClock} />
                        Time Slot
                      </label>
                      <select
                        id="timeSlot"
                        value={selectedTimeSlot}
                        onChange={(e) => handleTimeSlotChange(e.target.value)}
                        required
                        className="time-slot-select"
                      >
                        <option value="">Select a time slot</option>
                        {availableTimeSlots.map((slot, index) => (
                          <option key={index} value={slot.value}>
                            {slot.display}
                          </option>
                        ))}
                      </select>
                      <small className="help-text">
                        Select a 1-hour time slot from available hours
                      </small>
                    </div>
                  )}

                  {selectedDate && availableTimeSlots.length === 0 && (
                    <div className="warning-message">
                      No time slots available for the selected date. Please select a different date.
                    </div>
                  )}

                  {/* Booking Summary */}
                  {(selectedDate && selectedTimeSlot && amount > 0) && (
                    <div className="booking-summary">
                      <h3>Booking Summary</h3>
                      <div className="summary-item">
                        <span>Date:</span>
                        <span>{formatDate(selectedDate)}</span>
                      </div>
                      <div className="summary-item">
                        <span>Time Slot:</span>
                        <span>{selectedTimeSlot}</span>
                      </div>
                      <div className="summary-item">
                        <span>Consultation Fee:</span>
                        <span>₹{vet.consultationFee || 0}</span>
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
                      onClick={() => navigate("/vets")}
                      className="cancel-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading || !selectedDate || !selectedTimeSlot || amount === 0}
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
      </StyledVetBookingCheckout>
      <NewFooter />
    </>
  );
};

