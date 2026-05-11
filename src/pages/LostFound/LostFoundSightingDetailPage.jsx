import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { StyledLostFound } from "./styledComponent";
import { fetchLostAndFound } from "../../utils/Functions/LostFound/lostAndFoundApi";
import { fetchSightingsForReport } from "../../utils/Functions/LostFound/sightingsApi";
import {
  formatRelativeShort,
  formatSightingClock,
  formatSightingFullTimestamp,
  getLostFoundStableId,
  getNormalizedLostFoundStatus,
  getSightingsApiReportId,
  normalizeLostFoundRecord,
  normalizeSightingRecords,
  pickSightingWitnessLabel,
  sightingStableId,
} from "../../utils/Functions/LostFound/lostFoundUtils";

export const LostFoundSightingDetailPage = () => {
  const { uid, sightingUid } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const [sighting, setSighting] = useState(null);

  const decodedUid = uid ? decodeURIComponent(uid) : "";
  const decodedSighting = sightingUid ? decodeURIComponent(sightingUid) : "";

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const list = await fetchLostAndFound({});
        const rows = list.map(normalizeLostFoundRecord);
        const found =
          rows.find(
            (x) =>
              getLostFoundStableId(x) === decodedUid ||
              String(x?.uid || "") === decodedUid ||
              getSightingsApiReportId(x) === decodedUid
          ) || null;
        setReport(found);
        if (!found) {
          setSighting(null);
          return;
        }
        const rid = getSightingsApiReportId(found);
        const raw = await fetchSightingsForReport(rid);
        const rowsS = normalizeSightingRecords(raw);
        const s =
          rowsS.find((row, idx) => sightingStableId(row, idx) === decodedSighting) ||
          rowsS.find((row) => String(row.uid || "") === decodedSighting) ||
          null;
        setSighting(s);
      } catch (e) {
        toast.error(String(e?.message || e));
        setReport(null);
        setSighting(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [decodedUid, decodedSighting]);

  const title = useMemo(() => {
    const n = report?.name || "Pet";
    const st = report ? getNormalizedLostFoundStatus(report) : "";
    if (st === "FOUND") return `Sighting · Found: ${n}`;
    return `Sighting · Lost: ${n}`;
  }, [report]);

  const mapsUrl = useMemo(() => {
    if (!sighting) return "";
    const lat = sighting?.location?.lat ?? sighting?.lat;
    const lng = sighting?.location?.long ?? sighting?.location?.lng ?? sighting?.long;
    if (lat == null || lng == null) return "";
    return `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}`;
  }, [sighting]);

  const witness = sighting ? pickSightingWitnessLabel(sighting) : "";

  return (
    <>
      <StyledLostFound>
        <div className="top">
          <div className="nav">
            <Navbar />
          </div>
          <div className="banner">
            <h1>Sighting detail</h1>
            <p>{title}</p>
          </div>
          <div className="wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>
        <div className="content">
          <div className="toolbar">
            <button type="button" className="pill" onClick={() => navigate(-1)}>
              Back
            </button>
            {report ? (
              <button
                type="button"
                className="pill"
                onClick={() => navigate(`/lost-found/${encodeURIComponent(uid || "")}`)}
              >
                Open report
              </button>
            ) : null}
          </div>
          {loading ? (
            <div className="loading">Loading…</div>
          ) : !sighting ? (
            <div className="empty">Sighting not found.</div>
          ) : (
            <div
              style={{
                maxWidth: 560,
                margin: "0 auto",
                padding: 20,
                borderRadius: 20,
                background: "linear-gradient(160deg, rgba(255,255,255,0.95), rgba(240,248,255,0.92))",
                border: "1px solid rgba(226,232,240,0.95)",
                boxShadow: "0 18px 48px rgba(15,23,42,0.1)",
              }}
            >
              <p style={{ margin: "0 0 8px", fontWeight: 900, color: "#0066ba", fontSize: "0.85rem" }}>
                {formatSightingClock(sighting.seenAt)} · {formatRelativeShort(sighting.seenAt)}
              </p>
              <p style={{ margin: "0 0 6px", color: "#64748b", fontSize: "0.88rem", fontWeight: 600 }}>
                {formatSightingFullTimestamp(sighting.seenAt)}
              </p>
              <h2 style={{ margin: "12px 0 8px", fontFamily: "Quicksand, system-ui", fontWeight: 900 }}>
                {String(sighting.location?.address || "").trim() || "Location shared"}
              </h2>
              {witness ? (
                <p style={{ margin: "0 0 12px", fontWeight: 700, color: "#334155" }}>
                  Witness: {witness}
                  {sighting.canHelp === false ? " · prefers not to be contacted" : ""}
                </p>
              ) : null}
              {sighting.notes ? (
                <p style={{ margin: "0 0 16px", lineHeight: 1.5, fontWeight: 600, color: "#475569" }}>
                  {sighting.notes}
                </p>
              ) : null}
              {sighting.photoUrl ? (
                <div style={{ borderRadius: 16, overflow: "hidden", marginBottom: 16 }}>
                  <img src={sighting.photoUrl} alt="" style={{ width: "100%", display: "block" }} />
                </div>
              ) : null}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {mapsUrl ? (
                  <button type="button" className="primary" onClick={() => window.open(mapsUrl, "_blank")}>
                    Open map
                  </button>
                ) : null}
                <button
                  type="button"
                  className="pill"
                  onClick={() => navigate(`/lost-found/${encodeURIComponent(uid || "")}`)}
                >
                  Full report
                </button>
              </div>
            </div>
          )}
        </div>
      </StyledLostFound>
      <Footer />
    </>
  );
};

export default LostFoundSightingDetailPage;
