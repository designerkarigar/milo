import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { StyledLostFoundContactModal } from "./styledComponent";
import { pickVisibleReporterContact } from "../../utils/Functions/LostFound/lostFoundUtils";

export function LostFoundContactReporterModal({ isOpen, onClose, report }) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen || !report) return null;

  const { phoneDisplay, emailDisplay } = pickVisibleReporterContact(report);

  const summaryLines = [
    phoneDisplay && `Phone: ${phoneDisplay}`,
    emailDisplay && `Email: ${emailDisplay}`,
  ].filter(Boolean);
  const copyText = summaryLines.join("\n");

  const handleCopy = async () => {
    if (!copyText) {
      toast.info("Nothing to copy.");
      return;
    }
    try {
      await navigator.clipboard.writeText(copyText);
      toast.success("Copied to clipboard.");
    } catch {
      toast.error("Could not copy. Select and copy manually.");
    }
  };

  const portalTarget = typeof document !== "undefined" ? document.body : null;
  if (!portalTarget) return null;

  return createPortal(
    <StyledLostFoundContactModal>
      <div className="modal-overlay" role="presentation" onClick={onClose}>
        <div
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lnf-contact-title"
          onClick={(e) => e.stopPropagation()}
        >
          <button type="button" className="close-button" onClick={onClose} aria-label="Close">
            ×
          </button>
          <h2 id="lnf-contact-title" className="modal-title">
            Reporter contact
          </h2>
          <p className="modal-sub">
            Only details the reporter chose to share are shown here.
          </p>

          {!phoneDisplay && !emailDisplay ? (
            <p className="modal-empty">This reporter has not shared contact details.</p>
          ) : (
            <dl className="fields">
              {phoneDisplay ? (
                <div className="row row-highlight">
                  <dt>Phone</dt>
                  <dd>{phoneDisplay}</dd>
                </div>
              ) : null}
              {emailDisplay ? (
                <div className={`row ${phoneDisplay ? "" : "row-highlight"}`}>
                  <dt>Email</dt>
                  <dd>{emailDisplay}</dd>
                </div>
              ) : null}
            </dl>
          )}

          <div className="actions">
            <button type="button" className="btn ghost copy-full" onClick={handleCopy} disabled={!copyText}>
              Copy details
            </button>
          </div>
        </div>
      </div>
    </StyledLostFoundContactModal>,
    portalTarget
  );
}

export default LostFoundContactReporterModal;
