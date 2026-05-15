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
  getLostFoundStableId,
  getNormalizedLostFoundStatus,
  haversineKm,
  normalizeLostFoundRecords,
  pickReunionStory,
} from "../../utils/Functions/LostFound/lostFoundUtils";
import defaultPhoto from "../../images/svgfiles/avatar-1.svg";
import { LostFoundSwipeDeck } from "./LostFoundSwipeDeck";
import { LostFoundContactReporterModal } from "./LostFoundContactReporterModal";
import { LostFoundPetPhoto } from "./LostFoundPetPhoto";

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

  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
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
        const record = await fetchLostAndFound({});
        setItems(normalizeLostFoundRecords(record));
      } catch (error) {
        toast.error(String(error?.message || error));
        setItems([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [currentUser]);

  const { lostSorted, foundSorted, reunitedSorted } = useMemo(() => {
    const norm = (it) =>
      getNormalizedLostFoundStatus(it) || String(it?.status || "").trim().toUpperCase();

    const sortByDistance = (list) => {
      if (!userCoords) return list;
      const withDistance = list.map((it) => {
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
    };

    const lostActive = items.filter((it) => norm(it) === "LOST");
    const found = items.filter((it) => norm(it) === "FOUND");
    const reunited = items.filter((it) => norm(it) === "REUNITED");

    return {
      lostSorted: sortByDistance(lostActive),
      foundSorted: sortByDistance(found),
      reunitedSorted: sortByDistance(reunited),
    };
  }, [items, userCoords]);

  const hasAnyReports = lostSorted.length > 0 || foundSorted.length > 0 || reunitedSorted.length > 0;

  return (
    <>
      <StyledLostFound>
        <div className="top">
          <div className="nav">
            <Navbar />
          </div>
          <div className="banner">
            <h1>Lost & Found</h1>
            <p>Swipe cards — lost on the left, found on the right.</p>
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
          <div className="toolbar toolbar-dual">
            <p className="toolbar-tagline">
              Red stack = pets people are looking for · Green stack = pets someone found
            </p>
            <div className="toolbar-actions">
              <button type="button" className="pill" onClick={() => navigate("/lost-found/match-requests")}>
                Requests for my found pets
              </button>
              <button type="button" className="pill" onClick={() => navigate("/lost-found/report?mode=lost")}>
                Report lost pet
              </button>
              <button type="button" className="primary" onClick={() => navigate("/lost-found/report?mode=found")}>
                Report found pet
              </button>
            </div>
          </div>

          {loading ? (
            <div className="loading">
              <FadeLoader color="#f06a8a" />
            </div>
          ) : !hasAnyReports ? (
            <div className="empty">No reports yet.</div>
          ) : (
            <>
              <div className="dual-deck">
                <LostFoundSwipeDeck
                  variant="lost"
                  items={lostSorted}
                  userCoords={userCoords}
                  defaultPhoto={defaultPhoto}
                  onViewDetails={(rowId) => navigate(`/lost-found/${encodeURIComponent(rowId)}`)}
                  onReportSighting={(rowId) => navigate(`/lost-found/${encodeURIComponent(rowId)}/sighting`)}
                  onNotifyNoId={() => toast.info("This report has no id yet.")}
                  onContactReporter={(report) => setContactModalReport(report)}
                  onNotifyNoContact={() =>
                    toast.info("This reporter has not shared contact details (or none are visible).")
                  }
                />
                <LostFoundSwipeDeck
                  variant="found"
                  items={foundSorted}
                  userCoords={userCoords}
                  defaultPhoto={defaultPhoto}
                  onViewDetails={(rowId) => navigate(`/lost-found/${encodeURIComponent(rowId)}`)}
                  onNotifyNoId={() => toast.info("This report has no id yet.")}
                  onContactReporter={(report) => setContactModalReport(report)}
                  onNotifyNoContact={() =>
                    toast.info("This reporter has not shared contact details (or none are visible).")
                  }
                />
              </div>
              {reunitedSorted.length > 0 ? (
                <section className="reunited-zone" aria-labelledby="reunited-pets-heading">
                  <div className="reunited-zone-head">
                    <h2 id="reunited-pets-heading" className="reunited-zone-title">
                      Reunited pets
                    </h2>
                    <p className="reunited-zone-sub">
                      Happy endings from the MILO community — these pets are safely back with their families.
                    </p>
                  </div>
                  <div className="reunited-cards">
                    {reunitedSorted.map((row) => {
                      const id = getLostFoundStableId(row);
                      const story = pickReunionStory(row);
                      const snippet =
                        story.message || "Marked as reunited — thank you to everyone who helped along the way.";
                      return (
                        <article key={id || row.uid || JSON.stringify(row)} className="reunited-card">
                          <div className="reunited-card-photo">
                            <LostFoundPetPhoto record={row} fallbackSrc={defaultPhoto} alt={row?.name || "Pet"} />
                          </div>
                          <div className="reunited-card-body">
                            <span className="reunited-card-badge">Reunited</span>
                            <h3 className="reunited-card-name">{row?.name || "Pet"}</h3>
                            <p className="reunited-card-snippet">{snippet}</p>
                            <button
                              type="button"
                              className="pill"
                              onClick={() => navigate(`/lost-found/${encodeURIComponent(id)}`)}
                            >
                              View story
                            </button>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ) : null}
            </>
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
