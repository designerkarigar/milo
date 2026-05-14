import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { PetNameCreateStep } from "../../components/AddPet/PetNameCreateStep";
import { useAuth } from "../../contexts/AuthContext";
import { StyledAddPetCapture } from "./styledComponent";
import { startAddPetPipeline } from "../../utils/Functions/Pets/startAddPetPipeline";
import { toast } from "react-toastify";
import { PET_LIMIT_MESSAGE } from "../../utils/Constants/petLimits";
import { getCurrentUserPetCount, isAtPetLimit } from "../../utils/Functions/Pets/petLimitHelpers";

export const AddPetCapture = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draft");
  const { currentUser } = useAuth();
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const [petLimitChecked, setPetLimitChecked] = useState(false);
  const [atPetLimit, setAtPetLimit] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    if (!currentUser) return;
    let cancelled = false;
    (async () => {
      try {
        const count = await getCurrentUserPetCount();
        if (!cancelled) setAtPetLimit(isAtPetLimit(count));
      } catch {
        if (!cancelled) setAtPetLimit(false);
      } finally {
        if (!cancelled) setPetLimitChecked(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [currentUser]);

  const handleSelectedFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const count = await getCurrentUserPetCount();
      if (isAtPetLimit(count)) {
        setAtPetLimit(true);
        toast.warning(PET_LIMIT_MESSAGE);
        return;
      }
    } catch {
      toast.error("We couldn't verify your pet limit. Please try again.");
      return;
    }
    const newDraftId = startAddPetPipeline({ file, currentUser });
    navigate(`/add-pet/capture?draft=${encodeURIComponent(newDraftId)}`);
  };

  if (draftId) {
    return (
      <>
        <div style={{ backgroundColor: "#0066ba" }}>
          <Navbar />
        </div>
        <PetNameCreateStep draftId={draftId} currentUser={currentUser} />
        <Footer />
      </>
    );
  }

  return (
    <>
      <div style={{ backgroundColor: "#0066ba" }}>
        <Navbar />
      </div>
      <StyledAddPetCapture>
        <div className="container">
          <h1>All it takes is a good photo :)</h1>
          {petLimitChecked && atPetLimit ? (
            <p className="limit-notice" role="status">
              {PET_LIMIT_MESSAGE}
            </p>
          ) : null}
          <div className="action-row">
            <button
              type="button"
              onClick={() => cameraInputRef.current?.click()}
              aria-label="Open camera"
              disabled={!petLimitChecked || atPetLimit}
            >
              <CameraAltIcon />
            </button>
            <button
              type="button"
              onClick={() => galleryInputRef.current?.click()}
              aria-label="Open gallery"
              disabled={!petLimitChecked || atPetLimit}
            >
              <PhotoLibraryIcon />
            </button>
          </div>
        </div>

        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden-input"
          onChange={handleSelectedFile}
        />
        <input
          ref={galleryInputRef}
          type="file"
          accept="image/*"
          className="hidden-input"
          onChange={handleSelectedFile}
        />
      </StyledAddPetCapture>
      <Footer />
    </>
  );
};

export default AddPetCapture;
