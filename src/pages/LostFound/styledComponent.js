import styled from "styled-components";

export const StyledLostFound = styled.main`
  width: 100%;
  min-height: 75vh;
  background: #ffffff;

  .top {
    position: relative;
    width: 100%;
    background: rgb(0, 102, 186);
    padding-bottom: 70px;
  }

  .nav {
    width: 100%;
    background: transparent;
  }

  .banner {
    padding: 62px 16px 0;
    text-align: center;
    color: #fecb02;
  }

  .banner h1 {
    margin: 0;
    font-family: Quicksand;
    font-size: 3.2rem;
  }

  .banner p {
    margin: 8px 0 0;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
  }

  .wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .wave svg {
    position: relative;
    display: block;
    width: calc(151% + 1.3px);
    height: 92px;
    transform: rotateY(180deg);
  }

  .wave .shape-fill {
    fill: #ffffff;
  }

  .content {
    width: 100%;
    max-width: 1180px;
    margin: 0 auto;
    padding: 26px 16px 62px;
  }

  .toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
    margin-bottom: 18px;
  }

  .toolbar-dual {
    align-items: flex-start;
  }

  .toolbar-tagline {
    margin: 0;
    flex: 1 1 260px;
    font-weight: 700;
    font-size: 0.92rem;
    color: #40536b;
    line-height: 1.45;
    max-width: 520px;
  }

  .toolbar-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: flex-end;
  }

  .toolbar .filters {
    display: flex;
    gap: 10px;
    align-items: center;
    flex-wrap: wrap;
  }

  .dual-deck {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    align-items: stretch;
  }

  @media (max-width: 900px) {
    .dual-deck {
      grid-template-columns: 1fr;
    }
  }

  .deck-column {
    border-radius: 28px;
    padding: 14px 12px 18px;
    box-sizing: border-box;
  }

  .deck-column.deck-lost {
    background: linear-gradient(
      165deg,
      rgba(254, 226, 226, 0.65) 0%,
      rgba(255, 255, 255, 0.92) 38%,
      #ffffff 100%
    );
    border: 2px solid rgba(220, 38, 38, 0.22);
  }

  .deck-column.deck-found {
    background: linear-gradient(
      165deg,
      rgba(220, 252, 231, 0.65) 0%,
      rgba(255, 255, 255, 0.92) 38%,
      #ffffff 100%
    );
    border: 2px solid rgba(22, 163, 74, 0.22);
  }

  .deck-column-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding: 0 4px;
  }

  .deck-pill {
    font-weight: 900;
    font-size: 0.82rem;
    letter-spacing: 0.08em;
    padding: 8px 14px;
    border-radius: 999px;
    border: 2px solid #11161f;
  }

  .deck-pill-lost {
    background: #dc2626;
    color: #fff;
    border-color: #7f1d1d;
  }

  .deck-pill-found {
    background: #16a34a;
    color: #fff;
    border-color: #14532d;
  }

  .deck-count {
    font-weight: 800;
    font-size: 0.85rem;
    color: #40536b;
  }

  .deck-stack-area {
    position: relative;
    min-height: 520px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 8px;
  }

  .floating-card {
    border-radius: 22px;
    overflow: hidden;
    border: 3px solid #11161f;
    background: #fff;
    box-sizing: border-box;
  }

  .floating-card-peek {
    position: absolute;
    left: 50%;
    top: 28px;
    width: calc(100% - 8px);
    max-width: 332px;
    transform: translateX(-50%) scale(0.93);
    opacity: 0.62;
    pointer-events: none;
    z-index: 0;
    filter: saturate(0.88);
    border-radius: 22px;
    overflow: hidden;
    border: 3px solid rgba(17, 22, 31, 0.35);
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
  }

  .floating-card-top {
    position: relative;
    z-index: 1;
    width: calc(100% - 8px);
    max-width: 340px;
    margin: 0 auto;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .floating-card-top:active {
    cursor: grabbing;
  }

  .deck-surface-lost {
    box-shadow:
      10px 14px 0 rgba(220, 38, 38, 0.16),
      0 18px 42px rgba(0, 0, 0, 0.14);
  }

  .deck-surface-found {
    box-shadow:
      -10px 14px 0 rgba(34, 197, 94, 0.16),
      0 18px 42px rgba(0, 0, 0, 0.14);
  }

  .deck-ribbon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 4;
    writing-mode: vertical-rl;
    text-orientation: mixed;
    color: #fff;
    font-weight: 900;
    font-size: 0.72rem;
    letter-spacing: 0.22em;
    padding: 16px 9px;
    pointer-events: none;
  }

  .deck-ribbon-lost {
    left: 0;
    background: linear-gradient(180deg, #ef4444, #b91c1c);
    border-radius: 0 14px 14px 0;
    box-shadow: 4px 0 14px rgba(185, 28, 28, 0.35);
  }

  .deck-ribbon-found {
    right: 0;
    background: linear-gradient(180deg, #22c55e, #15803d);
    border-radius: 14px 0 0 14px;
    box-shadow: -4px 0 14px rgba(21, 128, 61, 0.35);
  }

  .floating-card-photo {
    height: 220px;
    background: #eef2f7;
    overflow: hidden;
  }

  .floating-card-photo.peek-photo {
    height: 176px;
  }

  .floating-card-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .floating-card-body {
    padding: 14px 14px 10px;
    color: #11161f;
  }

  .floating-card-title-row {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: flex-start;
  }

  .floating-card-title-row h3 {
    margin: 0;
    font-family: Quicksand, sans-serif;
    font-size: 1.12rem;
    font-weight: 900;
    line-height: 1.2;
  }

  .floating-status-chip {
    flex-shrink: 0;
    font-size: 0.65rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    padding: 5px 9px;
    border-radius: 999px;
    background: #11161f;
    color: #fecb02;
  }

  .floating-desc {
    margin: 10px 0 12px;
    font-size: 0.87rem;
    line-height: 1.45;
    color: #40536b;
    font-weight: 600;
  }

  .floating-facts {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 12px;
  }

  .floating-facts li {
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
  }

  .fact-label {
    font-size: 0.62rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #7a8794;
  }

  .fact-val {
    font-size: 0.8rem;
    font-weight: 700;
    color: #11161f;
    word-break: break-word;
  }

  .floating-card-actions {
    display: flex;
    gap: 10px;
    padding: 12px 14px 14px;
    border-top: 1px solid #e8edf5;
    background: #fbfcfe;
    position: relative;
    z-index: 2;
    touch-action: manipulation;
  }

  .floating-card-actions button {
    flex: 1;
    border-radius: 999px;
    padding: 10px 12px;
    font-weight: 800;
    cursor: pointer;
    border: none;
    font-family: inherit;
    font-size: 0.88rem;
  }

  .floating-card-actions .btn-detail {
    background: #11161f;
    color: #fff;
  }

  .floating-card-actions .btn-contact {
    background: #f06a8a;
    color: #fff;
  }

  .deck-swipe-hint {
    text-align: center;
    font-size: 0.76rem;
    font-weight: 700;
    color: #5b6770;
    margin: 12px 10px 6px;
    line-height: 1.4;
  }

  .deck-arrow-row {
    display: flex;
    justify-content: center;
    gap: 18px;
    padding-bottom: 4px;
  }

  .deck-mini-arrow {
    width: 44px;
    height: 44px;
    border-radius: 50%;
    border: none;
    background: #11161f;
    color: #fff;
    font-size: 1.35rem;
    cursor: pointer;
    line-height: 1;
  }

  .deck-mini-arrow:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .deck-empty-inner {
    min-height: 220px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    color: #5b6770;
    padding: 24px 16px;
    text-align: center;
    font-size: 0.95rem;
    line-height: 1.45;
  }

  .pill {
    border: 1px solid #d8e1ef;
    background: #f6f8fc;
    color: #40536b;
    border-radius: 999px;
    padding: 8px 12px;
    font-weight: 700;
    cursor: pointer;
  }

  .pill.active {
    background: #11161f;
    color: white;
    border-color: #11161f;
  }

  .primary {
    border: none;
    border-radius: 10px;
    padding: 10px 14px;
    background: #f06a8a;
    color: white;
    font-weight: 800;
    cursor: pointer;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 16px;
  }

  .carousel {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .carousel-window {
    width: min(96vw, 960px);
    overflow: hidden;
  }

  .carousel-track {
    display: flex;
    transition: transform 0.55s ease-in-out;
    will-change: transform;
  }

  .carousel-slide {
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    padding: 0 8px;
    box-sizing: border-box;
  }

  .arrow-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: #11161f;
    color: white;
    font-size: 1.4rem;
    cursor: pointer;
  }

  .arrow-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .card {
    position: relative;
    width: 100%;
    height: 420px;
    max-width: 520px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
    background: #f3f5f9;
  }

  .card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 78px;
    padding: 0 16px;
    color: white;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.45);
  }

  .titleRow {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }

  .overlay h3 {
    margin: 0;
    font-size: 1.7rem;
    font-family: Quicksand;
  }

  .badge {
    padding: 6px 10px;
    border-radius: 999px;
    font-weight: 900;
    font-size: 0.78rem;
    border: 1px solid rgba(255, 255, 255, 0.35);
    background: rgba(0, 0, 0, 0.35);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .meta {
    margin-top: 6px;
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    max-width: 100%;
  }

  .meta span {
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.28);
    padding: 4px 10px;
    border-radius: 14px;
    font-size: 0.85rem;
    text-transform: capitalize;
    max-width: 100%;
  }

  .actions {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 18px;
    display: flex;
    justify-content: center;
    gap: 12px;
    padding: 0 12px;
    flex-wrap: wrap;
  }

  .actions button {
    border: none;
    border-radius: 999px;
    padding: 10px 14px;
    font-weight: 800;
    cursor: pointer;
    background: rgba(255, 255, 255, 0.92);
    color: #11161f;
    min-width: 150px;
    text-align: center;
  }

  .actions button.secondary {
    background: rgba(17, 22, 31, 0.82);
    color: white;
  }

  .empty,
  .loading {
    min-height: 320px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #5b6770;
    font-weight: 700;
  }
`;

export const StyledLostFoundContactModal = styled.div`
  .modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
    padding: 20px;
  }

  .modal-content {
    position: relative;
    width: 100%;
    max-width: 420px;
    max-height: 90vh;
    overflow-y: auto;
    background: #ffffff;
    border-radius: 20px;
    padding: 28px 22px 22px;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.22);
    font-family: Quicksand, system-ui, sans-serif;
  }

  .close-button {
    position: absolute;
    top: 12px;
    right: 12px;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: 50%;
    background: #f0f3f8;
    color: #40536b;
    font-size: 1.4rem;
    line-height: 1;
    cursor: pointer;
  }

  .modal-title {
    margin: 0 36px 6px 0;
    font-size: 1.45rem;
    color: #0066ba;
    font-weight: 700;
  }

  .modal-sub {
    margin: 0 0 18px;
    color: #5b6770;
    font-size: 0.95rem;
    line-height: 1.45;
  }

  .modal-empty {
    margin: 0 0 16px;
    color: #5b6770;
    font-size: 1rem;
    line-height: 1.45;
  }

  .fields {
    margin: 0;
  }

  .fields .row {
    margin-bottom: 14px;
  }

  .fields .row-highlight dd {
    font-size: 1.25rem;
    letter-spacing: 0.02em;
  }

  .fields dt {
    margin: 0 0 4px;
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #7a8794;
  }

  .fields dd {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 600;
    color: #11161f;
    word-break: break-word;
  }

  .actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  .actions .btn {
    flex: 1 1 auto;
    min-width: 120px;
    text-align: center;
    text-decoration: none;
    border-radius: 12px;
    padding: 10px 14px;
    font-weight: 800;
    font-size: 0.95rem;
    cursor: pointer;
    border: none;
    font-family: inherit;
  }

  .actions .btn.primary {
    background: #f06a8a;
    color: #ffffff;
  }

  .actions .btn.ghost {
    background: #f6f8fc;
    color: #40536b;
    border: 1px solid #d8e1ef;
  }

  .actions .copy-full {
    flex: 1 1 100%;
    min-width: 100%;
  }

  .actions .btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
`;

