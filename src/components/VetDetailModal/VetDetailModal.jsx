import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { StyledVetDetailModal } from "./styledComponent";
import CloseIcon from "@mui/icons-material/Close";

const VetDetailModal = ({ vet, isOpen, onClose, onLoginRequired }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBookNow = () => {
    if (!currentUser) {
      if (onLoginRequired) {
        onLoginRequired();
      }
      onClose();
      return;
    }
    onClose();
    navigate("/vet-booking-checkout", { state: { vet } });
  };
  if (!isOpen || !vet) return null;

  const getImageUrl = () => {
    if (vet.profilePhoto) {
      return vet.profilePhoto;
    }
    const photo = vet.photos?.find((p) => !p.isIdProof);
    return photo?.url || "";
  };

  const location = vet.location || {};
  const rating = vet.summary?.rating || 0;
  const totalReviews = vet.summary?.totalReviews || 0;
  const totalRatings = vet.summary?.totalRatings || 0;

  return (
    <StyledVetDetailModal>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            <CloseIcon />
          </button>

          <div className="modal-header">
            <h2>{vet.name || "Vet Details"}</h2>
            {vet.clinicName && <p className="clinic-name">{vet.clinicName}</p>}
            {vet.verified && (
              <span className="verified-badge">✓ Verified</span>
            )}
          </div>

          <div className="modal-body">
            {/* Main Image */}
            {getImageUrl() && (
              <div className="detail-image-container">
                <img src={getImageUrl()} alt={vet.name} />
              </div>
            )}

            {/* Rating and Consultation Fee */}
            <div className="detail-header-info">
              <div className="rating-section">
                <span className="rating-value">{rating.toFixed(1)}</span>
                <span className="star">★</span>
                <span className="rating-text">
                  ({totalRatings} ratings, {totalReviews} reviews)
                </span>
              </div>
              <div className="fee-section">
                <span className="fee-label">Consultation Fee:</span>
                <span className="fee-value">
                  {vet.consultationFee ? `₹${vet.consultationFee}` : "N/A"}
                </span>
              </div>
            </div>

            {/* Specialization and Experience */}
            <div className="detail-section highlight-section">
              <div className="highlight-item">
                <span className="highlight-label">Specialization:</span>
                <span className="highlight-value">{vet.specializations || "N/A"}</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-label">Experience:</span>
                <span className="highlight-value">
                  {vet.yearsOfExperience ? `${vet.yearsOfExperience} years` : "N/A"}
                </span>
              </div>
              {vet.veterinaryLicenseNumber && (
                <div className="highlight-item">
                  <span className="highlight-label">License #:</span>
                  <span className="highlight-value">{vet.veterinaryLicenseNumber}</span>
                </div>
              )}
            </div>

            {/* Contact Information */}
            <div className="detail-section">
              <h3>Contact Information</h3>
              <div className="detail-item">
                <span className="label">Mobile:</span>
                <span className="value">{vet.mobile || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{vet.email || "N/A"}</span>
              </div>
            </div>

            {/* Location */}
            <div className="detail-section">
              <h3>Location</h3>
              <div className="detail-item">
                <span className="label">Address:</span>
                <span className="value">{location.address || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">City:</span>
                <span className="value">{location.city || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">State:</span>
                <span className="value">{location.state || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">ZIP:</span>
                <span className="value">{location.zip || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">Country:</span>
                <span className="value">{location.country || "N/A"}</span>
              </div>
            </div>

            {/* About Us */}
            {vet.aboutUS && (
              <div className="detail-section">
                <h3>About</h3>
                <p className="about-text">{vet.aboutUS}</p>
              </div>
            )}

            {/* Languages Spoken */}
            {vet.languagesSpoken && vet.languagesSpoken.length > 0 && (
              <div className="detail-section">
                <h3>Languages Spoken</h3>
                <div className="languages-grid">
                  {vet.languagesSpoken.map((language, idx) => (
                    <span key={idx} className="language-badge">
                      {language}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Services */}
            {vet.services && vet.services.length > 0 && (
              <div className="detail-section">
                <h3>Services Offered</h3>
                <div className="services-grid">
                  {vet.services.map((service, idx) => (
                    <span key={idx} className="service-badge">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Days of Operation */}
            {vet.daysOfOperation && vet.daysOfOperation.length > 0 && (
              <div className="detail-section">
                <h3>Days of Operation</h3>
                <div className="days-grid">
                  {vet.daysOfOperation.map((day, idx) => (
                    <span key={idx} className="day-badge">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Hours */}
            {vet.availableHours && vet.availableHours.length > 0 && (
              <div className="detail-section">
                <h3>Available Hours</h3>
                <div className="hours-list">
                  {vet.availableHours.map((hour, idx) => (
                    <div key={idx} className="hour-item">
                      <span className="hour-from">{hour.from}</span>
                      <span className="hour-separator">→</span>
                      <span className="hour-to">{hour.to}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Photos */}
            {vet.photos && vet.photos.length > 1 && (
              <div className="detail-section">
                <h3>Photos</h3>
                <div className="photos-grid">
                  {vet.photos
                    .filter((p) => !p.isIdProof)
                    .map((photo, idx) => (
                      <div key={idx} className="photo-item">
                        <img src={photo.url} alt={`${vet.name} photo ${idx + 1}`} />
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Book Now Button */}
            <div className="detail-section">
              <button className="book-now-button" onClick={handleBookNow}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </StyledVetDetailModal>
  );
};

export default VetDetailModal;

