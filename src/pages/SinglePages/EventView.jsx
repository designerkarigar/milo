import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormLabel,
  CInputGroup,
  CFormTextarea,
  CButton,
  CButtonGroup,
} from "@coreui/react";
import {
  uploadEvent,
  updateEvent,
  deleteEvent,
  getEventById,
} from "../../utils/Functions/Events/events";
import { FadeLoader } from "react-spinners";

const EventView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const eventId = params.get("id");

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    time: "",
    date: "",
    place: "",
    ticketPrice: "",
    coverImage: "",
    description: "",
    organizer: "",
    contactPerson: "",
    contactDeails: "",
  });

  useEffect(() => {
    (async () => {
      if (eventId !== "0") {
        try {
          setLoading(true);
          const res = await getEventById(eventId);
          setFormData(res);
          setLoading(false);
        } catch (err) {
          alert(err);
        }
      }
    })();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    await reader.readAsDataURL(file);
    let base64String = "";

    reader.onloadend = () => {
      base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
      console.log(base64String);

      setFormData((prevData) => ({
        ...prevData,
        coverImage: base64String,
      }));
    };
  };

  const handleSubmit = async (e) => {
    if (eventId === "0") {
      try {
        await uploadEvent(formData);
        alert("Event created successfully");
        navigate("/dashboard/portal_events");
      } catch (error) {
        alert(error);
      }
    } else {
      try {
        await updateEvent(formData, eventId);
        alert("Event updated successfully");
        navigate("/dashboard/portal_events");
      } catch (err) {
        alert(err);
      }
    }
  };

  const handleEventDelete = async () => {
    try {
      const res = await deleteEvent(formData.uid);
      navigate("/dashboard/portal_events");
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
  }

  return (
    <CContainer fluid>
      <CRow className="justify-content-center">
        <CCol xs="12" md="12">
          <CCard>
            <CCardHeader>Create Event</CCardHeader>
            <CCardBody>
              <CForm onSubmit={handleSubmit}>
                <CInputGroup className="mb-3 display-flex flex-column">
                  <CFormLabel>Name</CFormLabel>
                  <CFormInput
                    type="text"
                    name="name"
                    value={formData?.name}
                    onChange={handleInputChange}
                    className="w-100"
                    required="true"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3 display-flex flex-column">
                  <CFormLabel>Date</CFormLabel>
                  <CFormInput
                    type="date"
                    name="date"
                    value={formData?.date}
                    onChange={handleInputChange}
                    className="w-100"
                    required="true"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3 display-flex flex-column">
                  <CFormLabel>City</CFormLabel>
                  <CFormInput
                    type="text"
                    name="place"
                    value={formData?.place}
                    onChange={handleInputChange}
                    className="w-100"
                    required="true"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3 display-flex flex-column">
                  <CFormLabel>Time</CFormLabel>
                  <CFormInput
                    type="time"
                    name="time"
                    value={formData?.time}
                    onChange={handleInputChange}
                    className="w-100"
                    required="true"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3 display-flex flex-column">
                  <CFormLabel>Price</CFormLabel>
                  <CFormInput
                    type="text"
                    name="ticketPrice"
                    value={formData?.ticketPrice}
                    onChange={handleInputChange}
                    className="w-100"
                    required="true"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3 display-flex flex-column">
                  <CFormLabel>Upload Image</CFormLabel>
                  <CFormInput
                    type="file"
                    onChange={handleImageChange}
                    className="w-100"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3 display-flex flex-column">
                  <CFormLabel>Description</CFormLabel>
                  <CFormTextarea
                    name="description"
                    value={formData?.description}
                    onChange={handleInputChange}
                    className="w-100"
                    style={{ height: "300px" }}
                    required="true"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3 display-flex flex-column">
                  <CFormLabel>Organizer</CFormLabel>
                  <CFormInput
                    type="text"
                    name="organizer"
                    value={formData?.organizer}
                    onChange={handleInputChange}
                    className="w-100"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3 display-flex flex-column">
                  <CFormLabel>Contact Person</CFormLabel>
                  <CFormInput
                    type="text"
                    onChange={handleInputChange}
                    name="contactPerson"
                    value={formData?.contactPerson}
                    className="w-100"
                  />
                </CInputGroup>
                <CInputGroup className="mb-3 display-flex flex-column">
                  <CFormLabel>Contact Details</CFormLabel>
                  <CFormInput
                    type="text"
                    onChange={handleInputChange}
                    name="contactDetails"
                    value={formData?.contactDetails}
                    className="w-100"
                  />
                </CInputGroup>

                <CInputGroup className="mb-3 w-100 ">
                  <CButtonGroup>
                    <CButton
                      color="primary"
                      variant="outline"
                      onClick={() => handleSubmit()}
                    >
                      Save
                    </CButton>
                    <CButton
                      color="primary"
                      variant="outline"
                      onClick={() => {
                        handleEventDelete(formData.uid);
                      }}
                    >
                      Delete
                    </CButton>
                  </CButtonGroup>
                </CInputGroup>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default EventView;
