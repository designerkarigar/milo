import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { usePetDraft } from "../../utils/Functions/Pets/usePetDraft";
import { updatePetDraft } from "../../utils/Functions/Pets/addPetDraftStore";
import { updatePetFromAi } from "../../utils/Functions/Pets/updatePetFromAi";
import { StyledAddPetProfile } from "./styledComponent";
import { useAuth } from "../../contexts/AuthContext";

const DETAIL_FIELDS = [
  { key: "petType", label: "Pet Type" },
  { key: "breed", label: "Breed" },
  { key: "breedCategory", label: "Category" },
  { key: "origin", label: "Origin" },
  { key: "avgMass", label: "Average Mass" },
  { key: "lifespan", label: "Lifespan" },
];

const DetailRow = ({
  label,
  value,
  isBlinking,
  canEdit,
  isEditing,
  onStartEdit,
  onChange,
}) => (
  <div className="detail-row">
    <span>{label}</span>
    <div className="detail-row-right">
      {isEditing ? (
        <input value={value || ""} onChange={onChange} className="detail-input" />
      ) : isBlinking ? (
        <strong className="blink">Loading...</strong>
      ) : (
        <strong>{value || "—"}</strong>
      )}
      {canEdit && !isEditing ? (
        <button type="button" className="edit-btn" onClick={onStartEdit}>
          ✎
        </button>
      ) : null}
    </div>
  </div>
);

export const AddPetProfile = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draft");
  const draft = usePetDraft(draftId);
  const isInvalidDraft = useMemo(() => !draftId || !draft, [draftId, draft]);
  const isMissingServerPet = useMemo(
    () => Boolean(draftId && draft && !draft.createdPetUid),
    [draftId, draft]
  );
  const [aiTimedOut, setAiTimedOut] = useState(false);
  const [editableFields, setEditableFields] = useState({});
  const [manualValues, setManualValues] = useState({
    petType: "",
    breed: "",
    breedCategory: "",
    origin: "",
    avgMass: "",
    lifespan: "",
    description: "",
  });

  const aiData = draft?.aiResult || {};
  const isAiPending = draft?.aiStatus === "pending" || draft?.aiStatus === "processing";
  const canEditDetails = true;

  const aiSettled = useMemo(() => {
    if (!draft) return false;
    return draft.aiStatus === "done" || draft.aiStatus === "failed";
  }, [draft]);

  const canSave =
    Boolean(draft?.createdPetUid) &&
    aiSettled &&
    draft?.updatePetStatus !== "processing";

  const profileSubtitle = useMemo(() => {
    if (isAiPending) return "Analyzing pet details in the background…";
    if (draft?.aiStatus === "failed") {
      return "Auto-detect did not complete — you can still edit and save.";
    }
    return "Review details and tap Save when you are ready.";
  }, [isAiPending, draft?.aiStatus]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAiTimedOut(true);
    }, 60 * 1000);
    return () => clearTimeout(timeout);
  }, [draftId]);

  useEffect(() => {
    if (!draft) return;
    setManualValues((prev) => ({
      petType: prev.petType || aiData.petType || "",
      breed: prev.breed || aiData.breed || "",
      breedCategory: prev.breedCategory || aiData.breedCategory || "",
      origin: prev.origin || aiData.origin || "",
      avgMass: prev.avgMass || aiData.avgMass || "",
      lifespan: prev.lifespan || aiData.lifespan || "",
      description: prev.description || aiData.description || "",
    }));
  }, [draft, aiData]);

  const handleDetailChange = (key, value) => {
    setManualValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveManualDetails = async () => {
    if (!draftId || !draft?.createdPetUid) return;

    updatePetDraft(draftId, { updatePetStatus: "processing", error: "" });
    try {
      const mergedAiData = {
        ...aiData,
        ...manualValues,
      };
      await updatePetFromAi({
        uid: draft.createdPetUid,
        name: draft.name,
        imageUrl: draft.firebaseUrl,
        aiData: mergedAiData,
      });
      updatePetDraft(draftId, {
        updatePetStatus: "done",
        aiStatus: "done",
        aiResult: mergedAiData,
      });
      setEditableFields({});
      navigate("/my-pets");
    } catch (error) {
      updatePetDraft(draftId, {
        updatePetStatus: "failed",
        error: String(error?.message || error),
      });
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#0066ba" }}>
        <Navbar />
      </div>
      <StyledAddPetProfile>
        <div className="container">
          {isInvalidDraft ? (
            <div className="error-box">
              <p>Pet session not found. Please start with Add your pet again.</p>
              <button type="button" onClick={() => navigate("/home")}>
                Go Home
              </button>
            </div>
          ) : isMissingServerPet ? (
            <div className="error-box">
              <p>Your pet profile was not created yet. Go back to enter the name and try again.</p>
              <button
                type="button"
                onClick={() =>
                  navigate(`/add-pet/capture?draft=${encodeURIComponent(draftId)}`)
                }
              >
                Back to name step
              </button>
            </div>
          ) : (
            <>
              <div className="header-row">
                <h1>{draft?.name || "Your Pet"}</h1>
                <p>{profileSubtitle}</p>
                {draft?.createdPetUid ? (
                  <p className="success-tick blink" title="Pet created">
                    ✓
                  </p>
                ) : null}
                {draft?.error ? <p className="error-line">{draft.error}</p> : null}
                {draft?.aiStatus === "failed" && draft?.aiError ? (
                  <p className="error-line subtle">{draft.aiError}</p>
                ) : null}
              </div>

              <div className="profile-grid">
                <div className="photo-card">
                  {draft?.previewUrl ? (
                    <img src={draft.previewUrl} alt={draft?.name || "Pet"} />
                  ) : (
                    <div className="placeholder">No photo</div>
                  )}
                </div>

                <div className="details-card">
                  {DETAIL_FIELDS.map((field) => (
                    <DetailRow
                      key={field.key}
                      label={field.label}
                      value={manualValues[field.key]}
                      isBlinking={isAiPending && !aiTimedOut && !manualValues[field.key]}
                      canEdit={canEditDetails}
                      isEditing={!!editableFields[field.key]}
                      onStartEdit={() =>
                        setEditableFields((prev) => ({ ...prev, [field.key]: true }))
                      }
                      onChange={(event) =>
                        handleDetailChange(field.key, event.target.value)
                      }
                    />
                  ))}
                </div>
              </div>

              <div className="info-card">
                <h2>About {draft?.name || "your pet"}</h2>
                {canEditDetails ? (
                  <div className="about-editor">
                    {!editableFields.description ? (
                      <button
                        type="button"
                        className="edit-btn"
                        onClick={() =>
                          setEditableFields((prev) => ({ ...prev, description: true }))
                        }
                      >
                        ✎
                      </button>
                    ) : null}
                    {editableFields.description ? (
                      <textarea
                        value={manualValues.description}
                        onChange={(event) =>
                          handleDetailChange("description", event.target.value)
                        }
                        placeholder={`Write about ${draft?.name || "your pet"}`}
                      />
                    ) : (
                      <p>{manualValues.description || "Tap pencil icon to add details."}</p>
                    )}
                  </div>
                ) : isAiPending && !manualValues.description ? (
                  <p className="blink">Loading details...</p>
                ) : (
                  <p>{manualValues.description || "No details available."}</p>
                )}
              </div>

              {canEditDetails ? (
                <div className="actions-row">
                  {!canSave && draft?.createdPetUid && !aiSettled ? (
                    <p className="save-hint" role="status">
                      Save unlocks when photo analysis succeeds or cannot complete.
                    </p>
                  ) : null}
                  <button
                    type="button"
                    className="save-btn"
                    onClick={handleSaveManualDetails}
                    disabled={!canSave}
                  >
                    {draft?.updatePetStatus === "processing" ? "Saving..." : "Save"}
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </StyledAddPetProfile>
      <Footer />
    </>
  );
};

export default AddPetProfile;
