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
import { updateService } from "../../../utils/Functions/services/updateService";

const ServiceProviderDetailPage = ({ data: initialData }) => {
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
        fullName: initialData.fullName || "",
        businessName: initialData.businessName || "",
        ownerName: initialData.ownerName || "",
        mobile: initialData.mobile || initialData.phoneNumber || "",
        email: initialData.email || "",
        serviceType: initialData.serviceType || "",
        businessType: initialData.businessType || "",
        description: initialData.description || "",
        dateOfBirth: initialData.dateOfBirth || "",
        experienceYears: initialData.experienceYears || "",
        yearsOfExperience: initialData.yearsOfExperience || "",
        specialSkills: Array.isArray(initialData.specialSkills) 
          ? initialData.specialSkills.join(", ") 
          : initialData.specialSkills || "",
        preferredDogSizes: Array.isArray(initialData.preferredDogSizes) 
          ? initialData.preferredDogSizes.join(", ") 
          : initialData.preferredDogSizes || "",
        preferredLocationRadius: initialData.preferredLocationRadius || "",
        govtIDType: initialData.govtIDType || "",
        policeVerificationStatus: initialData.policeVerificationStatus || false,
        backgroundCheckStatus: initialData.backgroundCheckStatus || false,
        servicesOffered: Array.isArray(initialData.servicesOffered) 
          ? initialData.servicesOffered.join(", ") 
          : initialData.servicesOffered || "",
        services: Array.isArray(initialData.services) 
          ? initialData.services.join(", ") 
          : initialData.services || "",
        petTypesHandled: Array.isArray(initialData.petTypesHandled) 
          ? initialData.petTypesHandled.join(", ") 
          : initialData.petTypesHandled || "",
        petSizesHandled: Array.isArray(initialData.petSizesHandled) 
          ? initialData.petSizesHandled.join(", ") 
          : initialData.petSizesHandled || "",
        bookingCapacityPerDay: initialData.bookingCapacityPerDay || "",
        serviceRadius: initialData.serviceRadius || "",
        onSiteAvailable: initialData.onSiteAvailable || false,
        vanDetails: initialData.vanDetails || {},
        equipmentList: Array.isArray(initialData.equipmentList) 
          ? initialData.equipmentList.join(", ") 
          : initialData.equipmentList || "",
        govtLicenseType: initialData.govtLicenseType || "",
        insuranceStatus: initialData.insuranceStatus || false,
        languagesSpoken: Array.isArray(initialData.languagesSpoken) 
          ? initialData.languagesSpoken.join(", ") 
          : initialData.languagesSpoken || "",
        acceptedPayment: Array.isArray(initialData.acceptedPayment) 
          ? initialData.acceptedPayment.join(", ") 
          : initialData.acceptedPayment || "",
        providesHomeService: initialData.providesHomeService || false,
        bankName: initialData.bankName || "",
        accountHolderName: initialData.accountHolderName || "",
        accountNumber: initialData.accountNumber || "",
        ifscCode: initialData.ifscCode || "",
        upiId: initialData.upiId || "",
        location: initialData.location || {},
      });
      setPhotos(initialData.photos || []);
    }
  }, [initialData]);

  const updateVerification = async (status) => {
    try {
      await updateUserVerification("serviceProviders", initialData.uid, status);
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
        specialSkills: formData.specialSkills
          ? formData.specialSkills.split(",").map((item) => item.trim())
          : [],
        preferredDogSizes: formData.preferredDogSizes
          ? formData.preferredDogSizes.split(",").map((item) => item.trim())
          : [],
        servicesOffered: formData.servicesOffered
          ? formData.servicesOffered.split(",").map((item) => item.trim())
          : [],
        services: formData.services
          ? formData.services.split(",").map((item) => item.trim())
          : [],
        petTypesHandled: formData.petTypesHandled
          ? formData.petTypesHandled.split(",").map((item) => item.trim())
          : [],
        petSizesHandled: formData.petSizesHandled
          ? formData.petSizesHandled.split(",").map((item) => item.trim())
          : [],
        equipmentList: formData.equipmentList
          ? formData.equipmentList.split(",").map((item) => item.trim())
          : [],
        languagesSpoken: formData.languagesSpoken
          ? formData.languagesSpoken.split(",").map((item) => item.trim())
          : [],
        acceptedPayment: formData.acceptedPayment
          ? formData.acceptedPayment.split(",").map((item) => item.trim())
          : [],
        photos: photos.map((photo) => ({
          ...photo,
          verified: photo.verified !== undefined ? photo.verified : true,
        })),
      };

      await updateService(initialData.uid, payload);
      alert("Service provider details updated successfully!");
      setIsEditMode(false);
      window.location.reload();
    } catch (error) {
      alert("Error updating service provider details: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Reset all fields to their original values from initialData
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        fullName: initialData.fullName || "",
        businessName: initialData.businessName || "",
        ownerName: initialData.ownerName || "",
        mobile: initialData.mobile || initialData.phoneNumber || "",
        email: initialData.email || "",
        serviceType: initialData.serviceType || "",
        businessType: initialData.businessType || "",
        description: initialData.description || "",
        dateOfBirth: initialData.dateOfBirth || "",
        experienceYears: initialData.experienceYears || "",
        yearsOfExperience: initialData.yearsOfExperience || "",
        specialSkills: Array.isArray(initialData.specialSkills) 
          ? initialData.specialSkills.join(", ") 
          : initialData.specialSkills || "",
        preferredDogSizes: Array.isArray(initialData.preferredDogSizes) 
          ? initialData.preferredDogSizes.join(", ") 
          : initialData.preferredDogSizes || "",
        preferredLocationRadius: initialData.preferredLocationRadius || "",
        govtIDType: initialData.govtIDType || "",
        policeVerificationStatus: initialData.policeVerificationStatus || false,
        backgroundCheckStatus: initialData.backgroundCheckStatus || false,
        servicesOffered: Array.isArray(initialData.servicesOffered) 
          ? initialData.servicesOffered.join(", ") 
          : initialData.servicesOffered || "",
        services: Array.isArray(initialData.services) 
          ? initialData.services.join(", ") 
          : initialData.services || "",
        petTypesHandled: Array.isArray(initialData.petTypesHandled) 
          ? initialData.petTypesHandled.join(", ") 
          : initialData.petTypesHandled || "",
        petSizesHandled: Array.isArray(initialData.petSizesHandled) 
          ? initialData.petSizesHandled.join(", ") 
          : initialData.petSizesHandled || "",
        bookingCapacityPerDay: initialData.bookingCapacityPerDay || "",
        serviceRadius: initialData.serviceRadius || "",
        onSiteAvailable: initialData.onSiteAvailable || false,
        vanDetails: initialData.vanDetails || {},
        equipmentList: Array.isArray(initialData.equipmentList) 
          ? initialData.equipmentList.join(", ") 
          : initialData.equipmentList || "",
        govtLicenseType: initialData.govtLicenseType || "",
        insuranceStatus: initialData.insuranceStatus || false,
        languagesSpoken: Array.isArray(initialData.languagesSpoken) 
          ? initialData.languagesSpoken.join(", ") 
          : initialData.languagesSpoken || "",
        acceptedPayment: Array.isArray(initialData.acceptedPayment) 
          ? initialData.acceptedPayment.join(", ") 
          : initialData.acceptedPayment || "",
        providesHomeService: initialData.providesHomeService || false,
        bankName: initialData.bankName || "",
        accountHolderName: initialData.accountHolderName || "",
        accountNumber: initialData.accountNumber || "",
        ifscCode: initialData.ifscCode || "",
        upiId: initialData.upiId || "",
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
                  <h4 className="mb-0">
                    {initialData.name || initialData.fullName || initialData.businessName || "Service Provider Details"}
                  </h4>
                  <div className="d-flex gap-2">
                    {!isEditMode ? (
                      <>
                        <CButton color="primary" onClick={() => setIsEditMode(true)}>
                          Edit Details
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
                            <strong>Name:</strong> {initialData.name || initialData.fullName || initialData.businessName || "N/A"}
                          </CCol>
                          {initialData.businessName && (
                            <CCol xs={12} sm={6}>
                              <strong>Owner Name:</strong> {initialData.ownerName || "N/A"}
                            </CCol>
                          )}
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6}>
                            <strong>Mobile:</strong> {initialData.mobile || initialData.phoneNumber || "N/A"}
                          </CCol>
                          <CCol xs={12} sm={6}>
                            <strong>Email:</strong> {initialData.email || "N/A"}
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6}>
                            <strong>Service Type:</strong> {initialData.serviceType || "N/A"}
                          </CCol>
                          {initialData.businessType && (
                            <CCol xs={12} sm={6}>
                              <strong>Business Type:</strong> {initialData.businessType}
                            </CCol>
                          )}
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6}>
                            <strong>UID:</strong> {initialData.uid || "N/A"}
                          </CCol>
                          <CCol xs={12} sm={6}>
                            <strong>Username:</strong> {initialData.userName || "N/A"}
                          </CCol>
                        </CRow>
                        {initialData.description && (
                          <CRow className="mb-2">
                            <CCol xs={12}>
                              <strong>Description:</strong>
                              <p className="mt-1">{initialData.description}</p>
                            </CCol>
                          </CRow>
                        )}
                      </>
                    ) : (
                      <>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Name / Full Name</CFormLabel>
                            <CFormInput
                              type="text"
                              value={formData.name || formData.fullName || ""}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                            />
                          </CCol>
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Business Name</CFormLabel>
                            <CFormInput
                              type="text"
                              value={formData.businessName || ""}
                              onChange={(e) => handleInputChange("businessName", e.target.value)}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Owner Name</CFormLabel>
                            <CFormInput
                              type="text"
                              value={formData.ownerName || ""}
                              onChange={(e) => handleInputChange("ownerName", e.target.value)}
                            />
                          </CCol>
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Mobile</CFormLabel>
                            <CFormInput
                              type="text"
                              value={formData.mobile || ""}
                              onChange={(e) => handleInputChange("mobile", e.target.value)}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Email</CFormLabel>
                            <CFormInput
                              type="email"
                              value={formData.email || ""}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                            />
                          </CCol>
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Service Type</CFormLabel>
                            <CFormInput
                              type="text"
                              value={formData.serviceType || ""}
                              onChange={(e) => handleInputChange("serviceType", e.target.value)}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} sm={6} className="mb-3">
                            <CFormLabel>Business Type</CFormLabel>
                            <CFormInput
                              type="text"
                              value={formData.businessType || ""}
                              onChange={(e) => handleInputChange("businessType", e.target.value)}
                            />
                          </CCol>
                        </CRow>
                        <CRow className="mb-2">
                          <CCol xs={12} className="mb-3">
                            <CFormLabel>Description</CFormLabel>
                            <CFormTextarea
                              value={formData.description || ""}
                              onChange={(e) => handleInputChange("description", e.target.value)}
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
          {/* Service Provider Information */}
          <CCol xs={12} md={6} className="mb-3">
            <CCard>
              <CCardHeader>Service Provider Information</CCardHeader>
              <CCardBody>
                {initialData.serviceCategories && initialData.serviceCategories.length > 0 && (
                  <div className="mb-3">
                    <strong>Service Categories:</strong>
                    <div className="mt-2">
                      {initialData.serviceCategories.map((category, idx) => (
                        <CBadge key={idx} color="info" className="me-1 mb-1">
                          {category}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {initialData.specializations && initialData.specializations.length > 0 && (
                  <div className="mb-3">
                    <strong>Specializations:</strong>
                    <div className="mt-2">
                      {initialData.specializations.map((spec, idx) => (
                        <CBadge key={idx} color="success" className="me-1 mb-1">
                          {spec}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Fields specific to Dog Walker/Trainer */}
                {initialData.serviceType === "Dog Walker" || initialData.serviceType === "Dog Trainer" ? (
                  <>
                    {initialData.dateOfBirth && (
                      <div className="mb-2">
                        <strong>Date of Birth:</strong> {initialData.dateOfBirth}
                      </div>
                    )}
                    {initialData.experienceYears && (
                      <div className="mb-2">
                        <strong>Years of Experience:</strong> {initialData.experienceYears}
                      </div>
                    )}
                    {initialData.specialSkills && initialData.specialSkills.length > 0 && (
                      <div className="mb-3">
                        <strong>Special Skills:</strong>
                        <div className="mt-2">
                          {initialData.specialSkills.map((skill, idx) => (
                            <CBadge key={idx} color="warning" className="me-1 mb-1">
                              {skill}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {initialData.preferredDogSizes && initialData.preferredDogSizes.length > 0 && (
                      <div className="mb-2">
                        <strong>Preferred Dog Sizes:</strong>
                        <div className="mt-1">
                          {initialData.preferredDogSizes.map((size, idx) => (
                            <CBadge key={idx} color="secondary" className="me-1">
                              {size}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {initialData.preferredLocationRadius && (
                      <div className="mb-2">
                        <strong>Preferred Location Radius:</strong> {initialData.preferredLocationRadius} km
                      </div>
                    )}
                    {initialData.govtIDType && (
                      <div className="mb-2">
                        <strong>Government ID Type:</strong> {initialData.govtIDType}
                      </div>
                    )}
                    {initialData.govtIDImage && (
                      <div className="mb-2">
                        <strong>Government ID:</strong>
                        <img
                          src={initialData.govtIDImage}
                          alt="Government ID"
                          style={{
                            width: "200px",
                            height: "auto",
                            borderRadius: "4px",
                            marginTop: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() => openImageModal(initialData.govtIDImage)}
                        />
                      </div>
                    )}
                    <div className="mb-2">
                      <strong>Police Verification:</strong> {initialData.policeVerificationStatus ? "✓ Verified" : "✗ Not Verified"}
                    </div>
                    <div className="mb-2">
                      <strong>Background Check:</strong> {initialData.backgroundCheckStatus ? "✓ Passed" : "✗ Not Passed"}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Fields for Grooming Van/Business services */}
                    {initialData.businessType && (
                      <div className="mb-2">
                        <strong>Business Type:</strong> {initialData.businessType}
                      </div>
                    )}
                    {initialData.yearsOfExperience || initialData.experienceYears ? (
                      <div className="mb-2">
                        <strong>Years of Experience:</strong> {initialData.yearsOfExperience || initialData.experienceYears}
                      </div>
                    ) : null}
                    {initialData.servicesOffered && initialData.servicesOffered.length > 0 && (
                      <div className="mb-3">
                        <strong>Services Offered:</strong>
                        <div className="mt-2">
                          {initialData.servicesOffered.map((service, idx) => (
                            <CBadge key={idx} color="primary" className="me-1 mb-1">
                              {service}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {initialData.services && initialData.services.length > 0 && (
                      <div className="mb-3">
                        <strong>Services:</strong>
                        <div className="mt-2">
                          {initialData.services.map((service, idx) => (
                            <CBadge key={idx} color="primary" className="me-1 mb-1">
                              {service}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {initialData.petTypesHandled && initialData.petTypesHandled.length > 0 && (
                      <div className="mb-2">
                        <strong>Pet Types Handled:</strong>
                        <div className="mt-1">
                          {initialData.petTypesHandled.map((type, idx) => (
                            <CBadge key={idx} color="success" className="me-1">
                              {type}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {initialData.petSizesHandled && initialData.petSizesHandled.length > 0 && (
                      <div className="mb-2">
                        <strong>Pet Sizes Handled:</strong>
                        <div className="mt-1">
                          {initialData.petSizesHandled.map((size, idx) => (
                            <CBadge key={idx} color="info" className="me-1">
                              {size}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {initialData.bookingCapacityPerDay && (
                      <div className="mb-2">
                        <strong>Booking Capacity Per Day:</strong> {initialData.bookingCapacityPerDay}
                      </div>
                    )}
                    {initialData.serviceRadius && (
                      <div className="mb-2">
                        <strong>Service Radius:</strong> {initialData.serviceRadius} km
                      </div>
                    )}
                    {initialData.onSiteAvailable !== undefined && (
                      <div className="mb-2">
                        <strong>On-Site Available:</strong> {initialData.onSiteAvailable ? "Yes" : "No"}
                      </div>
                    )}
                    {initialData.vanDetails && (
                      <div className="mb-3">
                        <strong>Van Details:</strong>
                        <div className="mt-2">
                          {initialData.vanDetails.vanType && (
                            <div><strong>Type:</strong> {initialData.vanDetails.vanType}</div>
                          )}
                          {initialData.vanDetails.size && (
                            <div><strong>Size:</strong> {initialData.vanDetails.size}</div>
                          )}
                          {initialData.vanDetails.amenities && (
                            <div><strong>Amenities:</strong> {initialData.vanDetails.amenities}</div>
                          )}
                        </div>
                      </div>
                    )}
                    {initialData.equipmentList && initialData.equipmentList.length > 0 && (
                      <div className="mb-2">
                        <strong>Equipment List:</strong>
                        <div className="mt-1">
                          {initialData.equipmentList.map((equipment, idx) => (
                            <CBadge key={idx} color="dark" className="me-1">
                              {equipment}
                            </CBadge>
                          ))}
                        </div>
                      </div>
                    )}
                    {initialData.govtLicenseType && (
                      <div className="mb-2">
                        <strong>Government License Type:</strong> {initialData.govtLicenseType}
                      </div>
                    )}
                    {initialData.insuranceStatus !== undefined && (
                      <div className="mb-2">
                        <strong>Insurance Status:</strong> {initialData.insuranceStatus ? "✓ Insured" : "✗ Not Insured"}
                      </div>
                    )}
                    {initialData.backgroundCheckStatus !== undefined && (
                      <div className="mb-2">
                        <strong>Background Check:</strong> {initialData.backgroundCheckStatus ? "✓ Passed" : "✗ Not Passed"}
                      </div>
                    )}
                  </>
                )}
                
                {/* Common fields */}
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
                {initialData.certifications && initialData.certifications.length > 0 && (
                  <div className="mb-2">
                    <strong>Certifications:</strong>
                    <ul className="mt-2">
                      {initialData.certifications.map((cert, idx) => (
                        <li key={idx}>
                          <a href={cert} target="_blank" rel="noopener noreferrer">
                            Certification {idx + 1}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {initialData.acceptedPayment && initialData.acceptedPayment.length > 0 && (
                  <div className="mb-2">
                    <strong>Accepted Payment Methods:</strong>
                    <div className="mt-1">
                      {initialData.acceptedPayment.map((payment, idx) => (
                        <CBadge key={idx} color="primary" className="me-1">
                          {payment}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {initialData.providesHomeService !== undefined && (
                  <div className="mb-2">
                    <strong>Provides Home Service:</strong> {initialData.providesHomeService ? "Yes" : "No"}
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
                    {(initialData.location.latitude || initialData.location.lat) && (
                      <>
                        <div className="mb-2">
                          <strong>Latitude:</strong> {initialData.location.latitude || initialData.location.lat}
                        </div>
                        <div className="mb-2">
                          <strong>Longitude:</strong> {initialData.location.longitude || initialData.location.long}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <p>Location information not available</p>
                )}
                {initialData.timezone && (
                  <div className="mb-2">
                    <strong>Timezone:</strong> {initialData.timezone}
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
                {(initialData.daysOfOperation || initialData.availableDays) && 
                 (initialData.daysOfOperation?.length > 0 || initialData.availableDays?.length > 0) && (
                  <div className="mb-3">
                    <strong>Days of Operation:</strong>
                    <div className="mt-2">
                      {(initialData.daysOfOperation || initialData.availableDays).map((day, idx) => (
                        <CBadge key={idx} color="primary" className="me-1 mb-1">
                          {day}
                        </CBadge>
                      ))}
                    </div>
                  </div>
                )}
                {(initialData.availableHours || initialData.availableTimeSlots) && 
                 (initialData.availableHours?.length > 0 || initialData.availableTimeSlots?.length > 0) ? (
                  <div className="mb-2">
                    <strong>Available Hours/Time Slots:</strong>
                    <ul className="mt-2">
                      {(initialData.availableHours || initialData.availableTimeSlots).map((hours, idx) => (
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

        {/* Bank Details */}
        {(initialData.bankName || initialData.accountNumber || initialData.upiId) && (
          <CRow className="mb-3">
            <CCol xs={12}>
              <CCard>
                <CCardHeader>Banking & Payment Information</CCardHeader>
                <CCardBody>
                  <CRow>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>Bank Name:</strong> {initialData.bankName || "N/A"}
                    </CCol>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>Account Holder Name:</strong> {initialData.accountHolderName || "N/A"}
                    </CCol>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>Account Number:</strong> {initialData.accountNumber || "N/A"}
                    </CCol>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>IFSC Code:</strong> {initialData.ifscCode || "N/A"}
                    </CCol>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>UPI ID:</strong> {initialData.upiId || "N/A"}
                    </CCol>
                  </CRow>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        )}

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
                            {photo.isProfile && (
                              <CBadge color="info" className="me-1">
                                Profile Photo
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

export default ServiceProviderDetailPage;

