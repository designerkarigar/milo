import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { StyledLostFound } from "./styledComponent";
import { StyledLostFoundWizard } from "./lostFoundWizardStyled";
import { createLostAndFound } from "../../utils/Functions/LostFound/lostAndFoundApi";
import { fileToBase64Data } from "../../utils/Functions/LostFound/lostFoundUtils";
import { uploadPetImageToFirebase } from "../../utils/Functions/Pets/uploadPetImageToFirebase";
import { detectPetFromImage } from "../../utils/Functions/Pets/detectPetFromImage";
import {
  mapAiDetectionToLostFoundForm,
  pickAiConfidenceSummary,
} from "../../utils/Functions/LostFound/mapPetDetectionToLostFound";
import { reverseGeocodeFromCoords } from "../../utils/Functions/LostFound/reverseGeocode";

/** Quick success/info toasts in this flow — shorter than app default so they do not stack as long. */
const WIZARD_TOAST_QUICK_MS = 2000;

const MAIN_STEPS = 4;

function emptyErrors() {
  return {};
}

export function LostFoundWizardPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);

  const userName = useMemo(() => {
    return (
      localStorage.getItem("username") ||
      currentUser?.displayName ||
      currentUser?.email ||
      ""
    );
  }, [currentUser]);

  const [step, setStep] = useState(1);
  const [reportKind, setReportKind] = useState(null);

  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  /** Firebase URL after “Looks good — next!”; cleared when a new file is chosen. */
  const [_uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [photoUploading, setPhotoUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const [aiError, setAiError] = useState("");
  const [aiPending, setAiPending] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [aiFields, setAiFields] = useState(() => new Set());

  const [petType, setPetType] = useState("DOG");
  const [breed, setBreed] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("unknown");
  const [color, setColor] = useState("");
  const [description, setDescription] = useState("");
  const [detailErrors, setDetailErrors] = useState(emptyErrors);

  const [location, setLocation] = useState({
    city: "",
    zip: "",
    country: "India",
    state: "",
    address: "",
    lat: 0,
    long: 0,
  });
  const [contactDetails, setContactDetails] = useState("");
  const [submitErrors, setSubmitErrors] = useState(emptyErrors);
  const [geoDenied, setGeoDenied] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (!currentUser) navigate("/home");
  }, [currentUser, navigate]);

  useEffect(() => {
    const mode = String(searchParams.get("mode") || "").toLowerCase();
    if (mode === "lost") setReportKind("LOST");
    else if (mode === "found") setReportKind("FOUND");
  }, [searchParams]);

  const resetAiFormFields = () => {
    setAiResult(null);
    setAiFields(new Set());
    setPetType("DOG");
    setBreed("");
    setColor("");
    setDescription("");
    setAiError("");
    setAiPending(false);
  };

  const applyAiForm = (mapped) => {
    setPetType(mapped.petType || "DOG");
    setBreed(mapped.breed || "");
    setColor(mapped.color || "");
    setDescription(mapped.description || "");
    setAiFields(new Set(mapped.aiFields));
    setAiResult(mapped.raw);
  };

  const handleLostFoundPhotoSelected = (file) => {
    if (!file) return;
    setUploadError("");
    setAiError("");
    setUploadedImageUrl("");
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    resetAiFormFields();
  };

  const startBackgroundAiIfFound = (imageUrl) => {
    if (reportKind !== "FOUND" || !imageUrl) return;
    setAiPending(true);
    setAiError("");
    detectPetFromImage(imageUrl)
      .then((record) => {
        const mapped = mapAiDetectionToLostFoundForm(record);
        applyAiForm(mapped);
        toast.success("MILO found clues — peek at pet details!", { autoClose: WIZARD_TOAST_QUICK_MS });
      })
      .catch((err) => {
        const msg = String(err?.response?.data?.message || err?.message || err);
        setAiError(msg || "Identification didn’t land — no worries, type what you see.");
      })
      .finally(() => setAiPending(false));
  };

  const handlePhotoContinue = async () => {
    if (!photoFile) {
      toast.warning("Snap or upload a photo first.");
      return;
    }
    if (!reportKind) {
      toast.warning("Pick Lost or Found above.");
      return;
    }
    setPhotoUploading(true);
    setUploadError("");
    try {
      const url = await uploadPetImageToFirebase({ file: photoFile, currentUser });
      startBackgroundAiIfFound(url);
      setStep(2);
      if (reportKind !== "FOUND") {
        toast.success("Photo uploaded — keep rolling!", { autoClose: WIZARD_TOAST_QUICK_MS });
      }
    } catch (err) {
      const msg = String(err?.message || err);
      setUploadError(msg || "Upload failed — try again?");
      toast.error("Couldn’t upload photo.");
    } finally {
      setPhotoUploading(false);
    }
  };

  const validatePetDetailsStep = () => {
    const e = {};
    if (!String(petType || "").trim()) e.petType = "Pet type is required.";
    if (!String(description || "").trim()) e.description = "Description is required.";
    setDetailErrors(e);
    if (Object.keys(e).length) {
      toast.warning("Pet type and description are needed.");
      return false;
    }
    return true;
  };

  const validateSubmit = () => {
    const e = {};
    if (!photoFile) e.photo = "Photo missing.";
    if (!String(petType || "").trim()) e.petType = "Pet type required.";
    if (!String(description || "").trim()) e.description = "Description required.";
    if (!String(contactDetails || "").trim()) e.contactDetails = "How can someone reach you?";
    setSubmitErrors(e);
    if (Object.keys(e).length) {
      toast.warning("Almost there — check contact (and pet basics).");
      return false;
    }
    return true;
  };

  const handleUseCurrentLocation = () => {
    setGeoDenied(false);
    if (!navigator.geolocation) {
      toast.error("GPS isn’t available here.");
      return;
    }
    setGeoLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        try {
          const geo = await reverseGeocodeFromCoords(lat, lng);
          setLocation((prev) => ({
            ...prev,
            lat,
            long: lng,
            address: geo.address || prev.address,
            city: geo.city || prev.city,
            state: geo.state || prev.state,
            zip: geo.zip || prev.zip,
            country: geo.country || prev.country || "India",
          }));
          if (!geo.zip) toast.info("Add PIN/ZIP if it’s blank.", { autoClose: WIZARD_TOAST_QUICK_MS });
          toast.success("Location dropped in!", { autoClose: WIZARD_TOAST_QUICK_MS });
        } catch {
          setLocation((prev) => ({ ...prev, lat, long: lng }));
          toast.warning("Got coordinates — street fields are yours to finish.");
        } finally {
          setGeoLoading(false);
        }
      },
      () => {
        setGeoDenied(true);
        setGeoLoading(false);
        toast.error("Location blocked — skip or type manually.");
      },
      { enableHighAccuracy: false, maximumAge: 60_000, timeout: 12_000 }
    );
  };

  const handleSubmit = async () => {
    if (!userName) {
      toast.error("Sign in to submit.");
      navigate("/home");
      return;
    }
    if (!validateSubmit()) return;
    setSubmitError("");
    try {
      setSubmitting(true);
      const base64Data = await fileToBase64Data(photoFile);
      if (!base64Data) {
        toast.error("Couldn’t read the photo file.");
        return;
      }

      const payload = {
        userName: userName || undefined,
        status: reportKind,
        petType: String(petType || "DOG").toUpperCase(),
        breed: breed || "",
        name: name || "Unknown",
        gender,
        color: color || "",
        description: description || "",
        photos: [
          {
            base64Data,
            type: "IMAGE",
            contentType: photoFile.type || "image/jpeg",
            name: photoFile.name || "pet-photo.jpg",
          },
        ],
        location: {
          city: (location.city || "").trim(),
          zip: (location.zip || "").trim(),
          country: (location.country || "").trim() || "India",
          state: (location.state || "").trim(),
          address: (location.address || "").trim(),
          lat: Number(location.lat) || 0,
          long: Number(location.long) || 0,
        },
        contactDetails: contactDetails.trim(),
      };

      const cd = contactDetails.trim();
      if (cd) {
        const digits = cd.replace(/\D/g, "");
        if (digits.length >= 7) {
          payload.phoneContactAllowed = true;
        }
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cd)) {
          payload.emailContactAllowed = true;
        }
      }

      await createLostAndFound(payload);
      setStep(5);
      toast.success("Report submitted!");
    } catch (err) {
      const msg = String(err?.response?.data?.message || err?.message || err);
      setSubmitError(msg || "Submit flopped — try once more?");
      toast.error(msg || "Submit failed.");
    } finally {
      setSubmitting(false);
    }
  };

  const mappedAiPreview = useMemo(
    () => (aiResult ? mapAiDetectionToLostFoundForm(aiResult) : null),
    [aiResult]
  );
  const confidenceLabel = pickAiConfidenceSummary(aiResult);
  const traitsHint = mappedAiPreview?.traitsDisplay || "";

  const showAiBanner =
    reportKind === "FOUND" &&
    aiPending &&
    (step === 2 || step === 3);

  const progressDots =
    step < 5 ? (
      <div className="progress" aria-hidden>
        {Array.from({ length: MAIN_STEPS }, (_, i) => (
          <div
            key={String(i)}
            className={`progress-dot ${i + 1 < step ? "done" : ""} ${i + 1 === step ? "current" : ""}`}
          />
        ))}
      </div>
    ) : null;

  const renderFieldBadge = (key) => (aiFields.has(key) ? <span className="ai-chip">AI</span> : null);

  let body = null;

  if (step === 1) {
    body = (
      <>
        <div className="paw-rail" aria-hidden>
          🐾 📸 🐕 ✨
        </div>
        <div className="step-meta">Step 1 · Picture purr-fect</div>
        <h2 className="wizard-title">Upload or capture that furry face</h2>
        <p className="wizard-lead wizard-lead-step1">
          One clear photo helps neighbors recognize who you&apos;re reporting—lost friend or found buddy, this step makes all the difference.
        </p>

        <div className="kind-switch" role="group" aria-label="Report type">
          <button
            type="button"
            className={`kind-pill ${reportKind === "LOST" ? "active-lost" : ""}`}
            onClick={() => setReportKind("LOST")}
          >
            😿 I lost a pet
          </button>
          <button
            type="button"
            className={`kind-pill ${reportKind === "FOUND" ? "active-found" : ""}`}
            onClick={() => setReportKind("FOUND")}
          >
            🎉 I found a pet
          </button>
        </div>

        {uploadError ? <div className="error-banner">{uploadError}</div> : null}

        <input
          ref={cameraRef}
          type="file"
          accept="image/*"
          capture="environment"
          style={{ display: "none" }}
          onChange={(e) => handleLostFoundPhotoSelected(e.target.files?.[0])}
        />
        <input
          ref={galleryRef}
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => handleLostFoundPhotoSelected(e.target.files?.[0])}
        />

        <div className="capture-row">
          <button
            type="button"
            className="icon-btn"
            onClick={() => cameraRef.current?.click()}
            aria-label="Take photo"
          >
            <CameraAltIcon />
          </button>
          <button
            type="button"
            className="icon-btn"
            onClick={() => galleryRef.current?.click()}
            aria-label="Choose from gallery"
          >
            <PhotoLibraryIcon />
          </button>
        </div>

        {photoPreview ? (
          <div className="preview-wrap">
            <img src={photoPreview} alt="Pet preview" />
          </div>
        ) : null}

        <div className="nav-row">
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/lost-found")}>
            Exit
          </button>
          <button type="button" className="btn btn-primary" disabled={photoUploading} onClick={handlePhotoContinue}>
            {photoUploading ? "Uploading…" : "Looks good — next!"}
          </button>
        </div>
      </>
    );
  } else if (step === 2) {
    body = (
      <>
        <div className="paw-rail" aria-hidden>
          📍 🗺️ 💫
        </div>
        <div className="step-meta">
          Step 2 · Whereabouts <span className="optional-tag">Optional</span>
        </div>
        <h2 className="wizard-title">Pin the scene (only if you want)</h2>
        <p className="wizard-lead">
          Adding a rough area helps nearby MILO humans respond quicker — but zero pressure. Skip anytime.
        </p>

        {showAiBanner ? (
          <div className="funky-banner pulse" role="status">
            Photo uploaded. MILO is identifying the pet while you continue.
          </div>
        ) : null}

        {geoDenied ? <div className="warn-banner">GPS blocked — type an area or tap Skip.</div> : null}

        <div style={{ marginBottom: 14 }}>
          <button type="button" className="btn btn-outline" onClick={handleUseCurrentLocation} disabled={geoLoading}>
            {geoLoading ? "Fetching…" : "📡 Drop a pin (GPS)"}
          </button>
          {(location.lat !== 0 || location.long !== 0) && !geoLoading ? (
            <p style={{ marginTop: 10, color: "#334155", fontSize: "0.92rem", fontWeight: 700 }}>
              Lat/long locked · tweak text fields freely
            </p>
          ) : null}
        </div>

        <div className="field-grid">
          <label className="field span-2">
            <span className="field-label">Street / landmark</span>
            <input
              value={location.address}
              onChange={(e) => setLocation((p) => ({ ...p, address: e.target.value }))}
              placeholder="Optional — e.g. near Sector 62 park"
            />
          </label>
          <label className="field">
            <span className="field-label">City</span>
            <input value={location.city} onChange={(e) => setLocation((p) => ({ ...p, city: e.target.value }))} />
          </label>
          <label className="field">
            <span className="field-label">State</span>
            <input value={location.state} onChange={(e) => setLocation((p) => ({ ...p, state: e.target.value }))} />
          </label>
          <label className="field">
            <span className="field-label">ZIP</span>
            <input value={location.zip} onChange={(e) => setLocation((p) => ({ ...p, zip: e.target.value }))} />
          </label>
          <label className="field">
            <span className="field-label">Country</span>
            <input
              value={location.country}
              onChange={(e) => setLocation((p) => ({ ...p, country: e.target.value }))}
            />
          </label>
        </div>

        <div className="nav-row">
          <button type="button" className="btn btn-ghost" onClick={() => setStep(1)}>
            Back
          </button>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginLeft: "auto" }}>
            <button type="button" className="btn btn-skip" onClick={() => setStep(3)}>
              Skip for now
            </button>
            <button type="button" className="btn btn-primary" onClick={() => setStep(3)}>
              Continue
            </button>
          </div>
        </div>
      </>
    );
  } else if (step === 3) {
    body = (
      <>
        <div className="paw-rail" aria-hidden>
          ✏️ 🐶 📝
        </div>
        <div className="step-meta">Step 3 · Tell their story</div>
        <h2 className="wizard-title">Pet details — your rules</h2>
        <p className="wizard-lead">
          Spill the beans on breed, colors, vibes. MILO may drop hints in the background while you type.
        </p>

        {showAiBanner ? (
          <div className="funky-banner pulse" role="status">
            Photo uploaded. MILO is identifying the pet while you continue.
          </div>
        ) : null}

        {reportKind === "FOUND" && aiPending ? (
          <div className="ai-live-strip">
            <span className="pulse-dot">●</span> MILO’s brain is still chewing on your photo…
          </div>
        ) : null}

        {reportKind === "FOUND" && aiError ? <div className="warn-banner">{aiError}</div> : null}

        {reportKind === "FOUND" && aiResult ? (
          (() => {
            const diet = aiResult?.recommended_food || aiResult?.recommendedFood;
            const age = aiResult?.age_category || aiResult?.ageCategory;
            const rows = [];
            if (traitsHint) rows.push({ k: "Traits", v: traitsHint });
            if (diet) rows.push({ k: "Snack intel", v: String(diet) });
            if (age) rows.push({ k: "Age vibe", v: String(age) });
            if (!confidenceLabel && rows.length === 0) return null;
            return (
              <div className="ai-insight">
                <strong>MILO peeked at your pic</strong>
                {confidenceLabel ? (
                  <span>
                    {" "}
                    · spicy confidence: <strong>{confidenceLabel}</strong>
                  </span>
                ) : null}
                {rows.length ? (
                  <ul>
                    {rows.map((r) => (
                      <li key={r.k}>
                        <strong>{r.k}:</strong> {r.v}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            );
          })()
        ) : null}

        <div className="field-grid">
          <label className="field">
            <span className="label-row">
              <span className="field-label">Pet type *</span>
              {renderFieldBadge("petType")}
            </span>
            <select value={petType} onChange={(e) => setPetType(e.target.value)}>
              <option value="DOG">Dog</option>
              <option value="CAT">Cat</option>
              <option value="OTHER">Other</option>
            </select>
            {detailErrors.petType ? <span className="field-error">{detailErrors.petType}</span> : null}
          </label>
          <label className="field">
            <span className="label-row">
              <span className="field-label">Breed</span>
              {renderFieldBadge("breed")}
            </span>
            <input value={breed} onChange={(e) => setBreed(e.target.value)} placeholder="Mix? Mystery? Both valid." />
          </label>
          <label className="field">
            <span className="field-label">Name</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Unknown works!" />
          </label>
          <label className="field">
            <span className="field-label">Gender</span>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="unknown">Unknown</option>
            </select>
          </label>
          <label className="field span-2">
            <span className="label-row">
              <span className="field-label">Color / markings</span>
              {renderFieldBadge("color")}
            </span>
            <input value={color} onChange={(e) => setColor(e.target.value)} placeholder="Spots, socks, socks-on-ears…" />
          </label>
          <label className="field span-2">
            <span className="label-row">
              <span className="field-label">Description *</span>
              {renderFieldBadge("description")}
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Collar color, energy level, last seen shenanigans — paint the picture."
            />
            {detailErrors.description ? <span className="field-error">{detailErrors.description}</span> : null}
          </label>
        </div>

        <div className="nav-row">
          <button type="button" className="btn btn-ghost" onClick={() => setStep(2)}>
            Back
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              if (validatePetDetailsStep()) setStep(4);
            }}
          >
            Nicely done — almost done!
          </button>
        </div>
      </>
    );
  } else if (step === 4) {
    body = (
      <>
        <div className="paw-rail" aria-hidden>
          📣 💌 ✅
        </div>
        <div className="step-meta">Step 4 · Contact</div>
        <h2 className="wizard-title">How can others reach you?</h2>
        <p className="wizard-lead">
          Enter one phone number or email that responders can use to contact you about this report. The location you
          added earlier is saved as-is — including if you left it blank or skipped that step.
        </p>

        {submitError ? <div className="error-banner">{submitError}</div> : null}

        <div className="field-grid">
          <label className="field span-2">
            <span className="field-label">Contact (phone or email) *</span>
            <input
              value={contactDetails}
              onChange={(e) => setContactDetails(e.target.value)}
              placeholder="Your digits or inbox"
            />
            {submitErrors.contactDetails ? <span className="field-error">{submitErrors.contactDetails}</span> : null}
          </label>
        </div>

        <div className="nav-row">
          <button type="button" className="btn btn-ghost" onClick={() => setStep(3)}>
            Back
          </button>
          <button type="button" className="btn btn-primary" disabled={submitting} onClick={handleSubmit}>
            {submitting ? "Sending…" : "Launch report 🚀"}
          </button>
        </div>
      </>
    );
  } else if (step === 5) {
    body = (
      <>
        <div className="step-meta">You did it</div>
        <div className="success-panel">
          <h2 className="wizard-title">Thank you from MILO</h2>
          <p>
            Your kindness helps a pet family move closer to being whole again — whether someone is searching for a lost
            friend or you&apos;ve given a found pet a better shot at getting home. We&apos;re grateful you took the time.
            Nearby MILO users have been notified and may reach out if they can help.
          </p>
          <button type="button" className="btn btn-primary" onClick={() => navigate("/lost-found")}>
            Back to Lost &amp; Found
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <StyledLostFound>
        <div className="top">
          <div className="nav">
            <Navbar />
          </div>
          <div className="banner">
            <h1>Lost &amp; Found</h1>
            <p>Fast, funky, fur-friendly reporting.</p>
          </div>
          <div className="wave">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>

        <div className="content">
          <StyledLostFoundWizard className="wizard-card-wrap">
            <div className="wizard-shell">
              <span className="blob blob-a" aria-hidden />
              <span className="blob blob-b" aria-hidden />
              <span className="blob blob-c" aria-hidden />
              <div className="wizard-card">
                {progressDots}
                {body}
              </div>
            </div>
          </StyledLostFoundWizard>
        </div>
      </StyledLostFound>
      <Footer />
    </>
  );
}

export default LostFoundWizardPage;
