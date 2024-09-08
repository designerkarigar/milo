import React from "react";
import { useState, useEffect } from "react";
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CModal,
  CModalHeader,
  CModalFooter,
  CModalTitle,
  CModalBody,
  CContainer,
} from "@coreui/react";
import { FadeLoader } from "react-spinners";
import { getSingleBookings } from "../../utils/Functions/Bookings/getSingleBooking";
import { getStatusColor } from "../../utils/Functions/Others/getColor";
import { manageBookings } from "../../utils/Functions/Bookings/ManageBookings/manageBookings";
import { useLocation } from "react-router-dom";

const AllBookings = () => {
  const [visible, setVisible] = useState(false);
  const [allBooking, setAllBookings] = useState();
  const [bookinguid, setBookingUid] = useState();

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type");
  const uid = queryParams.get("uid");

  useEffect(() => {
    (async () => {
      try {
        const res = await getSingleBookings(type, uid);
        setAllBookings(res);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const updateStatus = async (status, uid) => {
    try {
      setVisible(false);
      await manageBookings(status, uid);
      // just changing the status to become a visble change
      if (allBooking && allBooking.uid === uid) {
        setAllBookings((prevBooking) => ({
          ...prevBooking,
          bookingStatus: status,
        }));
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div
      className="d-flex flex-column vh-100  container-fluid overflow-y-auto  "
      style={{ width: "100%" }}
    >
      <CModal
        backdrop="static"
        visible={visible}
        onClose={() => setVisible(false)}
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>Booking Status</CModalTitle>
        </CModalHeader>
        <CModalBody>Are you sure that you want to edit this booking</CModalBody>
        <CModalFooter>
          <CButton
            color="success"
            onClick={() => updateStatus("CONFIRMED", bookinguid)}
          >
            Confirm
          </CButton>
          <CButton
            color="danger"
            onClick={() => updateStatus("REJECTED", bookinguid)}
          >
            Reject
          </CButton>
          <CButton
            color="secondary"
            onClick={() => updateStatus("COMPLETED", bookinguid)}
          >
            Completed
          </CButton>
          <CButton
            color="danger"
            onClick={() => updateStatus("CANCELED", bookinguid)}
          >
            Cancel
          </CButton>
        </CModalFooter>
      </CModal>

      {allBooking ? (
        <CCard>
          <CCardHeader>Booking</CCardHeader>
          <CCardBody>
            <p>Customer Name : {allBooking.userName}</p>
            <p> Amount : {allBooking.expBillAmount}</p>

            <p>Time : {allBooking.bookingTime}</p>
            <p>BookingDate : {allBooking.bookingDate}</p>
            <p>Date : {allBooking.date}</p>
            <p>Type : {allBooking.serviceType}</p>
            <p>
              Status:{" "}
              <span style={{ color: getStatusColor(allBooking.bookingStatus) }}>
                {allBooking.bookingStatus}
              </span>
            </p>
            <CButton
              color="primary"
              onClick={() => {
                setVisible(!visible);
                setBookingUid(allBooking.uid);
              }}
            >
              Edit Status
            </CButton>
          </CCardBody>
        </CCard>
      ) : (
        <CContainer
          fluid
          className="d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <FadeLoader color="#00a3da" />
        </CContainer>
      )}
    </div>
  );
};

export default AllBookings;
