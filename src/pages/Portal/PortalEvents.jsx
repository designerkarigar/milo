import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CContainer,
  CRow,
  CCard,
  CCardBody,
  CCardImage,
  CButtonGroup,
  CButton,
} from "@coreui/react";
import { FadeLoader } from "react-spinners";
import { getEvents } from "../../utils/Functions/Events/events";
import { BaseUrlS3 } from "../../utils/Constants/Url";

export const PortalEvents = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const events = await getEvents(99999, 0);
        setData(events);
        setLoading(false);
      } catch (error) {
        alert("Network error, please try again later");
      }
    })();
  }, []);

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
      <CContainer
        fluid
        className="d-flex justify-content-center align-items-center 
          flex-column
          "
      >
        <CRow className="w-100">
          {data.map((card) => (
            <CCard
              key={card.uid}
              style={{ width: "300px", margin: "10px" }}
              onClick={() => navigate(`/dashboard/EventsView?id=${card.uid}`)}
            >
              <CCardImage
                src={BaseUrlS3 + card.photos[0]?.url}
                orientation="top"
                className="mb-0"
              />
              <CCardBody>
                <p>{card.name}</p>
              </CCardBody>
            </CCard>
          ))}
        </CRow>

        <CRow className="justify-content-center mt-3 mb-3">
          <CButtonGroup role="group" aria-label="Basic example">
            <CButton
              color="primary"
              variant="outline"
              onClick={() => navigate(`/dashboard/EventsView?id=0`)}
            >
              Create Event
            </CButton>
          </CButtonGroup>
        </CRow>
      </CContainer>
    );
  }
};

export default PortalEvents;
