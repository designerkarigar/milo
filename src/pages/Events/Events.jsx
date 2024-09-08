import React, { useEffect } from "react";
import { EventsStyled } from "./styledComponent";
import NewNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useState } from "react";
import {
  CContainer,
  CCard,
  CCardBody,
  CCardTitle,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CCardImage,
} from "@coreui/react";
import { getEvents } from "../../utils/Functions/Events/events";
import { FadeLoader } from "react-spinners";

export const Events = () => {
  const pageSize = 5;

  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [events, setEvents] = useState([]);
  const [modalData, setModalData] = useState({});
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const events = await getEvents();
        setEvents(events);
        setLoading(false);
      } catch (err) {
        alert("Network error, please try again later");
      }
    })();
  }, []);

  const loadMore = async () => {
    try {
      setPageNo((prev) => {
        return prev + 1;
      });
      const newEvents = await getEvents(pageSize, pageNo);
      if (newEvents.length === 0) {
        alert("No more events");
        return;
      }
      setEvents([...events, ...newEvents]);
    } catch (error) {
      alert("Network error");
      console.log(error);
    }
  };

  return (
    <>
      <EventsStyled>
        <div className="event-top-con">
          <div className="event-shade"></div>
          <div className="event-nav-con">
            <NewNavbar />
          </div>
          <div className="event-banner">
            <h1>
              Discover Local Dog Events
              <br />
              Unleash Fun!
            </h1>
          </div>
          <div className="event-wave">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              ></path>
            </svg>
          </div>
        </div>

        <CModal
          scrollable
          visible={visible}
          onClose={() => setVisible(false)}
          backdrop="static"
          alignment="center"
        >
          <CModalHeader>
            <span className="fs-3">Event Details</span>
          </CModalHeader>
          <CCardImage></CCardImage>
          <CModalBody>
            <h6>Place</h6>
            <p className="text-primary">{modalData.place}</p>
            <h6>Time</h6>
            <p className="text-success">{modalData.time}</p>
            <h6>Contact Details</h6>
            <p class="text-danger">{modalData.contactDetails}</p>
            <h6>Ticket Price</h6>
            <p className="text-success">{modalData.ticketPrice}</p>
            <h6>Date</h6>
            <p class="text-primary">{modalData.date}</p>
            <h6>Contact Person</h6>
            <p className="text-success">{modalData.contactPerson}</p>
            <h5>Description </h5>
            <p>{modalData.description}</p>
          </CModalBody>
        </CModal>

        <div className="event-data-con">
          <h1 className="event-heading">Events</h1>
          {loading ? (
            <CContainer
              fluid
              className="d-flex justify-content-center align-items-center"
              style={{ height: "100px" }}
            >
              <FadeLoader color="#00a3da" />
            </CContainer>
          ) : (
            <CContainer>
              {events.map((event, index) => (
                <CCard key={index} className="mb-4">
                  <CCardBody>
                    <CCardTitle
                      style={{ fontSize: "2rem", fontWeight: "bold" }}
                    >
                      {event.name}
                    </CCardTitle>
                    <p style={{ marginBottom: "5px" }}>
                      {" "}
                      Description: <span>{event.description}</span>
                    </p>

                    <CButton
                      style={{
                        backgroundColor: "#F06A8A",
                        float: "right",
                        border: "none",
                      }}
                      onClick={() => {
                        setModalData(event);
                        setVisible(!visible);
                      }}
                    >
                      Read more
                    </CButton>
                  </CCardBody>
                </CCard>
              ))}
            </CContainer>
          )}
        </div>
      </EventsStyled>
      <Footer />
    </>
  );
};
