import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  formatTimeSince,
  getLostFoundStableId,
  getNormalizedLostFoundStatus,
  haversineKm,
  hasVisibleReporterContact,
} from "../../utils/Functions/LostFound/lostFoundUtils";
import { LostFoundPetPhoto } from "./LostFoundPetPhoto";

function truncate(text, max = 140) {
  const s = String(text || "").trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max).trim()}…`;
}

export function LostFoundSwipeDeck({
  variant,
  items,
  userCoords,
  defaultPhoto,
  onViewDetails,
  onContactReporter,
  onNotifyNoContact,
  onNotifyNoId,
}) {
  const [index, setIndex] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragXRef = useRef(0);
  const dragging = useRef(false);
  const startX = useRef(0);

  useEffect(() => {
    dragXRef.current = dragX;
  }, [dragX]);

  const len = items.length;
  const safeIndex = len ? Math.min(index, len - 1) : 0;

  useEffect(() => {
    setIndex(0);
  }, [items]);

  const goNext = useCallback(() => {
    setIndex((i) => Math.min(len - 1, i + 1));
  }, [len]);

  const goPrev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const endDrag = useCallback(() => {
    const threshold = 76;
    const dx = dragXRef.current;
    if (variant === "lost") {
      if (dx < -threshold) goNext();
      else if (dx > threshold) goPrev();
    } else {
      if (dx > threshold) goNext();
      else if (dx < -threshold) goPrev();
    }
    setDragX(0);
    dragging.current = false;
    setIsDragging(false);
  }, [variant, goNext, goPrev]);

  const onPointerDown = (e) => {
    if (!len) return;
    const target = e.target;
    if (
      target &&
      typeof target.closest === "function" &&
      target.closest(".floating-card-actions, button, a, input, select, textarea")
    ) {
      return;
    }
    dragging.current = true;
    setIsDragging(true);
    startX.current = e.clientX;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const onPointerMove = (e) => {
    if (!dragging.current || !len) return;
    setDragX(e.clientX - startX.current);
  };

  const onPointerUp = (e) => {
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if (!dragging.current) return;
    endDrag();
  };

  const onPointerCancel = () => {
    dragging.current = false;
    setDragX(0);
    setIsDragging(false);
  };

  const metaFor = (it) => {
    const city = it?.location?.city || it?.city || "—";
    const timeSince = formatTimeSince(it?.reportedAt || it?.upddt || it?.crdt);
    let distanceLabel = "—";
    if (userCoords && it?.location?.lat && it?.location?.long) {
      const km = haversineKm(userCoords, { lat: it.location.lat, long: it.location.long });
      if (typeof km === "number") distanceLabel = `${km.toFixed(1)} km`;
    }
    const status =
      getNormalizedLostFoundStatus(it) || String(it?.status || "").trim().toUpperCase();
    const title =
      status === "FOUND" ? `Found: ${it?.name || "Unknown"}` : `Lost: ${it?.name || "Unknown"}`;
    return { city, timeSince, distanceLabel, title };
  };

  const current = len ? items[safeIndex] : null;
  const peek = len > 1 && safeIndex + 1 < len ? items[safeIndex + 1] : null;

  const swipeHint =
    variant === "lost"
      ? "Swipe left for next · swipe right for previous"
      : "Swipe right for next · swipe left for previous";

  if (!len) {
    return (
      <div className={`deck-column deck-${variant}`}>
        <div className="deck-column-head">
          <span className={`deck-pill deck-pill-${variant}`}>{variant === "lost" ? "Lost" : "Found"}</span>
          <span className="deck-count">0 pets</span>
        </div>
        <div className="deck-empty-inner">No {variant === "lost" ? "lost" : "found"} reports yet.</div>
      </div>
    );
  }

  const rowId = current ? getLostFoundStableId(current) : "";

  return (
    <div className={`deck-column deck-${variant}`}>
      <div className="deck-column-head">
        <span className={`deck-pill deck-pill-${variant}`}>{variant === "lost" ? "Lost" : "Found"}</span>
        <span className="deck-count">
          {safeIndex + 1} / {len}
        </span>
      </div>

      <div className="deck-stack-area">
        {peek ? (
          <div className="floating-card floating-card-peek" aria-hidden>
            <div className="floating-card-photo peek-photo">
              <LostFoundPetPhoto record={peek} fallbackSrc={defaultPhoto} alt="" />
            </div>
          </div>
        ) : null}

        <div
          role="application"
          aria-roledescription="carousel"
          aria-label={variant === "lost" ? "Lost pets" : "Found pets"}
          className={`floating-card floating-card-top deck-surface-${variant}`}
          style={{
            transform: `translateX(${dragX}px) rotate(${dragX * 0.035}deg)`,
            transition: isDragging ? "none" : "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
            touchAction: "none",
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
        >
          <span className={`deck-ribbon deck-ribbon-${variant}`}>{variant === "lost" ? "LOST" : "FOUND"}</span>

          <div className="floating-card-photo">
            <LostFoundPetPhoto record={current} fallbackSrc={defaultPhoto} alt={current?.name || "Pet"} />
          </div>

          <div className="floating-card-body">
            <div className="floating-card-title-row">
              <h3>{metaFor(current).title}</h3>
              <span className="floating-status-chip">{current?.verified ? "Matched" : "Active"}</span>
            </div>
            <p className="floating-desc">{truncate(current?.description, 160)}</p>
            <ul className="floating-facts">
              <li>
                <span className="fact-label">Type</span>
                <span className="fact-val">{String(current?.petType || "—").toUpperCase()}</span>
              </li>
              <li>
                <span className="fact-label">Breed</span>
                <span className="fact-val">{current?.breed || "Unknown"}</span>
              </li>
              <li>
                <span className="fact-label">Color</span>
                <span className="fact-val">{current?.color || "—"}</span>
              </li>
              <li>
                <span className="fact-label">Gender</span>
                <span className="fact-val">{current?.gender || "—"}</span>
              </li>
              <li>
                <span className="fact-label">Area</span>
                <span className="fact-val">{metaFor(current).city}</span>
              </li>
              <li>
                <span className="fact-label">Posted</span>
                <span className="fact-val">{metaFor(current).timeSince}</span>
              </li>
              <li>
                <span className="fact-label">Distance</span>
                <span className="fact-val">{metaFor(current).distanceLabel}</span>
              </li>
            </ul>
          </div>

          <div
            className="floating-card-actions"
            onPointerDown={(ev) => ev.stopPropagation()}
            onPointerUp={(ev) => ev.stopPropagation()}
          >
            <button
              type="button"
              className="btn-detail"
              onPointerDown={(ev) => ev.stopPropagation()}
              onClick={() => (rowId ? onViewDetails(rowId) : onNotifyNoId?.())}
            >
              View details
            </button>
            <button
              type="button"
              className="btn-contact"
              onPointerDown={(ev) => ev.stopPropagation()}
              onClick={() => {
                if (!hasVisibleReporterContact(current)) {
                  onNotifyNoContact?.();
                  return;
                }
                onContactReporter(current);
              }}
            >
              Contact
            </button>
          </div>
        </div>
      </div>

      <p className="deck-swipe-hint">{swipeHint}</p>

      <div className="deck-arrow-row">
        <button type="button" className="deck-mini-arrow" onClick={goPrev} disabled={safeIndex <= 0} aria-label="Previous">
          ‹
        </button>
        <button
          type="button"
          className="deck-mini-arrow"
          onClick={goNext}
          disabled={safeIndex >= len - 1}
          aria-label="Next"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default LostFoundSwipeDeck;
