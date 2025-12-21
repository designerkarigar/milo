import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { StyledVetCard } from "./styledComponent";

const VetCard = ({ vet, onClick, onLoginRequired }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleBookNow = (e) => {
    e.stopPropagation(); // Prevent card click
    
    if (!currentUser) {
      // User not logged in, trigger login modal
      if (onLoginRequired) {
        onLoginRequired();
      }
      return;
    }
    
    navigate("/vet-booking-checkout", { state: { vet } });
  };
  // Get the first photo that's not an ID proof, or use profile photo
  const getImageUrl = () => {
    if (vet.profilePhoto) {
      return vet.profilePhoto;
    }
    const photo = vet.photos?.find((p) => !p.isIdProof);
    return photo?.url || "";
  };

  const imageUrl = getImageUrl();
  const location = vet.location?.city || vet.location?.address || "N/A";
  const fee = vet.consultationFee ? `₹${vet.consultationFee}` : "N/A";
  const rating = vet.summary?.rating || 0;
  const totalReviews = vet.summary?.totalReviews || 0;
  const experience = vet.yearsOfExperience ? `${vet.yearsOfExperience} years` : "N/A";
  const specialization = vet.specializations || "General Vet";

  return (
    <StyledVetCard onClick={onClick}>
      <div className="card-image-container">
        {imageUrl ? (
          <img src={imageUrl} alt={vet.name} />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
        {vet.verified && (
          <div className="verified-badge">
            <span>✓ Verified</span>
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-title">{vet.name || "Unnamed Vet"}</h3>
        {vet.clinicName && (
          <p className="card-clinic">{vet.clinicName}</p>
        )}
        <div className="card-specialization">{specialization}</div>
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
          <div className="card-fee">{fee}</div>
        </div>
        <div className="card-experience">
          <span className="experience-label">Experience:</span>
          <span className="experience-value">{experience}</span>
        </div>
        {vet.services && vet.services.length > 0 && (
          <div className="card-services">
            {vet.services.slice(0, 3).map((service, idx) => (
              <span key={idx} className="service-tag">
                {service}
              </span>
            ))}
            {vet.services.length > 3 && (
              <span className="service-tag">+{vet.services.length - 3} more</span>
            )}
          </div>
        )}
        <button className="book-now-button" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    </StyledVetCard>
  );
};

export default VetCard;

