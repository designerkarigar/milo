import {
  CCard,
  CCardBody,
  CContainer,
  CCardHeader,
  CButton,
  CRow,
  CCol,
  CBadge,
} from "@coreui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { updateUserVerification } from "../../../utils/Functions/Users/updateUserVerification";
import { useImageModal, formatDate } from "./CommonDetailUtils";

const ServiceProviderDetailPage = ({ data }) => {
  const navigate = useNavigate();
  const { openImageModal, ImageModal } = useImageModal();

  const updateVerification = async (status) => {
    try {
      await updateUserVerification("serviceProviders", data.uid, status);
      alert("User Verification Updated");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <>
      <ImageModal />
      <CContainer fluid>
        <CRow className="mb-3">
          <CCol>
            <div className="mb-3">
              <CButton color="secondary" onClick={() => navigate(-1)}>
                ← Back
              </CButton>
            </div>
            <CCard>
              <CCardHeader>
                <div className="d-flex justify-content-between align-items-center">
                  <h4 className="mb-0">
                    {data.name || data.fullName || data.businessName || "Service Provider Details"}
                  </h4>
                  <div className="d-flex gap-2">
                    <CButton
                      color={data.verified ? "success" : "warning"}
                      onClick={() => updateVerification(!data.verified)}
                    >
                      {data.verified ? "✓ Verified" : "✗ Not Verified"}
                    </CButton>
                  </div>
                </div>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  {/* Profile Photo */}
                  {data.profilePhoto && (
                    <CCol xs={12} md={3} className="mb-4">
                      <div className="text-center">
                        <h6>Profile Photo</h6>
                        <img
                          src={data.profilePhoto}
                          alt="Profile"
                          style={{
                            width: "100%",
                            maxWidth: "300px",
                            height: "auto",
                            borderRadius: "8px",
                            border: "2px solid #dee2e6",
                            cursor: "pointer",
                          }}
                          onClick={() => openImageModal(data.profilePhoto)}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    </CCol>
                  )}

                  {/* Basic Information */}
                  <CCol xs={12} md={data.profilePhoto ? 9 : 12}>
                    <h5 className="mb-3">Basic Information</h5>
                    <CRow className="mb-2">
                      <CCol xs={12} sm={6}>
                        <strong>Name:</strong> {data.name || data.fullName || data.businessName || "N/A"}
                      </CCol>
                      {data.businessName && (
                        <CCol xs={12} sm={6}>
                          <strong>Owner Name:</strong> {data.ownerName || "N/A"}
                        </CCol>
                      )}
                    </CRow>
                    <CRow className="mb-2">
                      <CCol xs={12} sm={6}>
                        <strong>Mobile:</strong> {data.mobile || data.phoneNumber || "N/A"}
                      </CCol>
                      <CCol xs={12} sm={6}>
                        <strong>Email:</strong> {data.email || "N/A"}
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol xs={12} sm={6}>
                        <strong>Service Type:</strong> {data.serviceType || "N/A"}
                      </CCol>
                      {data.businessType && (
                        <CCol xs={12} sm={6}>
                          <strong>Business Type:</strong> {data.businessType}
                        </CCol>
                      )}
                    </CRow>
                    <CRow className="mb-2">
                      <CCol xs={12} sm={6}>
                        <strong>UID:</strong> {data.uid || "N/A"}
                      </CCol>
                      <CCol xs={12} sm={6}>
                        <strong>Username:</strong> {data.userName || "N/A"}
                      </CCol>
                    </CRow>
                    {data.description && (
                      <CRow className="mb-2">
                        <CCol xs={12}>
                          <strong>Description:</strong>
                          <p className="mt-1">{data.description}</p>
                        </CCol>
                      </CRow>
                    )}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow>
          {/* Service Provider Information */}
          <CCol xs={12} md={6} className="mb-3">
            <CCard>
              <CCardHeader>Service Provider Information</CCardHeader>
              <CCardBody>
                {data.serviceCategories && data.serviceCategories.length > 0 && (
                  <div className="mb-3">
                    <strong>Service Categories:</strong>
                    <div className="mt-2">
                      {data.serviceCategories.map((category, idx) => (
                        <CBadge key={idx} color="info" className="me-1 mb-1">
                          {category}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {data.specializations && data.specializations.length > 0 && (
                  <div className="mb-3">
                    <strong>Specializations:</strong>
                    <div className="mt-2">
                      {data.specializations.map((spec, idx) => (
                        <CBadge key={idx} color="success" className="me-1 mb-1">
                          {spec}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Fields specific to Dog Walker/Trainer */}
                {data.serviceType === "Dog Walker" || data.serviceType === "Dog Trainer" ? (
                  <>
                    {data.dateOfBirth && (
                      <div className="mb-2">
                        <strong>Date of Birth:</strong> {data.dateOfBirth}
                      </div>
                    )}
                    {data.experienceYears && (
                      <div className="mb-2">
                        <strong>Years of Experience:</strong> {data.experienceYears}
                      </div>
                    )}
                    {data.specialSkills && data.specialSkills.length > 0 && (
                      <div className="mb-3">
                        <strong>Special Skills:</strong>
                        <div className="mt-2">
                          {data.specialSkills.map((skill, idx) => (
                            <CBadge key={idx} color="warning" className="me-1 mb-1">
                              {skill}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.preferredDogSizes && data.preferredDogSizes.length > 0 && (
                      <div className="mb-2">
                        <strong>Preferred Dog Sizes:</strong>
                        <div className="mt-1">
                          {data.preferredDogSizes.map((size, idx) => (
                            <CBadge key={idx} color="secondary" className="me-1">
                              {size}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.preferredLocationRadius && (
                      <div className="mb-2">
                        <strong>Preferred Location Radius:</strong> {data.preferredLocationRadius} km
                      </div>
                    )}
                    {data.govtIDType && (
                      <div className="mb-2">
                        <strong>Government ID Type:</strong> {data.govtIDType}
                      </div>
                    )}
                    {data.govtIDImage && (
                      <div className="mb-2">
                        <strong>Government ID:</strong>
                        <img
                          src={data.govtIDImage}
                          alt="Government ID"
                          style={{
                            width: "200px",
                            height: "auto",
                            borderRadius: "4px",
                            marginTop: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() => openImageModal(data.govtIDImage)}
                        />
                      </div>
                    )}
                    <div className="mb-2">
                      <strong>Police Verification:</strong> {data.policeVerificationStatus ? "✓ Verified" : "✗ Not Verified"}
                    </div>
                    <div className="mb-2">
                      <strong>Background Check:</strong> {data.backgroundCheckStatus ? "✓ Passed" : "✗ Not Passed"}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Fields for Grooming Van/Business services */}
                    {data.businessType && (
                      <div className="mb-2">
                        <strong>Business Type:</strong> {data.businessType}
                      </div>
                    )}
                    {data.yearsOfExperience || data.experienceYears ? (
                      <div className="mb-2">
                        <strong>Years of Experience:</strong> {data.yearsOfExperience || data.experienceYears}
                      </div>
                    ) : null}
                    {data.servicesOffered && data.servicesOffered.length > 0 && (
                      <div className="mb-3">
                        <strong>Services Offered:</strong>
                        <div className="mt-2">
                          {data.servicesOffered.map((service, idx) => (
                            <CBadge key={idx} color="primary" className="me-1 mb-1">
                              {service}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.services && data.services.length > 0 && (
                      <div className="mb-3">
                        <strong>Services:</strong>
                        <div className="mt-2">
                          {data.services.map((service, idx) => (
                            <CBadge key={idx} color="primary" className="me-1 mb-1">
                              {service}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.petTypesHandled && data.petTypesHandled.length > 0 && (
                      <div className="mb-2">
                        <strong>Pet Types Handled:</strong>
                        <div className="mt-1">
                          {data.petTypesHandled.map((type, idx) => (
                            <CBadge key={idx} color="success" className="me-1">
                              {type}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.petSizesHandled && data.petSizesHandled.length > 0 && (
                      <div className="mb-2">
                        <strong>Pet Sizes Handled:</strong>
                        <div className="mt-1">
                          {data.petSizesHandled.map((size, idx) => (
                            <CBadge key={idx} color="info" className="me-1">
                              {size}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.bookingCapacityPerDay && (
                      <div className="mb-2">
                        <strong>Booking Capacity Per Day:</strong> {data.bookingCapacityPerDay}
                      </div>
                    )}
                    {data.serviceRadius && (
                      <div className="mb-2">
                        <strong>Service Radius:</strong> {data.serviceRadius} km
                      </div>
                    )}
                    {data.onSiteAvailable !== undefined && (
                      <div className="mb-2">
                        <strong>On-Site Available:</strong> {data.onSiteAvailable ? "Yes" : "No"}
                      </div>
                    )}
                    {data.vanDetails && (
                      <div className="mb-3">
                        <strong>Van Details:</strong>
                        <div className="mt-2">
                          {data.vanDetails.vanType && (
                            <div><strong>Type:</strong> {data.vanDetails.vanType}</div>
                          )}
                          {data.vanDetails.size && (
                            <div><strong>Size:</strong> {data.vanDetails.size}</div>
                          )}
                          {data.vanDetails.amenities && (
                            <div><strong>Amenities:</strong> {data.vanDetails.amenities}</div>
                          )}
                        </div>
                      </div>
                    )}
                    {data.equipmentList && data.equipmentList.length > 0 && (
                      <div className="mb-2">
                        <strong>Equipment List:</strong>
                        <div className="mt-1">
                          {data.equipmentList.map((equipment, idx) => (
                            <CBadge key={idx} color="dark" className="me-1">
                              {equipment}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {data.govtLicenseType && (
                      <div className="mb-2">
                        <strong>Government License Type:</strong> {data.govtLicenseType}
                      </div>
                    )}
                    {data.insuranceStatus !== undefined && (
                      <div className="mb-2">
                        <strong>Insurance Status:</strong> {data.insuranceStatus ? "✓ Insured" : "✗ Not Insured"}
                      </div>
                    )}
                    {data.backgroundCheckStatus !== undefined && (
                      <div className="mb-2">
                        <strong>Background Check:</strong> {data.backgroundCheckStatus ? "✓ Passed" : "✗ Not Passed"}
                      </div>
                    )}
                  </>
                )}
                
                {/* Common fields */}
                {data.languagesSpoken && data.languagesSpoken.length > 0 && (
                  <div className="mb-2">
                    <strong>Languages Spoken:</strong>
                    <div className="mt-1">
                      {data.languagesSpoken.map((lang, idx) => (
                        <CBadge key={idx} color="info" className="me-1">
                          {lang}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {data.certifications && data.certifications.length > 0 && (
                  <div className="mb-2">
                    <strong>Certifications:</strong>
                    <ul className="mt-2">
                      {data.certifications.map((cert, idx) => (
                        <li key={idx}>
                          <a href={cert} target="_blank" rel="noopener noreferrer">
                            Certification {idx + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {data.acceptedPayment && data.acceptedPayment.length > 0 && (
                  <div className="mb-2">
                    <strong>Accepted Payment Methods:</strong>
                    <div className="mt-1">
                      {data.acceptedPayment.map((payment, idx) => (
                        <CBadge key={idx} color="primary" className="me-1">
                          {payment}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {data.providesHomeService !== undefined && (
                  <div className="mb-2">
                    <strong>Provides Home Service:</strong> {data.providesHomeService ? "Yes" : "No"}
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>

          {/* Location Information */}
          <CCol xs={12} md={6} className="mb-3">
            <CCard>
              <CCardHeader>Location Information</CCardHeader>
              <CCardBody>
                {data.location ? (
                  <>
                    <div className="mb-2">
                      <strong>Address:</strong> {data.location.address || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>City:</strong> {data.location.city || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>State:</strong> {data.location.state || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Zip Code:</strong> {data.location.zip || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Country:</strong> {data.location.country || "N/A"}
                    </div>
                    {(data.location.latitude || data.location.lat) && (
                      <>
                        <div className="mb-2">
                          <strong>Latitude:</strong> {data.location.latitude || data.location.lat}
                        </div>
                        <div className="mb-2">
                          <strong>Longitude:</strong> {data.location.longitude || data.location.long}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <p>Location information not available</p>
                )}
                {data.timezone && (
                  <div className="mb-2">
                    <strong>Timezone:</strong> {data.timezone}
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        <CRow>
          {/* Services & Operations */}
          <CCol xs={12} md={6} className="mb-3">
            <CCard>
              <CCardHeader>Services & Operations</CCardHeader>
              <CCardBody>
                {data.services && data.services.length > 0 && (
                  <div className="mb-3">
                    <strong>Services Offered:</strong>
                    <div className="mt-2">
                      {data.services.map((service, idx) => (
                        <CBadge key={idx} color="success" className="me-1 mb-1">
                          {service}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {(data.daysOfOperation || data.availableDays) && 
                 (data.daysOfOperation?.length > 0 || data.availableDays?.length > 0) && (
                  <div className="mb-3">
                    <strong>Days of Operation:</strong>
                    <div className="mt-2">
                      {(data.daysOfOperation || data.availableDays).map((day, idx) => (
                        <CBadge key={idx} color="primary" className="me-1 mb-1">
                          {day}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {(data.availableHours || data.availableTimeSlots) && 
                 (data.availableHours?.length > 0 || data.availableTimeSlots?.length > 0) ? (
                  <div className="mb-2">
                    <strong>Available Hours/Time Slots:</strong>
                    <ul className="mt-2">
                      {(data.availableHours || data.availableTimeSlots).map((hours, idx) => (
                        <li key={idx}>
                          {typeof hours === "string" 
                            ? hours 
                            : hours.from && hours.to 
                            ? `${hours.from} - ${hours.to}`
                            : hours}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="mb-2">
                    <strong>Available Hours:</strong> Not specified
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>

          {/* Summary & Statistics */}
          <CCol xs={12} md={6} className="mb-3">
            <CCard>
              <CCardHeader>Summary & Statistics</CCardHeader>
              <CCardBody>
                {data.summary ? (
                  <>
                    <div className="mb-2">
                      <strong>Total Reviews:</strong> {data.summary.totalReviews || 0}
                    </div>
                    <div className="mb-2">
                      <strong>Total Ratings:</strong> {data.summary.totalRatings || 0}
                    </div>
                    <div className="mb-2">
                      <strong>Average Rating:</strong> {data.summary.rating || 0}
                    </div>
                    <div className="mb-2">
                      <strong>Total Favourites:</strong> {data.summary.totalFavourites || 0}
                    </div>
                  </>
                ) : (
                  <p>Summary information not available</p>
                )}
                {data.profileCompletionMask && (
                  <div className="mb-2 mt-3">
                    <strong>Profile Completion Mask:</strong> {data.profileCompletionMask}
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Bank Details */}
        {(data.bankName || data.accountNumber || data.upiId) && (
          <CRow className="mb-3">
            <CCol xs={12}>
              <CCard>
                <CCardHeader>Banking & Payment Information</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>Bank Name:</strong> {data.bankName || "N/A"}
                    </CCol>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>Account Holder Name:</strong> {data.accountHolderName || "N/A"}
                    </CCol>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>Account Number:</strong> {data.accountNumber || "N/A"}
                    </CCol>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>IFSC Code:</strong> {data.ifscCode || "N/A"}
                    </CCol>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>UPI ID:</strong> {data.upiId || "N/A"}
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )}

        {/* Photos Gallery */}
        {data.photos && data.photos.length > 0 && (
          <CRow className="mb-3">
            <CCol xs={12}>
              <CCard>
                <CCardHeader>Photos Gallery</CCardHeader>
                <CCardBody>
                  <CRow>
                    {data.photos.map((photo, idx) => (
                      <CCol xs={12} sm={6} md={4} lg={3} key={idx} className="mb-3">
                        <div className="text-center">
                          {photo.isIdProof && (
                            <CBadge color="warning" className="mb-2">
                              ID Proof
                            </CBadge>
                          )}
                          {photo.isProfile && (
                            <CBadge color="info" className="mb-2">
                              Profile Photo
                            </CBadge>
                          )}
                          <img
                            src={photo.url}
                            alt={`Photo ${idx + 1}`}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "2px solid #dee2e6",
                              cursor: "pointer",
                            }}
                            onClick={() => openImageModal(photo.url)}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      </CCol>
                    ))}
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )}

        {/* Additional Information */}
        <CRow>
          <CCol xs={12}>
            <CCard>
              <CCardHeader>Additional Information</CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs={12} sm={6} md={4}>
                    <strong>Created At:</strong> {formatDate(data.crdt)}
                  </CCol>
                  <CCol xs={12} sm={6} md={4}>
                    <strong>Updated At:</strong> {formatDate(data.upddt)}
                  </CCol>
                  <CCol xs={12} sm={6} md={4}>
                    <strong>Time:</strong> {formatDate(data.time)}
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </>
  );
};

export default ServiceProviderDetailPage;

