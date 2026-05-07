import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { usePetDraft } from "../../utils/Functions/Pets/usePetDraft";
import { updatePetDraft } from "../../utils/Functions/Pets/addPetDraftStore";
import { restartAddPetPipeline } from "../../utils/Functions/Pets/startAddPetPipeline";
import { StyledAddPetName } from "./styledComponent";
import { useAuth } from "../../contexts/AuthContext";

export const AddPetName = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [searchParams] = useSearchParams();
  const draftId = searchParams.get("draft");
  const draft = usePetDraft(draftId);
  const [petName, setPetName] = useState(draft?.name || "");
  const [isImageMenuOpen, setIsImageMenuOpen] = useState(false);
  const cameraInputRef = React.useRef(null);
  const galleryInputRef = React.useRef(null);

  const isInvalidDraft = useMemo(() => !draftId || !draft, [draftId, draft]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const handleNext = () => {
    if (!petName.trim() || !draftId) return;
    updatePetDraft(draftId, { name: petName.trim() });
    navigate(`/add-pet/profile?draft=${encodeURIComponent(draftId)}`);
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    setIsImageMenuOpen(false);
    if (!file || !draftId) return;
    restartAddPetPipeline({ draftId, file, currentUser });
  };

  return (
    <>
      <div style={{ backgroundColor: "#0066ba" }}>
        <Navbar />
      </div>
      <StyledAddPetName>
        <div className="container">
          {isInvalidDraft ? (
            <div className="error-box">
              <p>Pet session not found. Please start with Add your pet again.</p>
              <button type="button" onClick={() => navigate("/home")}>
                Go Home
              </button>
            </div>
          ) : (
            <>
              <h1>Name of your pet</h1>
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
                      <button
                        type="button"
                        onClick={() => cameraInputRef.current?.click()}
                      >
                        Click
                      </button>
                      <button
                        type="button"
                        onClick={() => galleryInputRef.current?.click()}
                      >
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
                    disabled={!petName.trim()}
                    onClick={handleNext}
                  >
                    &gt;
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
            </>
          )}
        </div>
      </StyledAddPetName>
      <Footer />
    </>
  );
};

export default AddPetName;

