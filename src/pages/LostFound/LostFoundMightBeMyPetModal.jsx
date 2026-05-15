import React, { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import { fetchLostAndFound } from "../../utils/Functions/LostFound/lostAndFoundApi";
import { createFoundPetMatchRequest } from "../../utils/Functions/LostFound/lostFoundMatchRequestApi";
import {
  getLostFoundStableId,
  isLostFoundReportOwner,
  normalizeLostFoundRecord,
  filterActiveLostReports,
} from "../../utils/Functions/LostFound/lostFoundUtils";
import { MightBePetModalOverlay } from "./lostFoundMatchStyled";

const MIN_MESSAGE_LEN = 20;
const NO_LOST_OPTION = "__none__";

export function sessionSentKey(foundUid) {
  return `lnf_match_sent_${foundUid}`;
}

export function LostFoundMightBeMyPetModal({
  isOpen,
  onClose,
  foundReportUid,
  currentUser,
  onSent,
}) {
  const [step, setStep] = useState("form");
  const [lostChoice, setLostChoice] = useState(NO_LOST_OPTION);
  const [message, setMessage] = useState("");
  const [msgError, setMsgError] = useState("");
  const [lostRows, setLostRows] = useState([]);
  const [loadingLost, setLoadingLost] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setStep("form");
      setLostChoice(NO_LOST_OPTION);
      setMessage("");
      setMsgError("");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        setLoadingLost(true);
        const list = await fetchLostAndFound({});
        const rows = list.map(normalizeLostFoundRecord);
        const mine = filterActiveLostReports(rows).filter((r) => isLostFoundReportOwner(r, currentUser));
        if (!cancelled) setLostRows(mine);
      } catch {
        if (!cancelled) setLostRows([]);
      } finally {
        if (!cancelled) setLoadingLost(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [isOpen, currentUser]);

  const lostOptions = useMemo(() => {
    return lostRows.map((r) => ({
      uid: getLostFoundStableId(r),
      label: `${r?.name || "Pet"} · ${r?.breed || "—"} · ${r?.location?.city || "—"}`,
    }));
  }, [lostRows]);

  const handleSend = async () => {
    const trimmed = message.trim();
    if (trimmed.length < MIN_MESSAGE_LEN) {
      setMsgError(`Please write at least ${MIN_MESSAGE_LEN} characters so the finder has helpful context.`);
      return;
    }
    setMsgError("");
    const id = String(foundReportUid || "").trim();
    if (!id) {
      toast.error("Missing found report.");
      return;
    }
    try {
      setSubmitting(true);
      const body = { message: trimmed };
      if (lostChoice && lostChoice !== NO_LOST_OPTION) {
        body.lostReportId = lostChoice;
      }
      await createFoundPetMatchRequest(id, body);
      try {
        sessionStorage.setItem(sessionSentKey(id), "1");
      } catch {
        /* ignore */
      }
      setStep("success");
      onSent?.();
    } catch (e) {
      const msg = String(e?.response?.data?.message || e?.message || e);
      toast.error(msg || "Could not send your request. Try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;
  const portal = typeof document !== "undefined" ? document.body : null;
  if (!portal) return null;

  return createPortal(
    <MightBePetModalOverlay>
      <div
        className="modal-overlay"
        role="presentation"
        onClick={() => !submitting && step === "form" && onClose()}
      >
        <div
          className="modal-content"
          role="dialog"
          aria-modal="true"
          aria-labelledby="might-be-title"
          onClick={(ev) => ev.stopPropagation()}
        >
          <button type="button" className="close-button" onClick={onClose} aria-label="Close" disabled={submitting}>
            ×
          </button>

          {step === "form" ? (
            <>
              <h2 id="might-be-title" className="modal-title">
                Could this be your pet?
              </h2>
              <p className="modal-sub">
                Send a private request to the finder. Share details that help show this pet may belong to you — names,
                markings, collar, behavior, anything kind and specific.
              </p>

              <label className="field-label" htmlFor="might-be-lost">
                Your lost pet report (optional)
              </label>
              <select
                id="might-be-lost"
                value={lostChoice}
                onChange={(e) => setLostChoice(e.target.value)}
                disabled={submitting || loadingLost}
              >
                <option value={NO_LOST_OPTION}>
                  {loadingLost ? "Loading your reports…" : "I have not created a lost report yet"}
                </option>
                {lostOptions.map((o) => (
                  <option key={o.uid} value={o.uid}>
                    {o.label}
                  </option>
                ))}
              </select>

              <label className="field-label" htmlFor="might-be-msg">
                Message <span style={{ color: "#dc2626" }}>*</span>
              </label>
              <textarea
                id="might-be-msg"
                value={message}
                onChange={(e) => {
                  setMessage(e.target.value);
                  if (msgError) setMsgError("");
                }}
                disabled={submitting}
                placeholder="Example: This looks like my dog Bruno. He has a brown collar and responds to his name."
                maxLength={2000}
              />
              {msgError ? <span className="field-error">{msgError}</span> : null}

              <div className="actions">
                <button type="button" className="btn-cancel" onClick={onClose} disabled={submitting}>
                  Cancel
                </button>
                <button type="button" className="btn-send" onClick={handleSend} disabled={submitting}>
                  {submitting ? "Sending…" : "Send Request"}
                </button>
              </div>
            </>
          ) : (
            <div className="success-box">
              <h2 className="modal-title" style={{ color: "#047857" }}>
                Request sent
              </h2>
              <p>
                Your request has been sent to the finder. They can review your message and choose to connect with you.
              </p>
              <div className="actions">
                <button type="button" className="btn-send" style={{ flex: "1 1 100%" }} onClick={onClose}>
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MightBePetModalOverlay>,
    portal
  );
}

export default LostFoundMightBeMyPetModal;
