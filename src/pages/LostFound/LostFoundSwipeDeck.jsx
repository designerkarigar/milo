import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  formatLostFoundLastSeenLine,
  formatTimeSince,
  getLostFoundStableId,
  getSightingsApiReportId,
  haversineKm,
  hasVisibleReporterContact,
  normalizeSightingRecords,
  pickLostFoundSightingCount,
} from "../../utils/Functions/LostFound/lostFoundUtils";
import { fetchSightingsForReport } from "../../utils/Functions/LostFound/sightingsApi";
import { LostFoundPetPhoto } from "./LostFoundPetPhoto";

function truncate(text, max = 140) {
  const s = String(text || "").trim();
  if (s.length <= max) return s;
  return `${s.slice(0, max).trim()}…`;
}

function petEmoji(type) {
  const t = String(type || "").toUpperCase();
  if (t.includes("CAT")) return "🐱";
  if (t.includes("DOG")) return "🐶";
  if (t.includes("RABBIT") || t.includes("BUNNY")) return "🐇";
  if (t.includes("BIRD")) return "🐦";
  return "🐾";
}

function genderIcon(g) {
  const u = String(g || "").toLowerCase();
  if (u === "male" || u === "m") return "♂";
  if (u === "female" || u === "f") return "♀";
  return "◯";
}

function heroTitle(it, variant) {
  const name = String(it?.name || "").trim();
  const breed = String(it?.breed || "").trim();
  if (name && name.toLowerCase() !== "unknown") return name;
  if (breed && breed.toLowerCase() !== "unknown") return breed;
  return variant === "found" ? "Found friend" : "Missing friend";
}

function heroSub(it) {
  const locLine = formatLostFoundLastSeenLine(it);
  if (locLine && locLine !== "—") return `Near ${locLine}`;
  const d = String(it?.description || "").trim();
  if (d.length) return truncate(d, 96);
  return "Community alert · help reunite a family";
}

function metaFor(it, userCoords) {
  const city = it?.location?.city || it?.city || "—";
  const timeSince = formatTimeSince(it?.reportedAt || it?.upddt || it?.crdt);
  let distanceLabel = "—";
  if (userCoords && it?.location?.lat && it?.location?.long) {
    const km = haversineKm(userCoords, { lat: it.location.lat, long: it.location.long });
    if (typeof km === "number") distanceLabel = `${km.toFixed(1)} km`;
  }
  return { city, timeSince, distanceLabel };
}

export function LostFoundReportCard({
  variant,
  item,
  userCoords,
  defaultPhoto,
  sightingCount,
  onViewDetails,
  onReportSighting,
  onContactReporter,
  onNotifyNoContact,
  onNotifyNoId,
  rootProps = {},
}) {
  const { className = "", style, ...restRootProps } = rootProps;
  const displayVariant = variant === "found" || variant === "reunited" ? variant : "lost";
  const rowId = item ? getLostFoundStableId(item) : "";
  const embeddedSightingCount = item ? pickLostFoundSightingCount(item) : null;
  const sightCountDisplay = typeof sightingCount === "number" ? sightingCount : embeddedSightingCount ?? 0;
  const meta = metaFor(item, userCoords);

  return (
    <div
      className={`floating-card floating-card-top lf-card-v2 deck-surface-${displayVariant} ${className}`.trim()}
      style={style}
      {...restRootProps}
    >
      <div className="lf-card-decor" aria-hidden>
        <span className="lf-blob lf-blob-a" />
        <span className="lf-blob lf-blob-b" />
        <span className="lf-paw" />
      </div>

      <div className="lf-card-photo-wrap">
        <div className="floating-card-photo lf-photo-v2">
          <LostFoundPetPhoto record={item} fallbackSrc={defaultPhoto} alt={item?.name || "Pet"} />
          <div className="lf-photo-fade" aria-hidden />
        </div>

        <div className="lf-photo-overlays">
          <span className={`lf-pill-status lf-pill-${displayVariant}`}>
            {displayVariant === "lost" ? "🔴 LOST" : displayVariant === "found" ? "🟢 FOUND" : "🟣 REUNITED"}
          </span>
          <span className="lf-pill-active-search">
            {displayVariant === "reunited" ? "✨ Back home" : item?.verified ? "✨ Matched" : "🟡 Active search"}
          </span>
          {displayVariant === "lost" ? (
            <span className="lf-sightings-bubble lf-deck-interactive" aria-hidden>
              👀 {sightCountDisplay} sighting{sightCountDisplay === 1 ? "" : "s"} nearby
            </span>
          ) : null}
        </div>
      </div>

      <div className="floating-card-body lf-body-v2">
        <h3 className="lf-hero-title">{heroTitle(item, variant)}</h3>
        <p className="lf-hero-sub">{heroSub(item)}</p>
        <p className="lf-desc-v2">{truncate(item?.description, 140)}</p>

        <div className="lf-chip-row lf-deck-interactive">
          <span className="lf-chip">
            {petEmoji(item?.petType)} {String(item?.petType || "Pet").toUpperCase()}
          </span>
          <span className="lf-chip">
            {petEmoji(item?.breed || item?.petType)} {item?.breed || "—"}
          </span>
          <span className="lf-chip">⚪ {item?.color || "—"}</span>
          <span className="lf-chip">
            {genderIcon(item?.gender)} {item?.gender || "—"}
          </span>
          <span className="lf-chip">📍 {meta.city}</span>
          <span className="lf-chip">🕒 {meta.timeSince}</span>
          <span className="lf-chip">📏 {meta.distanceLabel}</span>
        </div>

        <button
          type="button"
          className="lf-link-details lf-deck-interactive"
          onPointerDown={(ev) => ev.stopPropagation()}
          onClick={() => (rowId ? onViewDetails(rowId) : onNotifyNoId?.())}
        >
          Open full report →
        </button>
      </div>

      <div
        className="floating-card-actions lf-actions-v2"
        onPointerDown={(ev) => ev.stopPropagation()}
        onPointerUp={(ev) => ev.stopPropagation()}
      >
        {displayVariant === "lost" ? (
          <>
            <button
              type="button"
              className="lf-btn-primary lf-deck-interactive"
              onPointerDown={(ev) => ev.stopPropagation()}
              onClick={() => {
                if (!rowId) {
                  onNotifyNoId?.();
                  return;
                }
                if (typeof onReportSighting === "function") {
                  onReportSighting(rowId);
                } else {
                  onViewDetails(rowId);
                }
              }}
            >
              👀 I saw this pet
            </button>
            <button
              type="button"
              className="lf-btn-ghost lf-deck-interactive"
              onPointerDown={(ev) => ev.stopPropagation()}
              onClick={() => {
                if (!hasVisibleReporterContact(item)) {
                  onNotifyNoContact?.();
                  return;
                }
                onContactReporter?.(item);
              }}
            >
              💬 Contact
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              className="lf-btn-primary lf-btn-found lf-deck-interactive"
              onPointerDown={(ev) => ev.stopPropagation()}
              onClick={() => (rowId ? onViewDetails(rowId) : onNotifyNoId?.())}
            >
              View details
            </button>
            <button
              type="button"
              className="lf-btn-ghost lf-deck-interactive"
              onPointerDown={(ev) => ev.stopPropagation()}
              onClick={() => {
                if (!hasVisibleReporterContact(item)) {
                  onNotifyNoContact?.();
                  return;
                }
                onContactReporter?.(item);
              }}
            >
              💬 Contact
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function LostFoundMovingStrip({
  variant,
  title,
  items,
  direction,
  userCoords,
  defaultPhoto,
  onViewDetails,
  onReportSighting,
  onContactReporter,
  onNotifyNoContact,
  onNotifyNoId,
}) {
  const sightingCountByApiReportIdRef = useRef(new Map());
  const sightingFetchInFlightRef = useRef(new Set());
  const [sightingCacheEpoch, bumpSightingCache] = useState(0);
  const len = items.length;

  useEffect(() => {
    if (variant !== "lost" || !len) return;

    let cancelled = false;
    items.forEach((item) => {
      const sightingsApiReportId = getSightingsApiReportId(item);
      if (!sightingsApiReportId) return;

      const map = sightingCountByApiReportIdRef.current;
      if (map.has(sightingsApiReportId)) return;
      if (sightingFetchInFlightRef.current.has(sightingsApiReportId)) return;

      sightingFetchInFlightRef.current.add(sightingsApiReportId);
      (async () => {
        try {
          const raw = await fetchSightingsForReport(sightingsApiReportId);
          const list = normalizeSightingRecords(raw);
          if (cancelled) return;
          map.set(sightingsApiReportId, list.length);
        } catch {
          if (cancelled) return;
          const row = items.find((it) => getSightingsApiReportId(it) === sightingsApiReportId) || null;
          map.set(sightingsApiReportId, pickLostFoundSightingCount(row) ?? 0);
        } finally {
          sightingFetchInFlightRef.current.delete(sightingsApiReportId);
          if (!cancelled) bumpSightingCache((n) => n + 1);
        }
      })();
    });

    return () => {
      cancelled = true;
    };
  }, [variant, items, len]);

  if (!len) {
    return (
      <section className={`moving-strip moving-strip-${variant}`} aria-labelledby={`moving-strip-${variant}-title`}>
        <div className="moving-strip-head">
          <h2 id={`moving-strip-${variant}-title`} className="moving-strip-title">
            {title}
          </h2>
          <span className="deck-count">0 pets</span>
        </div>
        <div className="deck-empty-inner">No {variant === "lost" ? "lost" : "found"} reports yet.</div>
      </section>
    );
  }

  const repeatsPerSet = Math.max(1, Math.ceil(6 / len));
  const stripSet = Array.from({ length: repeatsPerSet }).flatMap(() => items);
  const marqueeItems = [...stripSet, ...stripSet];

  return (
    <section className={`moving-strip moving-strip-${variant}`} aria-labelledby={`moving-strip-${variant}-title`}>
      <div className="moving-strip-head">
        <h2 id={`moving-strip-${variant}-title`} className="moving-strip-title">
          {title}
        </h2>
        <span className="deck-count">
          {len} pet{len === 1 ? "" : "s"}
        </span>
      </div>

      <div className="moving-strip-track-wrap">
        <div className={`moving-strip-track ${direction}`} aria-live="off">
          {marqueeItems.map((item, index) => {
            const id = getLostFoundStableId(item) || item?.uid || index;
            const sightingsApiReportId = variant === "lost" ? getSightingsApiReportId(item) : "";
            const fetchedSightingCount =
              sightingCacheEpoch >= 0 && sightingsApiReportId
                ? sightingCountByApiReportIdRef.current.get(sightingsApiReportId)
                : undefined;

            return (
              <div className="moving-strip-card" key={`${id}-${index}`}>
                <div className="lf-card-ambient lf-can-hover">
                  <LostFoundReportCard
                    variant={variant}
                    item={item}
                    userCoords={userCoords}
                    defaultPhoto={defaultPhoto}
                    sightingCount={fetchedSightingCount}
                    onViewDetails={onViewDetails}
                    onReportSighting={onReportSighting}
                    onContactReporter={onContactReporter}
                    onNotifyNoContact={onNotifyNoContact}
                    onNotifyNoId={onNotifyNoId}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function LostFoundSwipeDeck({
  variant,
  items,
  userCoords,
  defaultPhoto,
  onViewDetails,
  onReportSighting,
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
  /** GET /reports/:id/sightings lengths keyed by API report id (list rows often omit counts). */
  const sightingCountByApiReportIdRef = useRef(new Map());
  const sightingFetchInFlightRef = useRef(new Set());
  const [sightingCacheEpoch, bumpSightingCache] = useState(0);

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
      target.closest(
        ".floating-card-actions, .lf-deck-interactive, button, a, input, select, textarea"
      )
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

  const current = len ? items[safeIndex] : null;
  const peek = len > 1 && safeIndex + 1 < len ? items[safeIndex + 1] : null;

  const sightingsApiReportId =
    variant === "lost" && current ? getSightingsApiReportId(current) : "";

  useEffect(() => {
    if (!sightingsApiReportId) return;
    const map = sightingCountByApiReportIdRef.current;
    if (map.has(sightingsApiReportId)) return;
    if (sightingFetchInFlightRef.current.has(sightingsApiReportId)) return;
    sightingFetchInFlightRef.current.add(sightingsApiReportId);

    let cancelled = false;
    (async () => {
      try {
        const raw = await fetchSightingsForReport(sightingsApiReportId);
        const list = normalizeSightingRecords(raw);
        if (cancelled) return;
        map.set(sightingsApiReportId, list.length);
      } catch {
        if (cancelled) return;
        const row =
          items.find((it) => getSightingsApiReportId(it) === sightingsApiReportId) || null;
        map.set(sightingsApiReportId, pickLostFoundSightingCount(row) ?? 0);
      } finally {
        sightingFetchInFlightRef.current.delete(sightingsApiReportId);
        if (!cancelled) bumpSightingCache((n) => n + 1);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [variant, sightingsApiReportId, items]);

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

  const embeddedSightingCount = current ? pickLostFoundSightingCount(current) : null;
  const fetchedSightingCount =
    sightingCacheEpoch >= 0 && sightingsApiReportId
      ? sightingCountByApiReportIdRef.current.get(sightingsApiReportId)
      : undefined;
  const sightCountDisplay =
    typeof fetchedSightingCount === "number" ? fetchedSightingCount : embeddedSightingCount ?? 0;

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
          <div className="floating-card floating-card-peek lf-peek-v2" aria-hidden>
            <div className="floating-card-photo peek-photo">
              <LostFoundPetPhoto record={peek} fallbackSrc={defaultPhoto} alt="" />
            </div>
          </div>
        ) : null}

        <div className={`lf-card-ambient ${!isDragging ? "lf-can-hover" : ""}`}>
          <LostFoundReportCard
            variant={variant}
            item={current}
            userCoords={userCoords}
            defaultPhoto={defaultPhoto}
            sightingCount={sightCountDisplay}
            onViewDetails={onViewDetails}
            onReportSighting={onReportSighting}
            onContactReporter={onContactReporter}
            onNotifyNoContact={onNotifyNoContact}
            onNotifyNoId={onNotifyNoId}
            rootProps={{
              role: "application",
              "aria-roledescription": "carousel",
              "aria-label": variant === "lost" ? "Lost pets" : "Found pets",
              style: {
                transform: `translateX(${dragX}px) rotate(${dragX * 0.028}deg)`,
                transition: isDragging ? "none" : "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
                touchAction: "none",
              },
              onPointerDown,
              onPointerMove,
              onPointerUp,
              onPointerCancel,
            }}
          />
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
