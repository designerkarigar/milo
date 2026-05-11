import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import {
  ConfidenceChip,
  EmptySightings,
  LoadingSightings,
  SightingsBackdrop,
  SightingsDragLayer,
  SightingsPanelHeader,
  SightingsPanelInner,
  SightingsPanelShell,
  SightingsScroll,
  SightingActions,
  SightingCardBody,
  SightingExpanded,
  SightingFloatCard,
  SightingGhostBtn,
  SightingImageWrap,
  SightingLoc,
  SightingNote,
  SightingPrimaryBtn,
  SightingTimeRow,
  WitnessContactSheet,
} from "./lostFoundSightingsPanelStyled";
import {
  formatRelativeShort,
  formatSightingClock,
  formatSightingFullTimestamp,
  hasVisibleWitnessContact,
  pickSightingWitnessLabel,
  pickVisibleWitnessContact,
  pickWitnessDisplayName,
  sightingStableId,
} from "../../utils/Functions/LostFound/lostFoundUtils";

const MAX_DRAG = 28;

function buildMapsUrl(s) {
  const lat = s?.location?.lat ?? s?.lat;
  const lng = s?.location?.long ?? s?.location?.lng ?? s?.long;
  if (lat == null || lng == null || Number.isNaN(Number(lat)) || Number.isNaN(Number(lng))) return "";
  return `https://www.google.com/maps?q=${encodeURIComponent(`${lat},${lng}`)}`;
}

function telHref(phoneDisplay) {
  const d = String(phoneDisplay || "").replace(/\D/g, "");
  if (!d) return "";
  return `tel:${d}`;
}

export function LostFoundSightingsPanel({
  open,
  onClose,
  reportUidEncoded,
  sightings = [],
  loading,
  petName,
}) {
  const [mounted, setMounted] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [dragDx, setDragDx] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragActive = useRef(false);
  const startClient = useRef({ x: 0, y: 0 });
  const startDx = useRef(0);
  const [expandedKey, setExpandedKey] = useState(null);
  const [narrow, setNarrow] = useState(false);
  const [witnessSheet, setWitnessSheet] = useState(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const fn = () => setNarrow(mq.matches);
    fn();
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    if (open) {
      setMounted(true);
      setExpandedKey(null);
      setWitnessSheet(null);
      const id = requestAnimationFrame(() => setSlideIn(true));
      return () => cancelAnimationFrame(id);
    }
    setSlideIn(false);
    const id = setTimeout(() => {
      setMounted(false);
      setDragDx(0);
    }, 360);
    return () => clearTimeout(id);
  }, [open]);

  useEffect(() => {
    if (!mounted) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mounted]);

  const onPointerDownDrag = useCallback(
    (e) => {
      if (e.button !== 0) return;
      dragActive.current = true;
      setIsDragging(true);
      startClient.current = { x: e.clientX, y: e.clientY };
      startDx.current = dragDx;
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    },
    [dragDx]
  );

  const onPointerMoveDrag = useCallback(
    (e) => {
      if (!dragActive.current) return;
      if (narrow) {
        const dy = e.clientY - startClient.current.y;
        const next = Math.max(-18, Math.min(18, startDx.current + dy));
        setDragDx(next);
        return;
      }
      const dx = e.clientX - startClient.current.x;
      const next = Math.max(-MAX_DRAG, Math.min(MAX_DRAG, startDx.current + dx));
      setDragDx(next);
    },
    [narrow]
  );

  const endDrag = useCallback(() => {
    dragActive.current = false;
    setIsDragging(false);
    setDragDx(0);
  }, []);

  const handleOpenDetail = useCallback(
    (sid) => {
      const path = `/lost-found/${reportUidEncoded}/sightings/${encodeURIComponent(sid)}`;
      window.open(`${window.location.origin}${path}`, "_blank", "noopener,noreferrer");
    },
    [reportUidEncoded]
  );

  const handleContactWitness = useCallback((s) => {
    const vis = pickVisibleWitnessContact(s);
    if (!vis.phoneDisplay && !vis.emailDisplay) {
      toast.info("This witness has not allowed their phone or email to be shared.");
      return;
    }
    setWitnessSheet({ phone: vis.phoneDisplay, email: vis.emailDisplay });
  }, []);

  if (!mounted) return null;

  const count = sightings.length;
  const panelIn = open && slideIn;

  return createPortal(
    <>
      <SightingsBackdrop
        role="presentation"
        onClick={onClose}
        style={{
          pointerEvents: panelIn ? "auto" : "none",
          opacity: panelIn ? 1 : 0,
          transition: "opacity 0.32s ease",
        }}
      />
      <SightingsPanelShell aria-hidden={!panelIn}>
        <SightingsPanelInner
          role="dialog"
          aria-modal="true"
          aria-labelledby="sightings-panel-title"
          data-open={panelIn}
          style={{
            transform: narrow
              ? panelIn
                ? `translate3d(0, ${dragDx}px, 0)`
                : "translate3d(0, 108%, 0)"
              : panelIn
                ? `translate3d(${dragDx}px, 0, 0)`
                : "translate3d(108%, 0, 0)",
            transition: isDragging ? "none" : "transform 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <SightingsDragLayer
            onPointerDown={onPointerDownDrag}
            onPointerMove={onPointerMoveDrag}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div className="drag-pill" />
          </SightingsDragLayer>

          <SightingsPanelHeader>
            <div
              className="hdr-main hdr-drag"
              onPointerDown={onPointerDownDrag}
              onPointerMove={onPointerMoveDrag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <h2 id="sightings-panel-title" className="hdr-title">
                <span aria-hidden>👀</span> Live Sightings ({loading ? "…" : count})
              </h2>
              <p className="hdr-sub">Recent community updates for {petName ? `“${petName}”` : "this pet"}</p>
            </div>
            <button
              type="button"
              className="hdr-close"
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Close sightings"
            >
              ✕
            </button>
          </SightingsPanelHeader>

          <SightingsScroll>
            {loading ? (
              <LoadingSightings>Pulling in the latest clues…</LoadingSightings>
            ) : count === 0 ? (
              <EmptySightings>
                No sightings yet. Share this report so neighbors know who to watch for — live tips will land
                here.
              </EmptySightings>
            ) : (
              sightings.map((s, index) => {
                const key = sightingStableId(s, index);
                const expanded = expandedKey === key;
                const place = String(s.location?.address || "").trim() || "Location shared";
                const rel = formatRelativeShort(s.seenAt);
                const conf = String(s.confidence || "").trim().toLowerCase() || "unknown";
                const mapsUrl = buildMapsUrl(s);
                const witnessRaw = pickSightingWitnessLabel(s);
                const witnessDisplay = pickWitnessDisplayName(s);
                const confLabel =
                  conf === "high" ? "High" : conf === "medium" ? "Medium" : conf === "low" ? "Low" : "Note";

                return (
                  <SightingFloatCard key={key} data-expanded={expanded}>
                    <SightingCardBody
                      type="button"
                      onClick={() => setExpandedKey((k) => (k === key ? null : key))}
                      aria-expanded={expanded}
                    >
                      <SightingTimeRow>
                        <span className="clock">🕒 {formatSightingClock(s.seenAt)}</span>
                        {rel ? <span className="rel">• {rel}</span> : null}
                      </SightingTimeRow>
                      <SightingLoc>📍 {place}</SightingLoc>
                      {s.notes ? (
                        <SightingNote $expanded={expanded}>&ldquo;{s.notes}&rdquo;</SightingNote>
                      ) : (
                        <SightingNote $expanded={expanded} style={{ opacity: 0.65 }}>
                          No short note for this sighting.
                        </SightingNote>
                      )}
                      <ConfidenceChip $lvl={conf}>
                        {conf === "high" ? "🟢" : conf === "medium" ? "🟡" : "⚪"} {confLabel} confidence
                      </ConfidenceChip>
                    </SightingCardBody>

                    {expanded ? (
                      <SightingExpanded>
                        <SightingTimeRow style={{ marginBottom: 6 }}>
                          <span className="clock" style={{ fontSize: "0.8rem", color: "#64748b" }}>
                            {formatSightingFullTimestamp(s.seenAt)}
                          </span>
                        </SightingTimeRow>
                        {witnessRaw ? (
                          <SightingLoc style={{ marginBottom: 8 }}>
                            <strong style={{ color: "#0f172a" }}>Witness</strong> · {witnessDisplay}
                            {s.canHelp === false ? (
                              <span style={{ color: "#94a3b8", fontWeight: 600 }}> · prefers not to be contacted</span>
                            ) : !hasVisibleWitnessContact(s) ? (
                              <span style={{ color: "#94a3b8", fontWeight: 600 }}> · phone/email not shared</span>
                            ) : null}
                          </SightingLoc>
                        ) : null}
                        {s.photoUrl ? (
                          <SightingImageWrap>
                            <img src={s.photoUrl} alt="Sighting" />
                          </SightingImageWrap>
                        ) : null}
                        {s.notes ? (
                          <SightingNote $expanded style={{ marginTop: 4 }}>
                            {s.notes}
                          </SightingNote>
                        ) : null}
                        <SightingActions>
                          {mapsUrl ? (
                            <SightingPrimaryBtn type="button" onClick={() => window.open(mapsUrl, "_blank")}>
                              Open map
                            </SightingPrimaryBtn>
                          ) : null}
                          {s.canHelp !== false && hasVisibleWitnessContact(s) ? (
                            <SightingGhostBtn type="button" onClick={() => handleContactWitness(s)}>
                              Contact witness
                            </SightingGhostBtn>
                          ) : null}
                          <SightingGhostBtn type="button" onClick={() => handleOpenDetail(key)}>
                            Open details ↗
                          </SightingGhostBtn>
                        </SightingActions>
                      </SightingExpanded>
                    ) : null}
                  </SightingFloatCard>
                );
              })
            )}
          </SightingsScroll>

          {witnessSheet ? (
            <WitnessContactSheet>
              <p className="wcs-title">Witness contact</p>
              {witnessSheet.phone ? (
                <div className="wcs-row">
                  <span className="wcs-label">Phone</span>
                  <a className="wcs-value" href={telHref(witnessSheet.phone)}>
                    {witnessSheet.phone}
                  </a>
                </div>
              ) : null}
              {witnessSheet.email ? (
                <div className="wcs-row">
                  <span className="wcs-label">Email</span>
                  <a className="wcs-value" href={`mailto:${witnessSheet.email}`}>
                    {witnessSheet.email}
                  </a>
                </div>
              ) : null}
              <button type="button" className="wcs-close" onClick={() => setWitnessSheet(null)}>
                Done
              </button>
            </WitnessContactSheet>
          ) : null}
        </SightingsPanelInner>
      </SightingsPanelShell>
    </>,
    document.body
  );
}
