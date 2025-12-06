import {
  CCard,
  CCardBody,
  CContainer,
  CCardHeader,
  CButton,
  CRow,
  CCol,
  CBadge,
  CModal,
  CModalHeader,
  CModalBody,
} from "@coreui/react";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import { getVetDetails } from "../../utils/Functions/Vets/getVetDetails";
import getCrecheDetails from "../../utils/Functions/creche/getCrecheDetails";
import { updateUserVerification } from "../../utils/Functions/Users/updateUserVerification";

const DetailPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const userName = queryParams.get("uid");
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  useEffect(() => {
    (async () => {
      try {
        if (type === "vets") {
          const userdata = await getVetDetails(userName);
          setData(userdata);
          setLoading(false);
        }
        if (type === "creches") {
          const userdata = await getCrecheDetails(userName);
          setData(userdata);
          setLoading(false);
        }
      } catch (err) {}
    })();
  }, [type]);

  const seeBooking = async () => {
    switch (type) {
      case "vets":
        navigate(`/dashboard/BookingTable?type=vets&uid=${data.uid}`);
        break;
      case "creches":
        navigate(`/dashboard/BookingTable?type=creche&uid=${data.uid}`);
        break;
      default:
        break;
    }
  };

  const updateVerification = async (status) => {
    try {
      await updateUserVerification(type, data.uid, status);
      alert("User Verification Updated");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };

  if (loading) {
    return (
      <CContainer
        fluid
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <FadeLoader color="#00a3da" />
      </CContainer>
    );
  } else {
    const formatDate = (timestamp) => {
      if (!timestamp) return "N/A";
      return new Date(timestamp).toLocaleString();
    };

    return (
      <>
        <CContainer fluid>
          {/* Image Modal */}
          <CModal
            visible={imageModalVisible}
            onClose={() => setImageModalVisible(false)}
            alignment="center"
            size="xl"
          >
            <CModalHeader>
              <h5>Image Preview</h5>
            </CModalHeader>
            <CModalBody className="text-center">
              <img
                src={selectedImage}
                alt="Preview"
                style={{
                  width: "100%",
                  height: "auto",
                  maxHeight: "80vh",
                  objectFit: "contain",
                }}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400?text=Image+Not+Found";
                }}
              />
            </CModalBody>
          </CModal>

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
                      {type === "creches"
                        ? data.crecheName || `${type} Details`
                        : data.name || `${type} Details`}
                    </h4>
                    <div className="d-flex gap-2">
                      <CButton color="success" onClick={() => seeBooking()}>
                        Manage {type} Bookings
                      </CButton>
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
                        {type === "creches" ? (
                          <>
                            <CCol xs={12} sm={6}>
                              <strong>Creche Name:</strong> {data.crecheName || "N/A"}
                            </CCol>
                            <CCol xs={12} sm={6}>
                              <strong>Owner Name:</strong> {data.ownerName || "N/A"}
                            </CCol>
                          </>
                        ) : (
                          <>
                            <CCol xs={12} sm={6}>
                              <strong>Name:</strong> {data.name || "N/A"}
                            </CCol>
                            <CCol xs={12} sm={6}>
                              <strong>Clinic Name:</strong> {data.clinicName || "N/A"}
                            </CCol>
                          </>
                        )}
                      </CRow>
                      <CRow className="mb-2">
                        <CCol xs={12} sm={6}>
                          <strong>Mobile:</strong> {data.mobile || "N/A"}
                        </CCol>
                        <CCol xs={12} sm={6}>
                          <strong>Email:</strong> {data.email || "N/A"}
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
                      {(data.aboutUS || data.aboutUs) && (
                        <CRow className="mb-2">
                          <CCol xs={12}>
                            <strong>About Us:</strong>
                            <p className="mt-1">{data.aboutUS || data.aboutUs}</p>
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
            {/* Professional Information */}
            <CCol xs={12} md={6} className="mb-3">
              <CCard>
                <CCardHeader>
                  {type === "creches" ? "Creche Information" : "Professional Information"}
                </CCardHeader>
                <CCardBody>
                  {type === "creches" ? (
                    <>
                      <div className="mb-2">
                        <strong>Capacity:</strong> {data.capacity || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Pricing Per Hour:</strong> ₹{data.pricingPerHour || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Separate Area for Dogs:</strong>{" "}
                        {data.separateAreaForDogs || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Live Camera Access:</strong> {data.liveCameraAcess || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Feeding and Diet Support:</strong>{" "}
                        {data.feelingAndDietSupport || "N/A"}
                      </div>
                      {data.termsAndConditions && (
                        <div className="mb-2">
                          <strong>Terms and Conditions:</strong>
                          <p className="mt-1">{data.termsAndConditions}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      <div className="mb-2">
                        <strong>Specializations:</strong> {data.specializations || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Years of Experience:</strong> {data.yearsOfExperience || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Veterinary License Number:</strong>{" "}
                        {data.veterinaryLicenseNumber || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Consultation Fee:</strong> ₹{data.consultationFee || "N/A"}
                      </div>
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
                    </>
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
                            {photo.isIdProof && (
                              <CBadge color="warning" className="mb-2">
                                ID Proof
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
  }
};

export default DetailPage;
