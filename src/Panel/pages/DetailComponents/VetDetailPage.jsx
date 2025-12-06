import {
  CCard,
  CCardBody,
  CContainer,
  CCardHeader,
  CButton,
  CRow,
  CCol,
  CBadge,
  CFormInput,
  CFormTextarea,
  CFormLabel,
} from "@coreui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateUserVerification } from "../../../utils/Functions/Users/updateUserVerification";
import { useImageModal, formatDate } from "./CommonDetailUtils";
import { updateVet } from "../../../utils/Functions/Vets/updateVet";

const VetDetailPage = ({ data: initialData }) => {
  const navigate = useNavigate();
  const { openImageModal, ImageModal } = useImageModal();
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        clinicName: initialData.clinicName || "",
        mobile: initialData.mobile || "",
        email: initialData.email || "",
        specializations: initialData.specializations || "",
        yearsOfExperience: initialData.yearsOfExperience || "",
        veterinaryLicenseNumber: initialData.veterinaryLicenseNumber || "",
        consultationFee: initialData.consultationFee || "",
        languagesSpoken: Array.isArray(initialData.languagesSpoken) 
          ? initialData.languagesSpoken.join(", ") 
          : initialData.languagesSpoken || "",
        aboutUS: initialData.aboutUS || "",
        location: initialData.location || {},
      });
      setPhotos(initialData.photos || []);
    }
  }, [initialData]);

  const seeBooking = () => {
    navigate(`/dashboard/BookingTable?type=vets&uid=${initialData.uid}`);
  };

  const updateVerification = async (status) => {
    try {
      await updateUserVerification("vets", initialData.uid, status);
      alert("User Verification Updated");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  const handlePhotoAccept = (index) => {
    setPhotos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], verified: true };
      return updated;
    });
  };

  const handlePhotoReject = (index) => {
    setPhotos((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], verified: false };
      return updated;
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const payload = {
        ...formData,
        languagesSpoken: formData.languagesSpoken
          ? formData.languagesSpoken.split(",").map((lang) => lang.trim())
          : [],
        photos: photos.map((photo) => ({
          ...photo,
          verified: photo.verified !== undefined ? photo.verified : true,
        })),
      };

      await updateVet(initialData.uid, payload);
      alert("Vet details updated successfully!");
      setIsEditMode(false);
      window.location.reload();
    } catch (error) {
      alert("Error updating vet details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset form data
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        clinicName: initialData.clinicName || "",
        mobile: initialData.mobile || "",
        email: initialData.email || "",
        specializations: initialData.specializations || "",
        yearsOfExperience: initialData.yearsOfExperience || "",
        veterinaryLicenseNumber: initialData.veterinaryLicenseNumber || "",
        consultationFee: initialData.consultationFee || "",
        languagesSpoken: Array.isArray(initialData.languagesSpoken) 
          ? initialData.languagesSpoken.join(", ") 
          : initialData.languagesSpoken || "",
        aboutUS: initialData.aboutUS || "",
        location: initialData.location || {},
      });
      setPhotos(initialData.photos || []);
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
                  <h4 className="mb-0">{initialData.name || "Vet Details"}</h4>
                  <div className="d-flex gap-2">
                    {!isEditMode ? (
                      <>
                        <CButton color="primary" onClick={() => setIsEditMode(true)}>
                          Edit Details
                        </CButton>
                        <CButton color="success" onClick={() => seeBooking()}>
                          Manage Vets Bookings
                        </CButton>
                        <CButton
                          color={initialData.verified ? "success" : "warning"}
                          onClick={() => updateVerification(!initialData.verified)}
                        >
                          {initialData.verified ? "✓ Verified" : "✗ Not Verified"}
                        </CButton>
                      </>
                    ) : (
                      <>
                        <CButton color="success" onClick={handleSave} disabled={loading}>
                          {loading ? "Saving..." : "Save Changes"}
                        </CButton>
                        <CButton color="secondary" onClick={handleCancel}>
                          Cancel
                        </CButton>
                      </>
                    )}
                  </div>
                </div>
              </CCardHeader>
              <CCardBody>
                <CRow>
                  {/* Profile Photo */}
                  {initialData.profilePhoto && (
                    <CCol xs={12} md={3} className="mb-4">
                      <div className="text-center">
                        <h6>Profile Photo</h6>
                        <img
                          src={initialData.profilePhoto}
                          alt="Profile"
                          style={{
                            width: "100%",
                            maxWidth: "300px",
                            height: "auto",
                            borderRadius: "8px",
                            border: "2px solid #dee2e6",
                            cursor: "pointer",
                          }}
                          onClick={() => openImageModal(initialData.profilePhoto)}
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      </div>
                    </CCol>
                  )}

                  {/* Basic Information */}
                  <CCol xs={12} md={initialData.profilePhoto ? 9 : 12}>
                    <h5 className="mb-3">Basic Information</h5>
                    {!isEditMode ? (
                      <>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6}>
                            <strong>Name:</strong> {initialData.name || "N/A"}
                          </CCol>
                          <CCol xs={12} sm={6}>
                            <strong>Clinic Name:</strong> {initialData.clinicName || "N/A"}
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6}>
                            <strong>Mobile:</strong> {initialData.mobile || "N/A"}
                          </CCol>
                          <CCol xs={12} sm={6}>
                            <strong>Email:</strong> {initialData.email || "N/A"}
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6}>
                            <strong>UID:</strong> {initialData.uid || "N/A"}
                          </CCol>
                          <CCol xs={12} sm={6}>
                            <strong>Username:</strong> {initialData.userName || "N/A"}
                          </CCol>
                        </CRow>
                        {initialData.aboutUS && (
                          <CRow className="mb-2">
                            <CCol xs={12}>
                              <strong>About Us:</strong>
                              <p className="mt-1">{initialData.aboutUS}</p>
                            </CCol>
                          </CRow>
                        )}
                      </>
                    ) : (
                      <>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Name</CFormLabel>
                            <CFormInput
                              type="text"
                              value={formData.name || ""}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                          </CCol>
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Clinic Name</CFormLabel>
                            <CFormInput
                              type="text"
                              value={formData.clinicName || ""}
                              onChange={(e) => handleInputChange("clinicName", e.target.value)}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Mobile</CFormLabel>
                            <CFormInput
                              type="text"
                              value={formData.mobile || ""}
                              onChange={(e) => handleInputChange("mobile", e.target.value)}
                            />
                          </CCol>
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Email</CFormLabel>
                            <CFormInput
                              type="email"
                              value={formData.email || ""}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} className="mb-3">
                            <CFormLabel>About Us</CFormLabel>
                            <CFormTextarea
                              value={formData.aboutUS || ""}
                              onChange={(e) => handleInputChange("aboutUS", e.target.value)}
                              rows={3}
                            />
                          </CCol>
                        </CRow>
                      </>
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
              <CCardHeader>Professional Information</CCardHeader>
              <CCardBody>
                {!isEditMode ? (
                  <>
                    <div className="mb-2">
                      <strong>Specializations:</strong> {initialData.specializations || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Years of Experience:</strong> {initialData.yearsOfExperience || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Veterinary License Number:</strong>{" "}
                      {initialData.veterinaryLicenseNumber || "N/A"}
                    </div>
                    <div className="mb-2">
                      <strong>Consultation Fee:</strong> ₹{initialData.consultationFee || "N/A"}
                    </div>
                    {initialData.languagesSpoken && initialData.languagesSpoken.length > 0 && (
                      <div className="mb-2">
                        <strong>Languages Spoken:</strong>
                        <div className="mt-1">
                          {initialData.languagesSpoken.map((lang, idx) => (
                            <CBadge key={idx} color="info" className="me-1">
                              {lang}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <CFormLabel>Specializations</CFormLabel>
                      <CFormInput
                        type="text"
                        value={formData.specializations || ""}
                        onChange={(e) => handleInputChange("specializations", e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>Years of Experience</CFormLabel>
                      <CFormInput
                        type="number"
                        value={formData.yearsOfExperience || ""}
                        onChange={(e) => handleInputChange("yearsOfExperience", e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>Veterinary License Number</CFormLabel>
                      <CFormInput
                        type="text"
                        value={formData.veterinaryLicenseNumber || ""}
                        onChange={(e) => handleInputChange("veterinaryLicenseNumber", e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>Consultation Fee (₹)</CFormLabel>
                      <CFormInput
                        type="number"
                        value={formData.consultationFee || ""}
                        onChange={(e) => handleInputChange("consultationFee", e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>Languages Spoken (comma separated)</CFormLabel>
                      <CFormInput
                        type="text"
                        value={formData.languagesSpoken || ""}
                        onChange={(e) => handleInputChange("languagesSpoken", e.target.value)}
                        placeholder="English, Hindi, French"
                      />
                    </div>
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
                {!isEditMode ? (
                  <>
                    {initialData.location ? (
                      <>
                        <div className="mb-2">
                          <strong>Address:</strong> {initialData.location.address || "N/A"}
                        </div>
                        <div className="mb-2">
                          <strong>City:</strong> {initialData.location.city || "N/A"}
                        </div>
                        <div className="mb-2">
                          <strong>State:</strong> {initialData.location.state || "N/A"}
                        </div>
                        <div className="mb-2">
                          <strong>Zip Code:</strong> {initialData.location.zip || "N/A"}
                        </div>
                        <div className="mb-2">
                          <strong>Country:</strong> {initialData.location.country || "N/A"}
                        </div>
                      </>
                    ) : (
                      <p>Location information not available</p>
                    )}
                    {initialData.timezone && (
                      <div className="mb-2">
                        <strong>Timezone:</strong> {initialData.timezone}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <CFormLabel>Address</CFormLabel>
                      <CFormInput
                        type="text"
                        value={formData.location?.address || ""}
                        onChange={(e) => handleLocationChange("address", e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>City</CFormLabel>
                      <CFormInput
                        type="text"
                        value={formData.location?.city || ""}
                        onChange={(e) => handleLocationChange("city", e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>State</CFormLabel>
                      <CFormInput
                        type="text"
                        value={formData.location?.state || ""}
                        onChange={(e) => handleLocationChange("state", e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>Zip Code</CFormLabel>
                      <CFormInput
                        type="text"
                        value={formData.location?.zip || ""}
                        onChange={(e) => handleLocationChange("zip", e.target.value)}
                      />
                    </div>
                    <div className="mb-3">
                      <CFormLabel>Country</CFormLabel>
                      <CFormInput
                        type="text"
                        value={formData.location?.country || ""}
                        onChange={(e) => handleLocationChange("country", e.target.value)}
                      />
                    </div>
                  </>
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
                {initialData.services && initialData.services.length > 0 && (
                  <div className="mb-3">
                    <strong>Services Offered:</strong>
                    <div className="mt-2">
                      {initialData.services.map((service, idx) => (
                        <CBadge key={idx} color="success" className="me-1 mb-1">
                          {service}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {initialData.daysOfOperation && initialData.daysOfOperation.length > 0 && (
                  <div className="mb-3">
                    <strong>Days of Operation:</strong>
                    <div className="mt-2">
                      {initialData.daysOfOperation.map((day, idx) => (
                        <CBadge key={idx} color="primary" className="me-1 mb-1">
                          {day}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {initialData.availableHours && initialData.availableHours.length > 0 ? (
                  <div className="mb-2">
                    <strong>Available Hours:</strong>
                    <ul className="mt-2">
                      {initialData.availableHours.map((hours, idx) => (
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
                {initialData.summary ? (
                  <>
                    <div className="mb-2">
                      <strong>Total Reviews:</strong> {initialData.summary.totalReviews || 0}
                    </div>
                    <div className="mb-2">
                      <strong>Total Ratings:</strong> {initialData.summary.totalRatings || 0}
                    </div>
                    <div className="mb-2">
                      <strong>Average Rating:</strong> {initialData.summary.rating || 0}
                    </div>
                    <div className="mb-2">
                      <strong>Total Favourites:</strong> {initialData.summary.totalFavourites || 0}
                    </div>
                  </>
                ) : (
                  <p>Summary information not available</p>
                )}
                {initialData.profileCompletionMask && (
                  <div className="mb-2 mt-3">
                    <strong>Profile Completion Mask:</strong> {initialData.profileCompletionMask}
                  </div>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>

        {/* Photos Gallery */}
        {photos && photos.length > 0 && (
          <CRow className="mb-3">
            <CCol xs={12}>
              <CCard>
                <CCardHeader>Photos Gallery</CCardHeader>
                <CCardBody>
                  <CRow>
                    {photos.map((photo, idx) => (
                      <CCol xs={12} sm={6} md={4} lg={3} key={idx} className="mb-3">
                        <div className="text-center">
                          <div className="mb-2">
                            {photo.isIdProof && (
                              <CBadge color="warning" className="me-1">
                                ID Proof
                              </CBadge>
                            )}
                            {isEditMode && (
                              <>
                                {photo.verified === true && (
                                  <CBadge color="success" className="me-1">
                                    ✓ Accepted
                                  </CBadge>
                                )}
                                {photo.verified === false && (
                                  <CBadge color="danger" className="me-1">
                                    ✗ Rejected
                                  </CBadge>
                                )}
                                {photo.verified === undefined && (
                                  <CBadge color="secondary" className="me-1">
                                    Pending
                                  </CBadge>
                                )}
                              </>
                            )}
                          </div>
                          <img
                            src={photo.url}
                            alt={`Gallery item ${idx + 1}`}
                            style={{
                              width: "100%",
                              height: "200px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: isEditMode 
                                ? photo.verified === true 
                                  ? "2px solid #28a745" 
                                  : photo.verified === false 
                                  ? "2px solid #dc3545" 
                                  : "2px solid #dee2e6"
                                : "2px solid #dee2e6",
                              cursor: "pointer",
                            }}
                            onClick={() => openImageModal(photo.url)}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                          {isEditMode && (
                            <div className="mt-2 d-flex gap-2 justify-content-center">
                              <CButton
                                size="sm"
                                color="success"
                                onClick={() => handlePhotoAccept(idx)}
                              >
                                Accept
                              </CButton>
                              <CButton
                                size="sm"
                                color="danger"
                                onClick={() => handlePhotoReject(idx)}
                              >
                                Reject
                              </CButton>
                            </div>
                          )}
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
                    <strong>Created At:</strong> {formatDate(initialData.crdt)}
                  </CCol>
                  <CCol xs={12} sm={6} md={4}>
                    <strong>Updated At:</strong> {formatDate(initialData.upddt)}
                  </CCol>
                  <CCol xs={12} sm={6} md={4}>
                    <strong>Time:</strong> {formatDate(initialData.time)}
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

export default VetDetailPage;

