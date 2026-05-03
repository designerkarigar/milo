import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useAuth } from "../../contexts/AuthContext";
import { StyledAddPetCapture } from "./styledComponent";
import { startAddPetPipeline } from "../../utils/Functions/Pets/startAddPetPipeline";

export const AddPetCapture = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);

  useEffect(() => {
    if (!currentUser) {
      navigate("/home");
    }
  }, [currentUser, navigate]);

  const handleSelectedFile = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    const draftId = startAddPetPipeline({ file, currentUser });
    navigate(`/add-pet/name?draft=${encodeURIComponent(draftId)}`);
  };

  return (
    <>
      <div style={{ backgroundColor: "#0066ba" }}>
        <Navbar />
      </div>
      <StyledAddPetCapture>
        <div className="container">
          <h1>A good photo will help us :)</h1>
          <p>Choose how you want to add your pet photo.</p>
          <div className="action-row">
            <button type="button" onClick={() => cameraInputRef.current?.click()}>
              Click
            </button>
            <button type="button" onClick={() => galleryInputRef.current?.click()}>
              Gallery
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

