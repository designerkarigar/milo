import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { useAuth } from "../../contexts/AuthContext";
import { StyledLostFound } from "./styledComponent";
import {
  StyledLostFoundDetailAside,
  StyledLostFoundDetailGrid,
  StyledOwnerContextStrip,
} from "./lostFoundDetailsStyled";
import { fetchLostAndFound } from "../../utils/Functions/LostFound/lostAndFoundApi";
import { fetchSightingsForReport } from "../../utils/Functions/LostFound/sightingsApi";
import {
  formatLostFoundLastSeenLine,
  formatTimeSince,
  getLostFoundStableId,
  getNormalizedLostFoundStatus,
  getSightingsApiReportId,
  hasVisibleReporterContact,
  isLostFoundReportOwner,
  normalizeLostFoundRecord,
  normalizeSightingRecords,
  pickOwnerReportStatusLabel,
} from "../../utils/Functions/LostFound/lostFoundUtils";
import defaultPhoto from "../../images/svgfiles/avatar-1.svg";
import { LostFoundPetPhoto } from "./LostFoundPetPhoto";
import { LostFoundContactReporterModal } from "./LostFoundContactReporterModal";
import { LostFoundSightingsPanel } from "./LostFoundSightingsPanel";

export const LostFoundDetailsPage = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [sightings, setSightings] = useState([]);
  const [sightingsLoading, setSightingsLoading] = useState(false);
  const [sightingsPanelOpen, setSightingsPanelOpen] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const list = await fetchLostAndFound({});
        const rows = list.map(normalizeLostFoundRecord);
        const decoded = uid ? decodeURIComponent(uid) : "";
        const found =
          rows.find(
            (x) =>
              getLostFoundStableId(x) === decoded ||
              String(x?.uid || "") === decoded ||
              getSightingsApiReportId(x) === decoded
          ) || null;
        setItem(found);
      } catch (error) {
        toast.error(String(error?.message || error));
      } finally {
        setLoading(false);
      }
    })();
  }, [uid]);

  const isOwner = useMemo(() => isLostFoundReportOwner(item, currentUser), [item, currentUser]);
  const statusNorm = useMemo(() => (item ? getNormalizedLostFoundStatus(item) : ""), [item]);

  const hasSessionAuth = useMemo(() => {
    if (currentUser) return true;
    try {
      const t = localStorage.getItem("idToken");
      return Boolean(t && t !== "0");
    } catch {
      return false;
    }
  }, [currentUser]);

  const shouldFetchSightings = Boolean(item && statusNorm === "LOST" && hasSessionAuth);
  const reportIdForSightings = useMemo(() => (item ? getSightingsApiReportId(item) : ""), [item]);

  useEffect(() => {
    if (!shouldFetchSightings || !reportIdForSightings) {
      setSightings([]);
      setSightingsLoading(false);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setSightingsLoading(true);
        const raw = await fetchSightingsForReport(reportIdForSightings);
        if (cancelled) return;
        setSightings(normalizeSightingRecords(raw));
      } catch (error) {
        if (!cancelled) {
          setSightings([]);
          const status = error?.response?.status;
          if (status === 404 || status === 405 || status === 401 || status === 403) {
            return;
          }
          const msg = String(error?.response?.data?.message || error?.message || error);
          toast.error(msg || "Could not load sightings.");
        }
      } finally {
        if (!cancelled) setSightingsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [shouldFetchSightings, reportIdForSightings]);

  const sortedSightings = useMemo(() => {
    return [...sightings].sort((a, b) => {
      const ta = new Date(a.seenAt).getTime();
      const tb = new Date(b.seenAt).getTime();
      return ta - tb;
    });
  }, [sightings]);

  const showOwnerContextStrip = Boolean(
    statusNorm === "LOST" && (isOwner || sortedSightings.length > 0)
  );

  const title = useMemo(() => {
    const status =
      (item && getNormalizedLostFoundStatus(item)) ||
      String(item?.status || "").trim().toUpperCase();
    if (status === "FOUND") return `Found: ${item?.name || "Unknown Pet"}`;
    return `Lost: ${item?.name || "Unknown Pet"}`;
  }, [item]);

  const lastSeenLine = useMemo(() => formatLostFoundLastSeenLine(item), [item]);
  const ownerStatusLabel = useMemo(() => pickOwnerReportStatusLabel(item), [item]);

  const handleReporterContactClick = () => {
    if (!item) return;
    const ok = hasVisibleReporterContact(item);
    if (!ok) {
      toast.info("This reporter has not shared contact details (or none are visible).");
      return;
    }
    setContactModalOpen(true);
  };

  const reportRouteId = uid ? encodeURIComponent(uid) : "";
  const showSightingsLaunch = Boolean(statusNorm === "LOST" && hasSessionAuth);

  return (
    <>
      <StyledLostFound>
        <div className="top">
          <div className="nav">
            <Navbar />
          </div>
          <div className="banner">
            <h1>Details</h1>
            <p>{title}</p>
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
            <button type="button" className="pill" onClick={() => navigate("/lost-found")}>
              Back
            </button>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : !item ? (
            <div className="empty">Report not found.</div>
          ) : (
            <>
              {showOwnerContextStrip ? (
                <StyledOwnerContextStrip>
                  <span className="strip-badge">Lost</span>
                  <strong>Last seen:</strong> {lastSeenLine}
                  <span style={{ margin: "0 6px", color: "#cbd5e1" }}>|</span>
                  <strong>Status:</strong> {ownerStatusLabel}
                </StyledOwnerContextStrip>
              ) : null}

              <StyledLostFoundDetailGrid>
                <StyledLostFoundDetailAside>
                  <div className="photo-card card">
                    <LostFoundPetPhoto record={item} fallbackSrc={defaultPhoto} alt={item?.name || "Pet"} />
                    {showSightingsLaunch ? (
                      <div className="sightings-launch-wrap">
                        <button
                          type="button"
                          className="sightings-launch-btn"
                          data-loading={sightingsLoading}
                          onClick={() => setSightingsPanelOpen(true)}
                        >
                          <span aria-hidden>👀</span>
                          <span>
                            {sightingsLoading
                              ? "Loading sightings…"
                              : `${sortedSightings.length} Sighting${sortedSightings.length === 1 ? "" : "s"}`}
                          </span>
                        </button>
                      </div>
                    ) : null}
                  </div>
                </StyledLostFoundDetailAside>
                <div
                  style={{
                    background: "white",
                    border: "1px solid #ececf4",
                    borderRadius: 16,
                    padding: 16,
                  }}
                >
                  <h2 style={{ marginTop: 0 }}>{title}</h2>
                  <p style={{ marginTop: 6, color: "#5b6770", fontWeight: 700 }}>
                    Reported {formatTimeSince(item?.reportedAt || item?.upddt || item?.crdt)}
                  </p>
                  <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
                    <div>
                      <strong>Breed:</strong> {item?.breed || "Unknown"}
                    </div>
                    <div>
                      <strong>Color:</strong> {item?.color || "Unknown"}
                    </div>
                    <div>
                      <strong>Gender:</strong> {item?.gender || "Unknown"}
                    </div>
                    <div>
                      <strong>City:</strong> {item?.location?.city || "—"}
                    </div>
                    <div>
                      <strong>ZIP:</strong> {item?.location?.zip || "—"}
                    </div>
                    <div>
                      <strong>Description:</strong> {item?.description || "—"}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 16 }}>
                    {!isOwner ? (
                      <button type="button" className="primary" onClick={handleReporterContactClick}>
                        Contact Reporter
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="pill"
                      onClick={() => navigate(`/lost-found/${reportRouteId}/sighting`)}
                    >
                      I Have Seen This Pet
                    </button>
                    <button
                      type="button"
                      className="pill"
                      onClick={() => toast.info("We’ll add “Reunited” workflow next.")}
                    >
                      Mark as Reunited
                    </button>
                  </div>
                </div>
              </StyledLostFoundDetailGrid>
            </>
          )}
        </div>
      </StyledLostFound>

      {item && showSightingsLaunch ? (
        <LostFoundSightingsPanel
          open={sightingsPanelOpen}
          onClose={() => setSightingsPanelOpen(false)}
          reportUidEncoded={reportRouteId}
          sightings={sortedSightings}
          loading={sightingsLoading}
          petName={item?.name || ""}
        />
      ) : null}

      <LostFoundContactReporterModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
        report={item}
      />
      <Footer />
    </>
  );
};

export default LostFoundDetailsPage;
