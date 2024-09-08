import {
  CCard,
  CCardBody,
  CContainer,
  CCardHeader,
  CButton,
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
      <>
        <CContainer fluid>
          <CCard>
            <CCardHeader>Vet Details</CCardHeader>
            <CCardBody>
              <div className="mb-3">
                <h3>{type} details</h3>
                <p>Username : {data.uid}</p>
                <p>Mobile : {data.mobile}</p>
                <p>Email : {data.email}</p>
                <p>Location : {data.location.city}</p>
                <p>Address : {data.location.address}</p>
                <div className="w-100 d-flex flex-row gap-2 mb-3 flex-wrap">
                  <CButton color="success" onClick={() => seeBooking()}>
                    Manage {type} Bookings
                  </CButton>
                  <CButton
                    color="primary"
                    onClick={() => updateVerification(!data.verified)}
                  >
                    Verified : {data.verified.toString()}
                  </CButton>
                </div>
              </div>
            </CCardBody>
          </CCard>
          `
        </CContainer>
      </>
    );
  }
};

export default DetailPage;
