import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { StyledLostFound } from "./styledComponent";
import { fetchLostAndFound } from "../../utils/Functions/LostFound/lostAndFoundApi";
import {
  formatTimeSince,
  haversineKm,
  pickReporterContactFields,
} from "../../utils/Functions/LostFound/lostFoundUtils";
import defaultPhoto from "../../images/svgfiles/avatar-1.svg";
import { LostFoundPetPhoto } from "./LostFoundPetPhoto";
import { LostFoundContactReporterModal } from "./LostFoundContactReporterModal";

const DEFAULT_CITY = "Noida";
const DEFAULT_ZIP = "201301";

function useUserGeo() {
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) =>
        setCoords({
          lat: pos.coords.latitude,
          long: pos.coords.longitude,
        }),
      () => setCoords(null),
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 8000 }
    );
  }, []);

  return coords;
}

export const LostFoundPage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const userCoords = useUserGeo();

  const [statusFilter, setStatusFilter] = useState("ALL"); // LOST | FOUND | ALL
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [contactModalReport, setContactModalReport] = useState(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) return;
    (async () => {
      try {
        setLoading(true);
        const record = await fetchLostAndFound({
          city: DEFAULT_CITY,
          zip: DEFAULT_ZIP,
        });
        setItems(Array.isArray(record) ? record : []);
        setCurrentIndex(0);
      } catch (error) {
        toast.error(String(error?.message || error));
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUser]);

  const filtered = useMemo(() => {
    if (statusFilter === "ALL") return items;
    return items.filter((it) => String(it?.status || "").toUpperCase() === statusFilter);
  }, [items, statusFilter]);

  const sortedByDistance = useMemo(() => {
    if (!userCoords) return filtered;
    const withDistance = filtered.map((it) => {
      const distanceKm =
        it?.location?.lat && it?.location?.long
          ? haversineKm(userCoords, { lat: it.location.lat, long: it.location.long })
          : null;
      return { it, distanceKm };
    });
    withDistance.sort((a, b) => {
      if (a.distanceKm == null && b.distanceKm == null) return 0;
      if (a.distanceKm == null) return 1;
      if (b.distanceKm == null) return -1;
      return a.distanceKm - b.distanceKm;
    });
    return withDistance.map((x) => x.it);
  }, [filtered, userCoords]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [statusFilter]);

  const safeIndex = Math.min(currentIndex, Math.max(0, sortedByDistance.length - 1));

  const handlePrev = () => setCurrentIndex((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setCurrentIndex((prev) => Math.min(sortedByDistance.length - 1, prev + 1));

  return (
    <>
      <StyledLostFound>
        <div className="top">
          <div className="nav">
            <Navbar />
          </div>
          <div className="banner">
            <h1>Lost & Found</h1>
            <p>Report lost pets and help reunite families.</p>
          </div>
          <div className="wave">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>

        <div className="content">
          <div className="toolbar">
            <div className="filters">
              <button
                type="button"
                className={`pill ${statusFilter === "ALL" ? "active" : ""}`}
                onClick={() => setStatusFilter("ALL")}
              >
                All
              </button>
              <button
                type="button"
                className={`pill ${statusFilter === "LOST" ? "active" : ""}`}
                onClick={() => setStatusFilter("LOST")}
              >
                Lost
              </button>
              <button
                type="button"
                className={`pill ${statusFilter === "FOUND" ? "active" : ""}`}
                onClick={() => setStatusFilter("FOUND")}
              >
                Found
              </button>
            </div>
            <button
              type="button"
              className="primary"
              onClick={() => navigate("/lost-found/report")}
            >
              Report a Pet
            </button>
          </div>

          {loading ? (
            <div className="loading">
              <FadeLoader color="#f06a8a" />
            </div>
          ) : sortedByDistance.length === 0 ? (
            <div className="empty">No reports yet.</div>
          ) : (
            <div className="carousel">
              <button
                type="button"
                className="arrow-btn"
                onClick={handlePrev}
                disabled={safeIndex === 0}
                aria-label="Previous report"
              >
                ‹
              </button>

              <div className="carousel-window">
                <div
                  className="carousel-track"
                  style={{ transform: `translateX(-${safeIndex * 100}%)` }}
                >
                  {sortedByDistance.map((it) => {
                const status = String(it?.status || "LOST").toUpperCase();
                const title =
                  status === "FOUND"
                    ? `Found: ${it?.name || "Unknown Pet"}`
                    : `Lost: ${it?.name || "Unknown Pet"}`;
                const city = it?.location?.city || it?.city || "—";
                const timeSince = formatTimeSince(it?.reportedAt || it?.upddt || it?.crdt);
                const distanceKm =
                  userCoords && it?.location?.lat && it?.location?.long
                    ? haversineKm(userCoords, { lat: it.location.lat, long: it.location.long })
                    : null;
                const distanceLabel =
                  typeof distanceKm === "number" ? `${distanceKm.toFixed(1)} km` : "—";

                return (
                  <div key={it?.uid || `${status}-${title}`} className="carousel-slide">
                    <div className="card">
                    <LostFoundPetPhoto record={it} fallbackSrc={defaultPhoto} alt={it?.name || "Pet"} />

                    <div className="overlay">
                      <div className="titleRow">
                        <h3>{title}</h3>
                        <span className="badge">{it?.verified ? "Matched" : "Active"}</span>
                      </div>
                      <div className="meta">
                        <span>{it?.breed || "Unknown breed"}</span>
                        <span>{it?.color || "Unknown color"}</span>
                        <span>{city}</span>
                        <span>{timeSince}</span>
                        <span>{distanceLabel}</span>
                      </div>
                    </div>

                    <div className="actions">
                      <button type="button" onClick={() => navigate(`/lost-found/${it?.uid}`)}>
                        View Details
                      </button>
                      <button
                        type="button"
                        className="secondary"
                        onClick={() => {
                          const { contactDetails, userName } = pickReporterContactFields(it);
                          if (!contactDetails && !userName) {
                            toast.info("Contact details not provided.");
                            return;
                          }
                          setContactModalReport(it);
                        }}
                      >
                        Contact Reporter
                      </button>
                    </div>
                    </div>
                  </div>
                );
                  })}
                </div>
              </div>

              <button
                type="button"
                className="arrow-btn"
                onClick={handleNext}
                disabled={safeIndex >= sortedByDistance.length - 1}
                aria-label="Next report"
              >
                ›
              </button>
            </div>
          )}
        </div>
      </StyledLostFound>
      <LostFoundContactReporterModal
        isOpen={!!contactModalReport}
        onClose={() => setContactModalReport(null)}
        report={contactModalReport}
      />
      <Footer />
    </>
  );
};

export default LostFoundPage;

