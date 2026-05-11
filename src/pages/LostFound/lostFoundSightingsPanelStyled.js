import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

export const SightingsBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  background: rgba(15, 23, 42, 0.38);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  animation: ${fadeIn} 0.28s ease both;
`;

export const SightingsPanelShell = styled.aside`
  position: fixed;
  z-index: 1210;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(430px, 100vw);
  max-width: 100vw;
  padding: 12px;
  box-sizing: border-box;
  pointer-events: none;
  display: flex;
  justify-content: flex-end;
  align-items: stretch;

  @media (max-width: 640px) {
    top: auto;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: auto;
    max-height: 88vh;
    padding: 0;
    align-items: flex-end;
    justify-content: center;
  }
`;

export const SightingsPanelInner = styled.div`
  pointer-events: auto;
  width: 100%;
  height: 100%;
  max-height: 100%;
  border-radius: 22px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    155deg,
    rgba(255, 255, 255, 0.82) 0%,
    rgba(248, 250, 252, 0.9) 45%,
    rgba(255, 251, 252, 0.88) 100%
  );
  border: 1px solid rgba(255, 255, 255, 0.65);
  box-shadow:
    0 24px 64px rgba(15, 23, 42, 0.18),
    0 0 0 1px rgba(255, 255, 255, 0.4) inset;
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);

  @media (max-width: 640px) {
    border-radius: 22px 22px 0 0;
    max-height: 88vh;
    height: min(88vh, 720px);
  }
`;

export const SightingsDragLayer = styled.div`
  flex: 0 0 auto;
  touch-action: none;
  cursor: grab;
  padding: 4px 0 0;
  display: flex;
  justify-content: center;

  &:active {
    cursor: grabbing;
  }

  .drag-pill {
    width: 44px;
    height: 5px;
    border-radius: 999px;
    background: rgba(148, 163, 184, 0.55);
  }

  @media (min-width: 641px) {
    display: none;
  }
`;

export const SightingsPanelHeader = styled.header`
  flex: 0 0 auto;
  padding: 14px 18px 10px;
  border-bottom: 1px solid rgba(226, 232, 240, 0.85);
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 10px 12px;
  align-items: start;

  .hdr-main {
    min-width: 0;
  }

  .hdr-drag {
    user-select: none;
    touch-action: none;
    cursor: grab;
    border-radius: 12px;
    margin: -4px;
    padding: 4px;

    &:active {
      cursor: grabbing;
    }
  }

  .hdr-title {
    margin: 0;
    font-family: Quicksand, system-ui, sans-serif;
    font-size: 1.12rem;
    font-weight: 900;
    color: #0f172a;
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .hdr-sub {
    margin: 6px 0 0;
    font-size: 0.8rem;
    font-weight: 600;
    color: #64748b;
    line-height: 1.35;
  }

  .hdr-close {
    border: none;
    background: rgba(241, 245, 249, 0.95);
    width: 40px;
    height: 40px;
    border-radius: 14px;
    font-size: 1.25rem;
    line-height: 1;
    cursor: pointer;
    color: #475569;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    touch-action: manipulation;
    transition:
      background 0.15s ease,
      transform 0.12s ease;

    &:hover {
      background: #fee2e2;
      color: #b91c1c;
      transform: scale(1.04);
    }
  }
`;

export const SightingsScroll = styled.div`
  flex: 1 1 auto;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 14px 14px 22px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(148, 163, 184, 0.45);
    border-radius: 999px;
  }
`;

export const SightingFloatCard = styled.article`
  margin-bottom: 12px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(226, 232, 240, 0.9);
  box-shadow:
    0 10px 28px rgba(15, 23, 42, 0.07),
    0 1px 0 rgba(255, 255, 255, 0.8) inset;
  overflow: hidden;
  transition:
    box-shadow 0.22s ease,
    transform 0.22s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow:
      0 16px 40px rgba(15, 23, 42, 0.11),
      0 1px 0 rgba(255, 255, 255, 0.85) inset;
    border-color: rgba(203, 213, 225, 0.95);
  }

  &[data-expanded="true"] {
    background: rgba(255, 255, 255, 0.92);
    box-shadow:
      0 20px 50px rgba(0, 102, 186, 0.12),
      0 0 0 1px rgba(240, 106, 138, 0.18);
  }
`;

export const SightingCardBody = styled.button`
  width: 100%;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 14px 16px 12px;
  font: inherit;
  color: inherit;
  display: block;
`;

export const SightingTimeRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 6px 10px;
  margin-bottom: 8px;
  font-size: 0.88rem;
  font-weight: 800;
  color: #0f172a;

  .clock {
    font-variant-numeric: tabular-nums;
    color: #0066ba;
  }

  .rel {
    font-weight: 700;
    color: #94a3b8;
    font-size: 0.82rem;
  }
`;

export const SightingLoc = styled.div`
  font-size: 0.86rem;
  font-weight: 700;
  color: #334155;
  line-height: 1.4;
  margin-bottom: 8px;
`;

export const SightingNote = styled.p`
  margin: 0 0 10px;
  font-size: 0.84rem;
  font-weight: 600;
  color: #475569;
  line-height: 1.45;
  display: -webkit-box;
  -webkit-line-clamp: ${(p) => (p.$expanded ? 20 : 2)};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const confTone = (lvl) => {
  const u = String(lvl || "").toLowerCase();
  if (u === "high") return { bg: "rgba(220, 252, 231, 0.95)", fg: "#166534", bd: "rgba(134, 239, 172, 0.85)" };
  if (u === "medium") return { bg: "rgba(254, 243, 199, 0.95)", fg: "#b45309", bd: "rgba(253, 224, 138, 0.9)" };
  if (u === "low") return { bg: "rgba(241, 245, 249, 0.95)", fg: "#475569", bd: "rgba(226, 232, 240, 0.95)" };
  return { bg: "rgba(241, 245, 249, 0.95)", fg: "#64748b", bd: "rgba(226, 232, 240, 0.95)" };
};

export const ConfidenceChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 900;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  background: ${(p) => confTone(p.$lvl).bg};
  color: ${(p) => confTone(p.$lvl).fg};
  border: 1px solid ${(p) => confTone(p.$lvl).bd};
`;

export const SightingExpanded = styled.div`
  padding: 0 16px 14px;
  border-top: 1px solid rgba(241, 245, 249, 0.95);
  animation: ${fadeIn} 0.25s ease both;
`;

export const SightingActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
`;

export const SightingGhostBtn = styled.button`
  border-radius: 12px;
  padding: 8px 12px;
  font-weight: 800;
  font-size: 0.78rem;
  cursor: pointer;
  border: 1px solid rgba(226, 232, 240, 0.95);
  background: rgba(248, 250, 252, 0.95);
  color: #334155;
  transition:
    background 0.15s ease,
    transform 0.12s ease;

  &:hover {
    background: #fff;
    transform: translateY(-1px);
  }
`;

export const SightingPrimaryBtn = styled.button`
  border-radius: 12px;
  padding: 8px 12px;
  font-weight: 800;
  font-size: 0.78rem;
  cursor: pointer;
  border: none;
  background: linear-gradient(135deg, #0066ba, #004e8f);
  color: #fff;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.06);
  }
`;

export const SightingImageWrap = styled.div`
  margin: 10px 0 12px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid rgba(226, 232, 240, 0.95);
  max-height: 200px;
  background: #e2e8f0;

  img {
    width: 100%;
    height: 100%;
    max-height: 200px;
    object-fit: cover;
    display: block;
  }
`;

export const EmptySightings = styled.div`
  text-align: center;
  padding: 28px 16px;
  font-weight: 700;
  color: #64748b;
  font-size: 0.92rem;
  line-height: 1.5;
`;

export const LoadingSightings = styled.div`
  text-align: center;
  padding: 32px 16px;
  font-weight: 800;
  color: #94a3b8;
  font-size: 0.9rem;
`;

export const WitnessContactSheet = styled.div`
  flex: 0 0 auto;
  margin: 0 12px 12px;
  padding: 14px 16px 16px;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(226, 232, 240, 0.95);
  box-shadow: 0 -12px 32px rgba(15, 23, 42, 0.08);
  display: grid;
  gap: 10px;

  .wcs-title {
    margin: 0;
    font-weight: 900;
    font-size: 0.9rem;
    color: #0f172a;
  }

  .wcs-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    align-items: center;
  }

  .wcs-label {
    font-size: 0.78rem;
    font-weight: 800;
    color: #64748b;
    min-width: 3.2rem;
  }

  .wcs-value {
    font-weight: 700;
    color: #0066ba;
    word-break: break-all;
  }

  .wcs-close {
    justify-self: end;
    margin-top: 4px;
    border: none;
    background: rgba(241, 245, 249, 0.95);
    padding: 8px 14px;
    border-radius: 12px;
    font-weight: 800;
    cursor: pointer;
    color: #475569;
  }
`;
