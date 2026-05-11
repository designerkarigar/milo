import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { StyledLostFound } from "./styledComponent";
import { StyledLostFoundSighting } from "./lostFoundSightingStyled";
import { createSighting } from "../../utils/Functions/LostFound/sightingsApi";
import { uploadPetImageToFirebase } from "../../utils/Functions/Pets/uploadPetImageToFirebase";

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
  const { currentUser } = useAuth();
  const userCoords = useUserGeo();
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [seenAt, setSeenAt] = useState("");
  const [notes, setNotes] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [confidence, setConfidence] = useState("high");
  const [canHelp, setCanHelp] = useState(true);
  const [sharePhoneAllowed, setSharePhoneAllowed] = useState(false);
  const [shareEmailAllowed, setShareEmailAllowed] = useState(false);
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

  useEffect(() => {
    return () => {
      if (photoPreview && photoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handleSightingPhotoSelected = (file) => {
    if (!file) return;
    setPhotoPreview((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setPhotoFile(file);
  };

  const clearSightingPhoto = () => {
    setPhotoPreview((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return "";
    });
    setPhotoFile(null);
    if (cameraRef.current) cameraRef.current.value = "";
    if (galleryRef.current) galleryRef.current.value = "";
  };

  const seenAtIso = useMemo(() => {
    if (!seenAt) return new Date().toISOString();
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
      let photoUrl = "";
      if (photoFile) {
        photoUrl = await uploadPetImageToFirebase({ file: photoFile, currentUser });
      }

      const phone = String(currentUser?.phoneNumber || "").trim();
      const email = String(currentUser?.email || "").trim();
      const contactParts = [];
      if (canHelp && sharePhoneAllowed && phone) contactParts.push(phone);
      if (canHelp && shareEmailAllowed && email) contactParts.push(email);

      await createSighting(reportId, {
        location: {
          lat: latNum,
          long: longNum,
          address: address.trim(),
        },
        seenAt: seenAtIso,
        notes: notes.trim(),
        photoUrl,
        confidence,
        canHelp: !!canHelp,
        phoneContactAllowed: !!(canHelp && sharePhoneAllowed && phone),
        emailContactAllowed: !!(canHelp && shareEmailAllowed && email),
        ...(contactParts.length ? { contactDetails: contactParts.join("\n") } : {}),
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
            <h1>Sighting squad 📍</h1>
            <p>Loud colors, loud clues — help a pet find their way home.</p>
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
          <StyledLostFoundSighting>
            <div className="sight-toolbar">
              <button
                type="button"
                className="sight-back"
                onClick={() => navigate(`/lost-found/${encodeURIComponent(reportId || "")}`)}
              >
                ← Back to report
              </button>
            </div>

            <div className="sight-shell">
              <span className="sight-blob sight-blob-a" aria-hidden />
              <span className="sight-blob sight-blob-b" aria-hidden />
              <span className="sight-blob sight-blob-c" aria-hidden />

              <div className="sight-card">
                <div className="sight-rail" aria-hidden>
                  👁️ 📍 ✨ 🐾
                </div>
                <div className="sight-kicker">I saw this pet</div>
                <h2 className="sight-title">Paint the scene in neon detail</h2>
                <p className="sight-lead">
                  When, where, and how sure are you? GPS helps tons — we&apos;ll grab yours when allowed,
                  but tweak anything that feels off.
                </p>

                <div className="sight-grid">
                  <div className="sight-field">
                    <span className="sight-label">
                      <span className="sight-label-badge">🕐</span> Seen at
                    </span>
                    <input
                      className="sight-input"
                      type="datetime-local"
                      value={seenAt}
                      onChange={(e) => setSeenAt(e.target.value)}
                    />
                  </div>
                  <div className="sight-field">
                    <span className="sight-label">
                      <span className="sight-label-badge">🎯</span> Confidence
                    </span>
                    <select
                      className="sight-select"
                      value={confidence}
                      onChange={(e) => setConfidence(e.target.value)}
                    >
                      <option value="high">🔥 High — I&apos;m pretty sure</option>
                      <option value="medium">🤔 Medium — could be them</option>
                      <option value="low">👀 Low — worth a peek</option>
                    </select>
                  </div>
                  <div className="sight-field">
                    <span className="sight-label">
                      <span className="sight-label-badge">📐</span> Latitude
                    </span>
                    <input className="sight-input" value={lat} onChange={(e) => setLat(e.target.value)} />
                  </div>
                  <div className="sight-field">
                    <span className="sight-label">
                      <span className="sight-label-badge">📐</span> Longitude
                    </span>
                    <input className="sight-input" value={long} onChange={(e) => setLong(e.target.value)} />
                  </div>
                  <div className="sight-field span-2">
                    <span className="sight-label">
                      <span className="sight-label-badge">🏠</span> Address / landmark
                    </span>
                    <input
                      className="sight-input"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="e.g., Garden A1, near Sector 62 metro"
                    />
                  </div>
                  <div className="sight-field span-2">
                    <span className="sight-label">
                      <span className="sight-label-badge">📝</span> Notes
                    </span>
                    <textarea
                      className="sight-textarea"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Running near gate, cream collar, super friendly…"
                    />
                  </div>
                  <div className="sight-field span-2">
                    <span className="sight-label">
                      <span className="sight-label-badge">🖼️</span> Photo
                      <span className="sight-label-sub">(optional)</span>
                    </span>
                    <input
                      ref={cameraRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleSightingPhotoSelected(e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                    <input
                      ref={galleryRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        handleSightingPhotoSelected(e.target.files?.[0]);
                        e.target.value = "";
                      }}
                    />
                    <div className="sight-photo-actions">
                      <p className="sight-photo-hint">
                        Snap a quick pic or upload from your gallery — we&apos;ll attach it when you submit.
                      </p>
                      <div className="sight-capture-row">
                        <button
                          type="button"
                          className="sight-icon-btn"
                          disabled={saving}
                          onClick={() => cameraRef.current?.click()}
                          aria-label="Take photo"
                        >
                          <CameraAltIcon />
                        </button>
                        <button
                          type="button"
                          className="sight-icon-btn"
                          disabled={saving}
                          onClick={() => galleryRef.current?.click()}
                          aria-label="Choose from gallery"
                        >
                          <PhotoLibraryIcon />
                        </button>
                      </div>
                      {photoPreview ? (
                        <>
                          <button type="button" className="sight-photo-clear" onClick={clearSightingPhoto}>
                            Remove photo
                          </button>
                          <div className="sight-preview-wrap">
                            <img src={photoPreview} alt="Sighting preview" />
                          </div>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>

                <label className="sight-checkbox-card">
                  <input
                    type="checkbox"
                    checked={canHelp}
                    onChange={(e) => {
                      const v = e.target.checked;
                      setCanHelp(v);
                      if (!v) {
                        setSharePhoneAllowed(false);
                        setShareEmailAllowed(false);
                      }
                    }}
                  />
                  <div className="sight-checkbox-copy">
                    <strong>I can help if needed</strong>
                    <span>The pet parent might reach out — opt in to be their sidewalk hero.</span>
                  </div>
                </label>

                {canHelp ? (
                  <div className="sight-field span-2" style={{ marginTop: 4 }}>
                    <span className="sight-label">
                      <span className="sight-label-badge">🔐</span> Share with pet parent
                      <span className="sight-label-sub">(optional)</span>
                    </span>
                    <div style={{ display: "grid", gap: 10, marginTop: 6 }}>
                      <label className="sight-checkbox-card" style={{ margin: 0, padding: "10px 12px" }}>
                        <input
                          type="checkbox"
                          checked={sharePhoneAllowed}
                          disabled={!currentUser?.phoneNumber}
                          onChange={(e) => setSharePhoneAllowed(e.target.checked)}
                        />
                        <div className="sight-checkbox-copy">
                          <strong>Allow my phone number</strong>
                          <span>
                            {currentUser?.phoneNumber
                              ? "Pet parents can call or text you from the sightings panel."
                              : "Add a phone number to your MILO profile to enable this."}
                          </span>
                        </div>
                      </label>
                      <label className="sight-checkbox-card" style={{ margin: 0, padding: "10px 12px" }}>
                        <input
                          type="checkbox"
                          checked={shareEmailAllowed}
                          disabled={!currentUser?.email}
                          onChange={(e) => setShareEmailAllowed(e.target.checked)}
                        />
                        <div className="sight-checkbox-copy">
                          <strong>Allow my email</strong>
                          <span>
                            {currentUser?.email
                              ? "Shown only when you opt in — pet parents can reach you by email."
                              : "Sign in with an email on your account to enable this."}
                          </span>
                        </div>
                      </label>
                    </div>
                  </div>
                ) : null}

                <div className="sight-actions">
                  <button type="button" className="sight-submit" onClick={handleSubmit} disabled={saving}>
                    {saving ? "Sending your sighting…" : "Launch sighting 🚀"}
                  </button>
                </div>

                <p className="sight-mini-note">
                  Every clue stacks up — even rough timings and fuzzy corners help MILO piece the puzzle.
                </p>
              </div>
            </div>
          </StyledLostFoundSighting>
        </div>
      </StyledLostFound>
      <Footer />
    </>
  );
};

export default LostFoundSightingPage;
