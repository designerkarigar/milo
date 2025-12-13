import React from "react";
import { StyledCrecheDetailModal } from "./styledComponent";
import CloseIcon from "@mui/icons-material/Close";

const CrecheDetailModal = ({ creche, isOpen, onClose }) => {
  if (!isOpen || !creche) return null;

  const getImageUrl = () => {
    if (creche.profilePhoto) {
      return creche.profilePhoto;
    }
    const photo = creche.photos?.find((p) => !p.isIdProof);
    return photo?.url || "";
  };

  const location = creche.location || {};
  const rating = creche.summary?.rating || 0;
  const totalReviews = creche.summary?.totalReviews || 0;
  const totalRatings = creche.summary?.totalRatings || 0;

  return (
    <StyledCrecheDetailModal>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={onClose}>
            <CloseIcon />
          </button>

          <div className="modal-header">
            <h2>{creche.crecheName || "Daycare Details"}</h2>
            {creche.verified && (
              <span className="verified-badge">✓ Verified</span>
            )}
          </div>

          <div className="modal-body">
            {/* Main Image */}
            {getImageUrl() && (
              <div className="detail-image-container">
                <img src={getImageUrl()} alt={creche.crecheName} />
              </div>
            )}

            {/* Rating and Price */}
            <div className="detail-header-info">
              <div className="rating-section">
                <span className="rating-value">{rating.toFixed(1)}</span>
                <span className="star">★</span>
                <span className="rating-text">
                  ({totalRatings} ratings, {totalReviews} reviews)
                </span>
              </div>
              <div className="price-section">
                <span className="price-label">Price:</span>
                <span className="price-value">
                  {creche.pricingPerHour ? `₹${creche.pricingPerHour}/hr` : "N/A"}
                </span>
              </div>
            </div>

            {/* Owner Information */}
            <div className="detail-section">
              <h3>Owner Information</h3>
              <div className="detail-item">
                <span className="label">Owner Name:</span>
                <span className="value">{creche.ownerName || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">Mobile:</span>
                <span className="value">{creche.mobile || "N/A"}</span>
              </div>
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{creche.email || "N/A"}</span>
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
            {(creche.aboutUs || creche.aboutUS) && (
              <div className="detail-section">
                <h3>About Us</h3>
                <p className="about-text">{creche.aboutUs || creche.aboutUS}</p>
              </div>
            )}

            {/* Services */}
            {creche.services && creche.services.length > 0 && (
              <div className="detail-section">
                <h3>Services Offered</h3>
                <div className="services-grid">
                  {creche.services.map((service, idx) => (
                    <span key={idx} className="service-badge">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Days of Operation */}
            {creche.daysOfOperation && creche.daysOfOperation.length > 0 && (
              <div className="detail-section">
                <h3>Days of Operation</h3>
                <div className="days-grid">
                  {creche.daysOfOperation.map((day, idx) => (
                    <span key={idx} className="day-badge">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Hours */}
            {creche.availableHours && creche.availableHours.length > 0 && (
              <div className="detail-section">
                <h3>Available Hours</h3>
                <div className="hours-list">
                  {creche.availableHours.map((hour, idx) => (
                    <div key={idx} className="hour-item">
                      <span className="hour-from">{hour.from}</span>
                      <span className="hour-separator">→</span>
                      <span className="hour-to">{hour.to}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Capacity */}
            {creche.capacity && (
              <div className="detail-section">
                <h3>Capacity</h3>
                <p className="capacity-text">{creche.capacity} pets</p>
              </div>
            )}

            {/* Features */}
            <div className="detail-section">
              <h3>Features</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <span className="feature-label">Separate Area for Dogs:</span>
                  <span className={`feature-value ${creche.separateAreaForDogs === "Yes" ? "yes" : "no"}`}>
                    {creche.separateAreaForDogs || "N/A"}
                  </span>
                </div>
                <div className="feature-item">
                  <span className="feature-label">Live Camera Access:</span>
                  <span className={`feature-value ${creche.liveCameraAcess === "Yes" ? "yes" : "no"}`}>
                    {creche.liveCameraAcess || "N/A"}
                  </span>
                </div>
                <div className="feature-item">
                  <span className="feature-label">Feeding and Diet Support:</span>
                  <span className={`feature-value ${creche.feelingAndDietSupport === "Yes" ? "yes" : "no"}`}>
                    {creche.feelingAndDietSupport || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Photos */}
            {creche.photos && creche.photos.length > 1 && (
              <div className="detail-section">
                <h3>Photos</h3>
                <div className="photos-grid">
                  {creche.photos
                    .filter((p) => !p.isIdProof)
                    .map((photo, idx) => (
                      <div key={idx} className="photo-item">
                        <img src={photo.url} alt={`${creche.crecheName} photo ${idx + 1}`} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </StyledCrecheDetailModal>
  );
};

export default CrecheDetailModal;

