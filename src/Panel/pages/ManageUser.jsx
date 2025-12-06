import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../utils/Functions/Users/getUserInfo";
import { deleteUser } from "../../utils/Functions/Users/deleteUser";
import { updateUserVerification } from "../../utils/Functions/Users/updateUserVerification";
import { useNavigate, useLocation } from "react-router-dom";
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CRow,
  CCol,
  CBadge,
} from "@coreui/react";
import { FadeLoader } from "react-spinners";
import { disableUser } from "../../utils/Functions/Users/disableUser";
import { signOutUserGlobally } from "../../utils/Functions/Users/signOutGlobally";
import { enableUser } from "../../utils/Functions/Users/enableUser";

const ManageUser = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get("username");
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    (async () => {
      const user = await getUserInfo(username);
      setUserData(user);
      setLoading(false);
    })();
  }, [username]);

  const updateVerification = async (status) => {
    try {
      await updateUserVerification("user", userData.userName, status);
      alert("User Verification Updated");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  const seeDetails = async (type, uid) => {
    switch (type) {
      case "vets":
        navigate(`/dashboard/DetailPage?type=vets&uid=${uid}`);
        break;
      case "creches":
        navigate(`/dashboard/DetailPage?type=creches&uid=${uid}`);
        break;
      default:
        break;
    }
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setImageModalVisible(true);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    return new Date(timestamp).toLocaleString();
  };

  const deleteAccount = async () => {
    try {
      await deleteUser(userData.idpUserName || userData.cognitoUserName);
      alert("User Deleted");
      navigate("/dashboard/all-user");
    } catch (err) {
      alert(err);
    }
  };

  const signOutGlobally = async () => {
    try {
      await signOutUserGlobally(userData.idpUserName || userData.cognitoUserName);
      alert("User Signed Out");
    } catch (error) {
      alert("Signout failed");
    }
  };

  const disableAccount = async () => {
    try {
      await disableUser(userData.idpUserName || userData.cognitoUserName);
      alert("User Disabled");
    } catch (err) {
      alert(err);
    }
  };

  const enableAccount = async () => {
    try {
      await enableUser(userData.idpUserName || userData.cognitoUserName);
      alert("User Enabled");
    } catch (err) {
      alert(err);
    }
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
    const fullName = `${userData.firstName || ""} ${userData.lastName || ""}`.trim() || "N/A";

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

          {/* Delete Confirmation Modal */}
          <CModal visible={visible} onClose={() => setVisible(false)}>
            <CModalHeader>Confirm Delete</CModalHeader>
            <CModalBody>
              <p>Are you sure you want to delete this user?</p>
              <CButton
                onClick={() => {
                  setVisible(false);
                  deleteAccount();
                }}
              >
                Yes
              </CButton>
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
                    <h4 className="mb-0">{fullName}</h4>
                    <div className="d-flex gap-2">
                      <CButton
                        color={userData.verified ? "success" : "warning"}
                        onClick={() => updateVerification(!userData.verified)}
                      >
                        {userData.verified ? "✓ Verified" : "✗ Not Verified"}
                      </CButton>
                      <CButton color="danger" onClick={() => signOutGlobally()}>
                        Signout Globally
                      </CButton>
                      <CButton color="warning" onClick={() => disableAccount()}>
                        Disable
                      </CButton>
                      <CButton color="success" onClick={() => enableAccount()}>
                        Enable
                      </CButton>
                      <CButton color="danger" onClick={() => setVisible(true)}>
                        Delete User
                      </CButton>
                    </div>
                  </div>
                </CCardHeader>
                <CCardBody>
                  <CRow>
                    {/* Profile Photo */}
                    {userData.profilePhoto && (
                      <CCol xs={12} md={3} className="mb-4">
                        <div className="text-center">
                          <h6>Profile Photo</h6>
                          <img
                            src={userData.profilePhoto}
                            alt="Profile"
                            style={{
                              width: "100%",
                              maxWidth: "300px",
                              height: "auto",
                              borderRadius: "8px",
                              border: "2px solid #dee2e6",
                              cursor: "pointer",
                            }}
                            onClick={() => openImageModal(userData.profilePhoto)}
                            onError={(e) => {
                              e.target.style.display = "none";
                            }}
                          />
                        </div>
                      </CCol>
                    )}

                    {/* Basic Information */}
                    <CCol xs={12} md={userData.profilePhoto ? 9 : 12}>
                      <h5 className="mb-3">Basic Information</h5>
                      <CRow className="mb-2">
                        <CCol xs={12} sm={6}>
                          <strong>First Name:</strong> {userData.firstName || "N/A"}
                        </CCol>
                        <CCol xs={12} sm={6}>
                          <strong>Last Name:</strong> {userData.lastName || "N/A"}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol xs={12} sm={6}>
                          <strong>Email:</strong> {userData.email || "N/A"}
                        </CCol>
                        <CCol xs={12} sm={6}>
                          <strong>Mobile:</strong> {userData.mobile || "N/A"}
                        </CCol>
                      </CRow>
                      <CRow className="mb-2">
                        <CCol xs={12} sm={6}>
                          <strong>Username:</strong> {userData.userName || "N/A"}
                        </CCol>
                        <CCol xs={12} sm={6}>
                          <strong>IDP Username:</strong> {userData.idpUserName || "N/A"}
                        </CCol>
                      </CRow>
                      {userData.about && (
                        <CRow className="mb-2">
                          <CCol xs={12}>
                            <strong>About:</strong>
                            <p className="mt-1">{userData.about}</p>
                          </CCol>
                        </CRow>
                      )}
                      {userData.customRole && (
                        <CRow className="mb-2">
                          <CCol xs={12}>
                            <strong>Custom Role:</strong>{" "}
                            <CBadge color="info">{userData.customRole}</CBadge>
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
            {/* Location Information */}
            <CCol xs={12} md={6} className="mb-3">
              <CCard>
                <CCardHeader>Location Information</CCardHeader>
                <CCardBody>
                  {userData.location ? (
                    <>
                      <div className="mb-2">
                        <strong>Address:</strong> {userData.location.address || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>City:</strong> {userData.location.city || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>State:</strong> {userData.location.state || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Zip Code:</strong> {userData.location.zip || userData.location.pin_code || "N/A"}
                      </div>
                      <div className="mb-2">
                        <strong>Country:</strong> {userData.location.country || "N/A"}
                      </div>
                      {(userData.location.latitude || userData.location.lat) && (
                        <>
                          <div className="mb-2">
                            <strong>Latitude:</strong> {userData.location.latitude || userData.location.lat}
                          </div>
                          <div className="mb-2">
                            <strong>Longitude:</strong> {userData.location.longitude || userData.location.long}
                          </div>
                        </>
                      )}
                    </>
                  ) : (
                    <p>Location information not available</p>
                  )}
                  {userData.timezone && (
                    <div className="mb-2 mt-3">
                      <strong>Timezone:</strong> {userData.timezone}
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>

            {/* User Associations */}
            <CCol xs={12} md={6} className="mb-3">
              <CCard>
                <CCardHeader>User Associations</CCardHeader>
                <CCardBody>
                  {userData.pets && Array.isArray(userData.pets) && userData.pets.length > 0 && (
                    <div className="mb-3">
                      <strong>Pets ({userData.pets.length}):</strong>
                      <div className="mt-2">
                        {userData.pets.map((pet, idx) => (
                          <CBadge key={idx} color="primary" className="me-1 mb-1">
                            {pet}
                          </CBadge>
                        ))}
                      </div>
                    </div>
                  )}
                  {userData.vets && Array.isArray(userData.vets) && userData.vets.length > 0 && (
                    <div className="mb-3">
                      <strong>Vets ({userData.vets.length}):</strong>
                      <div className="mt-2">
                        {userData.vets.map((vet, idx) => (
                          <div key={idx} className="mb-2">
                            <CBadge color="success" className="me-1">
                              {vet}
                            </CBadge>
                            <CButton
                              size="sm"
                              color="success"
                              variant="outline"
                              onClick={() => seeDetails("vets", vet)}
                            >
                              View Details
                            </CButton>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {userData.creches && Array.isArray(userData.creches) && userData.creches.length > 0 && (
                    <div className="mb-3">
                      <strong>Creches ({userData.creches.length}):</strong>
                      <div className="mt-2">
                        {userData.creches.map((creche, idx) => (
                          <div key={idx} className="mb-2">
                            <CBadge color="info" className="me-1">
                              {creche}
                            </CBadge>
                            <CButton
                              size="sm"
                              color="info"
                              variant="outline"
                              onClick={() => seeDetails("creches", creche)}
                            >
                              View Details
                            </CButton>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {userData.ngo && Array.isArray(userData.ngo) && userData.ngo.length > 0 && (
                    <div className="mb-3">
                      <strong>NGO ({userData.ngo.length}):</strong>
                      <div className="mt-2">
                        {userData.ngo.map((ngo, idx) => (
                          <CBadge key={idx} color="warning" className="me-1 mb-1">
                            {ngo}
                          </CBadge>
                        ))}
                      </div>
                    </div>
                  )}
                  {userData.activists && Array.isArray(userData.activists) && userData.activists.length > 0 && (
                    <div className="mb-3">
                      <strong>Activists ({userData.activists.length}):</strong>
                      <div className="mt-2">
                        {userData.activists.map((activist, idx) => (
                          <CBadge key={idx} color="secondary" className="me-1 mb-1">
                            {activist}
                          </CBadge>
                        ))}
                      </div>
                    </div>
                  )}
                  {userData.services && Array.isArray(userData.services) && userData.services.length > 0 && (
                    <div className="mb-2">
                      <strong>Services ({userData.services.length}):</strong>
                      <div className="mt-2">
                        {userData.services.map((service, idx) => (
                          <CBadge key={idx} color="dark" className="me-1 mb-1">
                            {service}
                          </CBadge>
                        ))}
                      </div>
                    </div>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          {/* Devices Information */}
          {userData.devices && Array.isArray(userData.devices) && userData.devices.length > 0 && (
            <CRow className="mb-3">
              <CCol xs={12}>
                <CCard>
                  <CCardHeader>Devices ({userData.devices.length})</CCardHeader>
                  <CCardBody>
                    <CRow>
                      {userData.devices.map((device, idx) => (
                        <CCol xs={12} md={6} lg={4} key={idx} className="mb-3">
                          <CCard>
                            <CCardBody>
                              <div className="mb-2">
                                <strong>Type:</strong> {device.type || "N/A"}
                              </div>
                              <div className="mb-2">
                                <strong>Model:</strong> {device.model || "N/A"}
                              </div>
                              <div className="mb-2">
                                <strong>OS:</strong> {device.os || "N/A"}
                              </div>
                              <div className="mb-2">
                                <strong>Resolution:</strong> {device.resolution || "N/A"}
                              </div>
                              <div className="mb-2">
                                <strong>Device ID:</strong> {device.deviceId || "N/A"}
                              </div>
                              <div className="mb-2">
                                <strong>Added At:</strong> {formatDate(device.addedAt)}
                              </div>
                              <div className="mb-2">
                                <strong>Last Active:</strong> {formatDate(device.lastActiveAt)}
                              </div>
                            </CCardBody>
                          </CCard>
                        </CCol>
                      ))}
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
          )}

          {/* Photos Gallery */}
          {userData.photos && Array.isArray(userData.photos) && userData.photos.length > 0 && (
            <CRow className="mb-3">
              <CCol xs={12}>
                <CCard>
                  <CCardHeader>Photos Gallery</CCardHeader>
                  <CCardBody>
                    <CRow>
                      {userData.photos.map((photo, idx) => (
                        <CCol xs={12} sm={6} md={4} lg={3} key={idx} className="mb-3">
                          <div className="text-center">
                            {photo.isIdProof && (
                              <CBadge color="warning" className="mb-2">
                                ID Proof
                              </CBadge>
                            )}
                            <img
                              src={photo.url}
                              alt={`Gallery item ${idx + 1}`}
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
                      <strong>Created At:</strong> {formatDate(userData.crdt)}
                    </CCol>
                    <CCol xs={12} sm={6} md={4}>
                      <strong>Updated At:</strong> {formatDate(userData.upddt)}
                    </CCol>
                    {userData.lastAIOperationExecutedAt && (
                      <CCol xs={12} sm={6} md={4}>
                        <strong>Last AI Operation:</strong> {formatDate(userData.lastAIOperationExecutedAt)}
                      </CCol>
                    )}
                  </CRow>
                  {userData.profileCompletionMask !== undefined && (
                    <CRow className="mt-2">
                      <CCol xs={12} sm={6} md={4}>
                        <strong>Profile Completion Mask:</strong> {userData.profileCompletionMask}
                      </CCol>
                    </CRow>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </>
    );
  }
};

export default ManageUser;
