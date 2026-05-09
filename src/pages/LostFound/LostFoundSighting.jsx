import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { toast } from "react-toastify";
import { StyledLostFound } from "./styledComponent";
import { createSighting } from "../../utils/Functions/LostFound/sightingsApi";

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

export const LostFoundSightingPage = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const userCoords = useUserGeo();

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [seenAt, setSeenAt] = useState("");
  const [notes, setNotes] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [confidence, setConfidence] = useState("high");
  const [canHelp, setCanHelp] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!seenAt) {
      setSeenAt(new Date().toISOString().slice(0, 16));
    }
  }, [seenAt]);

  useEffect(() => {
    if (!userCoords) return;
    if (!lat) setLat(String(userCoords.lat));
    if (!long) setLong(String(userCoords.long));
  }, [userCoords, lat, long]);

  const seenAtIso = useMemo(() => {
    if (!seenAt) return new Date().toISOString();
    // `datetime-local` gives "YYYY-MM-DDTHH:mm"
    return new Date(seenAt).toISOString();
  }, [seenAt]);

  const handleSubmit = async () => {
    if (!reportId) {
      toast.error("Missing report id.");
      return;
    }

    const latNum = Number(lat);
    const longNum = Number(long);
    if (Number.isNaN(latNum) || Number.isNaN(longNum)) {
      toast.warning("Please provide valid lat/long.");
      return;
    }
    if (!address.trim()) {
      toast.warning("Please provide address/landmark.");
      return;
    }

    try {
      setSaving(true);
      await createSighting(reportId, {
        location: {
          lat: latNum,
          long: longNum,
          address: address.trim(),
        },
        seenAt: seenAtIso,
        notes: notes.trim(),
        photoUrl: photoUrl.trim(),
        confidence,
        canHelp: !!canHelp,
      });
      toast.success("Sighting submitted.");
      navigate(`/lost-found/${encodeURIComponent(reportId)}`);
    } catch (error) {
      toast.error(String(error?.response?.data?.message || error?.message || error));
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <StyledLostFound>
        <div className="top">
          <div className="nav">
            <Navbar />
          </div>
          <div className="banner">
            <h1>I have seen this pet</h1>
            <p>Share where and when you saw them.</p>
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
            <button
              type="button"
              className="pill"
              onClick={() => navigate(`/lost-found/${encodeURIComponent(reportId || "")}`)}
            >
              Back
            </button>
          </div>

          <div
            style={{
              background: "white",
              border: "1px solid #ececf4",
              borderRadius: 16,
              padding: 16,
              maxWidth: 760,
              margin: "0 auto",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Seen at</div>
                <input
                  type="datetime-local"
                  value={seenAt}
                  onChange={(e) => setSeenAt(e.target.value)}
                  style={{ width: "100%", padding: 10, borderRadius: 10 }}
                />
              </label>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Confidence</div>
                <select
                  value={confidence}
                  onChange={(e) => setConfidence(e.target.value)}
                  style={{ width: "100%", padding: 10, borderRadius: 10 }}
                >
                  <option value="high">high</option>
                  <option value="medium">medium</option>
                  <option value="low">low</option>
                </select>
              </label>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Latitude</div>
                <input
                  value={lat}
                  onChange={(e) => setLat(e.target.value)}
                  style={{ width: "100%", padding: 10, borderRadius: 10 }}
                />
              </label>
              <label>
                <div style={{ fontWeight: 800, marginBottom: 6 }}>Longitude</div>
                <input
                  value={long}
                  onChange={(e) => setLong(e.target.value)}
                  style={{ width: "100%", padding: 10, borderRadius: 10 }}
                />
              </label>
            </div>

            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Address / Landmark</div>
              <input
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g., Garden A1, Noida"
                style={{ width: "100%", padding: 10, borderRadius: 10 }}
              />
            </label>

            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Notes</div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Running near gate"
                style={{ width: "100%", padding: 10, borderRadius: 10, minHeight: 110 }}
              />
            </label>

            <label style={{ display: "block", marginTop: 12 }}>
              <div style={{ fontWeight: 800, marginBottom: 6 }}>Photo URL (optional)</div>
              <input
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://example.com/photo.jpg"
                style={{ width: "100%", padding: 10, borderRadius: 10 }}
              />
            </label>

            <label style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 14 }}>
              <input
                type="checkbox"
                checked={canHelp}
                onChange={(e) => setCanHelp(e.target.checked)}
              />
              <span style={{ fontWeight: 800, color: "#40536b" }}>I can help if needed</span>
            </label>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 14 }}>
              <button type="button" className="primary" onClick={handleSubmit} disabled={saving}>
                {saving ? "Submitting..." : "Submit Sighting"}
              </button>
            </div>
          </div>
        </div>
      </StyledLostFound>
      <Footer />
    </>
  );
};

export default LostFoundSightingPage;

