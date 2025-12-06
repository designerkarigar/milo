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

const NGODetailPage = ({ data }) => {
  const navigate = useNavigate();
  const { openImageModal, ImageModal } = useImageModal();

  const updateVerification = async (status) => {
    try {
      await updateUserVerification("ngo", data.uid, status);
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
                  <h4 className="mb-0">{data.name || "NGO Details"}</h4>
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
                        <strong>Name:</strong> {data.name || "N/A"}
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol xs={12} sm={6}>
                        <strong>Mobile:</strong> {data.mobile || "N/A"}
                      </CCol>
                    </CRow>
                    <CRow className="mb-2">
                      <CCol xs={12} sm={6}>
                        <strong>UID:</strong> {data.uid || "N/A"}
                      </CCol>
                      <CCol xs={12} sm={6}>
                        <strong>Username:</strong> {data.userName || "N/A"}
                      </CCol>
                    </CRow>
                    {data.historybackground && (
                      <CRow className="mb-2">
                        <CCol xs={12}>
                          <strong>History & Background:</strong>
                          <p className="mt-1">{data.historybackground}</p>
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
          {/* NGO Information */}
          <CCol xs={12} md={6} className="mb-3">
            <CCard>
              <CCardHeader>NGO Information</CCardHeader>
              <CCardBody>
                {data.initiatives && data.initiatives.length > 0 && (
                  <div className="mb-3">
                    <strong>Initiatives:</strong>
                    <div className="mt-2">
                      {data.initiatives.map((initiative, idx) => (
                        <CBadge key={idx} color="success" className="me-1 mb-1">
                          {initiative}
                        </CBadge>
                      ))}
                    </div>
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
                {data.daysOfOperation && data.daysOfOperation.length > 0 && (
                  <div className="mb-3">
                    <strong>Days of Operation:</strong>
                    <div className="mt-2">
                      {data.daysOfOperation.map((day, idx) => (
                        <CBadge key={idx} color="primary" className="me-1 mb-1">
                          {day}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {data.availableHours && data.availableHours.length > 0 ? (
                  <div className="mb-2">
                    <strong>Available Hours:</strong>
                    <ul className="mt-2">
                      {data.availableHours.map((hours, idx) => (
                        <li key={idx}>
                          {hours.from} - {hours.to}
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

export default NGODetailPage;

