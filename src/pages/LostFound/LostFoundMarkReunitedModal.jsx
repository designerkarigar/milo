import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import { StyledLostFoundReunitedModal } from "./styledComponent";

export function LostFoundMarkReunitedModal({ isOpen, onClose, onConfirm, submitting }) {
  const [message, setMessage] = useState("");
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const cameraRef = useRef(null);
  const galleryRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setMessage("");
      setPhotoFile(null);
      setPhotoPreview((prev) => {
        if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
        return "";
      });
      if (cameraRef.current) cameraRef.current.value = "";
      if (galleryRef.current) galleryRef.current.value = "";
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape" && !submitting) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, submitting]);

  useEffect(() => {
    return () => {
      if (photoPreview && photoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handlePhotoSelected = (file) => {
    if (!file) return;
    setPhotoPreview((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return URL.createObjectURL(file);
    });
    setPhotoFile(file);
  };

  const clearPhoto = () => {
    setPhotoPreview((prev) => {
      if (prev && prev.startsWith("blob:")) URL.revokeObjectURL(prev);
      return "";
    });
    setPhotoFile(null);
    if (cameraRef.current) cameraRef.current.value = "";
    if (galleryRef.current) galleryRef.current.value = "";
  };

  const handleConfirm = () => {
    if (submitting) return;
    onConfirm({
      reunionMessage: message.trim(),
      reunionPhotoFile: photoFile,
    });
  };

  if (!isOpen) return null;

  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!portalTarget) return null;

  return createPortal(
    <StyledLostFoundReunitedModal>
      <div className="modal-overlay" role="presentation" onClick={() => !submitting && onClose()}>
        <div
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lnf-reunited-title"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            disabled={submitting}
            aria-label="Close"
          >
            ×
          </button>
          <h2 id="lnf-reunited-title" className="modal-title">
            Is your pet safely back home?
          </h2>
          <p className="modal-sub">
            Marking this pet as reunited will close the active search and let the MILO community know your pet is
            safe.
          </p>

          <div className="reunion-field">
            <label htmlFor="lnf-reunion-msg">Reunion message (optional)</label>
            <textarea
              id="lnf-reunion-msg"
              className="reunion-textarea"
              placeholder="Share how your pet came back home…"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitting}
              maxLength={2000}
            />
          </div>

          <div className="reunion-field">
            <label>Reunion photo (optional)</label>
            <input
              ref={cameraRef}
              type="file"
              accept="image/*"
              capture="environment"
              style={{ display: "none" }}
              onChange={(e) => handlePhotoSelected(e.target.files?.[0])}
            />
            <input
              ref={galleryRef}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handlePhotoSelected(e.target.files?.[0])}
            />
            <div className="reunion-photo-row">
              <button
                type="button"
                className="reunion-photo-btn"
                onClick={() => cameraRef.current?.click()}
                disabled={submitting}
              >
                <CameraAltIcon style={{ fontSize: 20 }} aria-hidden />
                Camera
              </button>
              <button
                type="button"
                className="reunion-photo-btn"
                onClick={() => galleryRef.current?.click()}
                disabled={submitting}
              >
                <PhotoLibraryIcon style={{ fontSize: 20 }} aria-hidden />
                Gallery
              </button>
              {photoPreview ? (
                <button type="button" className="reunion-photo-clear" onClick={clearPhoto} disabled={submitting}>
                  Remove photo
                </button>
              ) : null}
            </div>
            {photoPreview ? <img src={photoPreview} alt="" className="reunion-photo-preview" /> : null}
          </div>

          <div className="actions">
            <button type="button" className="btn ghost" onClick={onClose} disabled={submitting}>
              Cancel
            </button>
            <button type="button" className="btn primary" onClick={handleConfirm} disabled={submitting}>
              {submitting ? "Saving…" : "Yes, Reunited"}
            </button>
          </div>
        </div>
      </div>
    </StyledLostFoundReunitedModal>,
    portalTarget
  );
}

export default LostFoundMarkReunitedModal;
