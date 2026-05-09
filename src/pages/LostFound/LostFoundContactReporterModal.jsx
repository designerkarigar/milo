import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { StyledLostFoundContactModal } from "./styledComponent";
import { pickReporterContactFields } from "../../utils/Functions/LostFound/lostFoundUtils";

function normalizeTelDigits(value) {
  const digits = String(value || "").replace(/\D/g, "");
  return digits.length >= 7 ? digits : null;
}

function isEmailLike(value) {
  const s = String(value || "").trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

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

  const { contactDetails: contactFromApi, userName: reporterId } = pickReporterContactFields(report);
  const contactRaw = String(contactFromApi || "").trim();
  const userName = String(reporterId || "").trim();

  const telFromContact = normalizeTelDigits(contactRaw);
  const telFromUser = normalizeTelDigits(userName);
  const telDigits = telFromContact || telFromUser;

  const contactEmail = isEmailLike(contactRaw) ? contactRaw : null;
  const userEmail = isEmailLike(userName) ? userName : null;

  const summaryLines = [
    userName && `Reporter: ${userName}`,
    contactRaw && `Contact: ${contactRaw}`,
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
          <p className="modal-sub">How to reach the person who filed this report.</p>

          <dl className="fields">
            {(contactRaw || userName) && (
              <div className="row row-highlight">
                <dt>Contact</dt>
                <dd>{contactRaw || userName || "—"}</dd>
              </div>
            )}
            {userName && contactRaw && userName !== contactRaw && (
              <div className="row">
                <dt>Reporter account</dt>
                <dd>{userName}</dd>
              </div>
            )}
          </dl>

          <div className="actions">
            {telDigits && (
              <a className="btn primary" href={`tel:${telDigits}`}>
                Call
              </a>
            )}
            {(contactEmail || userEmail) && (
              <a className="btn primary" href={`mailto:${contactEmail || userEmail}`}>
                Email
              </a>
            )}
            <button type="button" className="btn ghost" onClick={handleCopy}>
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
