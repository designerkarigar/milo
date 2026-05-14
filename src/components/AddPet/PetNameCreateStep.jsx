import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePetDraft } from "../../utils/Functions/Pets/usePetDraft";
import {
  claimPetCreationIfPending,
  getPetDraft,
  updatePetDraft,
} from "../../utils/Functions/Pets/addPetDraftStore";
import { restartAddPetPipeline } from "../../utils/Functions/Pets/startAddPetPipeline";
import { createPet } from "../../utils/Functions/Pets/createPet";
import { StyledAddPetName } from "../../pages/AddPetName/styledComponent";
import { toast } from "react-toastify";
import { PET_LIMIT_MESSAGE } from "../../utils/Constants/petLimits";
import { getCurrentUserPetCount, isAtPetLimit } from "../../utils/Functions/Pets/petLimitHelpers";

/**
 * Photo preview + pet name + POST /pets on Next (used on first add-pet step after capture).
 */
export const PetNameCreateStep = ({ draftId, currentUser }) => {
  const navigate = useNavigate();
  const draft = usePetDraft(draftId);
  const [petName, setPetName] = useState(draft?.name || "");
  const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const cameraInputRef = React.useRef(null);
  const galleryInputRef = React.useRef(null);

  const isInvalidDraft = useMemo(() => !draftId || !draft, [draftId, draft]);

  const uploadReady = draft?.uploadStatus === "done" && Boolean(draft?.firebaseUrl);
  const uploadFailed = draft?.uploadStatus === "failed";

  useEffect(() => {
    setPetName((prev) => (draft?.name ? draft.name : prev));
  }, [draft?.name]);

  const handleNext = async () => {
    if (!petName.trim() || !draftId || submitting) return;

    if (uploadFailed) {
      toast.error("Photo upload failed. Please pick another photo.");
      return;
    }

    if (!uploadReady) {
      toast.info("Please wait for your photo to finish uploading.");
      return;
    }

    const trimmed = petName.trim();
    setSubmitting(true);
    updatePetDraft(draftId, { name: trimmed, error: "" });

    try {
      const existing = getPetDraft(draftId);
      if (existing?.createdPetUid) {
        navigate(`/add-pet/profile?draft=${encodeURIComponent(draftId)}`);
        return;
      }

      const count = await getCurrentUserPetCount();
      if (isAtPetLimit(count)) {
        toast.warning(PET_LIMIT_MESSAGE);
        return;
      }

      if (!claimPetCreationIfPending(draftId)) {
        const again = getPetDraft(draftId);
        if (again?.createdPetUid) {
          navigate(`/add-pet/profile?draft=${encodeURIComponent(draftId)}`);
          return;
        }
        if (again?.createPetStatus === "processing") {
          toast.info("Creating your pet profile. Please wait.");
          return;
        }
        return;
      }

      const latest = getPetDraft(draftId);
      if (!latest?.firebaseUrl) {
        updatePetDraft(draftId, {
          createPetStatus: "pending",
          error: "",
        });
        toast.error("Photo is not ready. Please try again.");
        return;
      }

      const createdPet = await createPet({
        name: latest.name || trimmed,
        imageUrl: latest.firebaseUrl,
      });

      updatePetDraft(draftId, {
        createPetStatus: "done",
        createdPetUid: createdPet?.uid || "",
        error: "",
      });

      navigate(`/add-pet/profile?draft=${encodeURIComponent(draftId)}`);
    } catch (error) {
      updatePetDraft(draftId, {
        createPetStatus: "pending",
        createdPetUid: "",
        error: "",
      });
      toast.error(
        "We ran into an issue on our end while saving your pet. Please try adding your pet again."
      );
      navigate("/add-pet/capture");
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    setIsImageMenuOpen(false);
    if (!file || !draftId) return;
    restartAddPetPipeline({ draftId, file, currentUser });
  };

  if (isInvalidDraft) {
    return (
      <StyledAddPetName>
        <div className="container">
          <div className="error-box">
            <p>Pet session not found. Please start with Add your pet again.</p>
            <button type="button" onClick={() => navigate("/home")}>
              Go Home
            </button>
          </div>
        </div>
      </StyledAddPetName>
    );
  }

  return (
    <StyledAddPetName>
      <div className="container">
        <h1>Name your pet</h1>
        {uploadFailed ? (
          <p className="error-line" role="status">
            Photo upload failed. Tap the pencil icon to choose another photo.
          </p>
        ) : null}
        {!uploadReady && !uploadFailed ? (
          <p className="limit-notice" role="status">
            Preparing your photo… you can enter a name while we finish.
          </p>
        ) : null}
        <div className="content">
          <div className="preview-box">
            <button
              type="button"
              className="image-edit-btn"
              onClick={() => setIsImageMenuOpen((prev) => !prev)}
              aria-label="Change pet image"
            >
              ✎
            </button>
            {isImageMenuOpen ? (
              <div className="image-menu">
                <button type="button" onClick={() => cameraInputRef.current?.click()}>
                  Click
                </button>
                <button type="button" onClick={() => galleryInputRef.current?.click()}>
                  Gallery
                </button>
              </div>
            ) : null}
            {draft?.previewUrl ? (
              <img src={draft.previewUrl} alt="Captured pet" />
            ) : (
              <div className="placeholder">Photo not available</div>
            )}
          </div>

          <div className="form-box">
            <label htmlFor="petName">Pet name</label>
            <input
              id="petName"
              type="text"
              value={petName}
              onChange={(event) => setPetName(event.target.value)}
              placeholder="Enter your pet name"
              maxLength={60}
            />
            <button
              type="button"
              className="next-btn"
              disabled={!petName.trim() || !uploadReady || submitting}
              onClick={handleNext}
            >
              {submitting ? "…" : ">"}
            </button>
          </div>
        </div>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden-input"
          onChange={handleImageChange}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          className="hidden-input"
          onChange={handleImageChange}
        />
      </div>
    </StyledAddPetName>
  );
};
