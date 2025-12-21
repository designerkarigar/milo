import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledDayCareCard } from "./styledComponent";

const DayCareCard = ({ creche, onClick }) => {
  const navigate = useNavigate();

  const handleBookNow = (e) => {
    e.stopPropagation(); // Prevent card click
    navigate("/booking-checkout", { state: { creche } });
  };
  // Get the first photo that's not an ID proof, or use profile photo
  const getImageUrl = () => {
    if (creche.profilePhoto) {
      return creche.profilePhoto;
    }
    const photo = creche.photos?.find((p) => !p.isIdProof);
    return photo?.url || "";
  };

  const imageUrl = getImageUrl();
  const location = creche.location?.city || creche.location?.address || "N/A";
  const price = creche.pricingPerHour ? `₹${creche.pricingPerHour}/hr` : "N/A";
  const rating = creche.summary?.rating || 0;
  const totalReviews = creche.summary?.totalReviews || 0;

  return (
    <StyledDayCareCard onClick={onClick}>
      <div className="card-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={creche.crecheName} />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
        {creche.verified && (
          <div className="verified-badge">
            <span>✓ Verified</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{creche.crecheName || "Unnamed Daycare"}</h3>
        <p className="card-owner">Owner: {creche.ownerName || "N/A"}</p>
        <div className="card-location">
          <span>📍</span>
          <span>{location}</span>
        </div>
        <div className="card-info-row">
          <div className="card-rating">
            <span className="rating-value">{rating.toFixed(1)}</span>
            <span className="star">★</span>
            <span className="review-count">({totalReviews})</span>
          </div>
          <div className="card-price">{price}</div>
        </div>
        {creche.services && creche.services.length > 0 && (
          <div className="card-services">
            {creche.services.slice(0, 3).map((service, idx) => (
              <span key={idx} className="service-tag">
                {service}
              </span>
            ))}
            {creche.services.length > 3 && (
              <span className="service-tag">+{creche.services.length - 3} more</span>
            )}
          </div>
        )}
        <button className="book-now-button" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </StyledDayCareCard>
  );
};

export default DayCareCard;

