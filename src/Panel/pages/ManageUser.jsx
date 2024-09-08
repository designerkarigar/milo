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
  CButtonGroup,
  CModal,
  CModalHeader,
  CModalBody,
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

  useEffect(() => {
    (async () => {
      const user = await getUserInfo(username);
      setUserData(user);
      setLoading(false);
    })();
  }, []);

  const updateVerification = async (status) => {
    try {
      await updateUserVerification("user", userData.userName, status);
      alert("User Verification Updated");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  const seeDetails = async (type) => {
    switch (type) {
      case "vets":
        navigate(
          `/dashboard/detailPage?type=vets&uid=${userData.vets.toString()}`
        );
        break;
      case "creches":
        navigate(
          `/dashboard/detailPage?type=creches&uid=${userData.creches.toString()}`
        );
        break;
      default:
        break;
    }
  };

  const deleteAccount = async () => {
    try {
      await deleteUser(userData.cognitoUserName);
      alert("User Deleted");
      navigate("/dashboard/all-user");
    } catch (err) {
      alert(err);
    }
  };

  const signOutGlobally = async () => {
    try {
      await signOutUserGlobally(userData.cognitoUserName);
      alert("User Signed Out");
    } catch (error) {
      alert("Signout failed");
    }
  };

  const disableAccount = async () => {
    try {
      await disableUser(userData.cognitoUserName);
      alert("User Disabled");
    } catch (err) {
      alert(err);
    }
  };

  const enableAccount = async () => {
    try {
      await enableUser(userData.cognitoUserName);
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
    return (
      <CContainer fluid>
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
        <CCard className=" w-100 mb-4 mt-4">
          <CCardHeader>User Details</CCardHeader>
          <CCardBody>
            <h3>User Details</h3>
            <p>Name : {userData.firstName + " " + userData.lastName}</p>
            <p>Mobile : {userData.mobile}</p>
            <p>
              Location : {userData.location.city + ","}{" "}
              {userData.location.address}
            </p>
            <div className="w-100 d-flex flex-row gap-2 mb-3 flex-wrap">
              <CButton
                color="primary"
                onClick={() => updateVerification(!userData.verified)}
              >
                Verified : {userData.verified.toString().toUpperCase()}
              </CButton>
              <CButton color="danger" onClick={() => signOutGlobally()}>
                <span className="text-white">Signout Globally</span>
              </CButton>
              <CButton color="primary" onClick={() => disableAccount()}>
                Disable
              </CButton>
              <CButton color="primary" onClick={() => enableAccount()}>
                Enable
              </CButton>
              <CButton color="danger" onClick={() => setVisible(true)}>
                <span className="text-white">Delete User</span>
              </CButton>
            </div>

            {userData.vets && (
              <div className="mb-3">
                <h3>Vet details</h3>
                <p>Username : {userData.vets.toString()}</p>
                <div className="w-100 d-flex flex-row gap-2 mb-3 flex-wrap">
                  <CButton color="success" onClick={() => seeDetails("vets")}>
                    <span className="text-white">Manage vet</span>
                  </CButton>
                </div>
              </div>
            )}

            {userData.creches && (
              <div className="mb-3">
                <h3>Creche details</h3>
                <p>Username : {userData.creches.toString()}</p>
                <div className="w-100 d-flex flex-row gap-2 mb-3 flex-wrap">
                  <CButton
                    color="success"
                    onClick={() => seeDetails("creches")}
                  >
                    <span className="text-white">Manage Creche</span>
                  </CButton>
                </div>
              </div>
            )}
          </CCardBody>
        </CCard>
      </CContainer>
    );
  }
};

export default ManageUser;
