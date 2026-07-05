import styled from "styled-components";

export const StyledLostFound = styled.main`
  @keyframes lfStatusPulse {
    0%,
    100% {
      box-shadow:
        0 0 0 0 rgba(254, 203, 2, 0.35),
        0 8px 22px rgba(15, 23, 42, 0.12);
    }
    50% {
      box-shadow:
        0 0 22px 4px rgba(254, 203, 2, 0.45),
        0 10px 28px rgba(15, 23, 42, 0.14);
    }
  }

  @keyframes lfFloaty {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }

  @keyframes lfMarqueeRightToLeft {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(-50%);
    }
  }

  @keyframes lfMarqueeLeftToRight {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0);
    }
  }

  width: 100%;
  min-height: 75vh;
  background: #ffffff;

  .nav {
    width: 100%;
    background-color: rgb(0, 102, 186);
  }

  .top {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgb(0, 102, 186);
  }

  .top-shade {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: rgb(0, 102, 186);
  }

  .top .nav {
    position: relative;
    z-index: 5;
    background-color: transparent;
  }

  .banner {
    position: relative;
    width: 100%;
    z-index: 4;
    display: flex;
    flex-direction: column;
    padding: 50px 16px 100px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .banner h1 {
    margin: 0;
    font-family: Quicksand;
    font-size: clamp(2rem, 5vw, 3.2rem);
    color: #fecb02;
  }

  .banner p {
    margin: 8px 0 0;
    color: rgba(255, 255, 255, 0.9);
    font-weight: 600;
  }

  .wave {
    z-index: 4;
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
    height: 102px;
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

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .lost-found-toolbar {
    width: 100%;
    margin: 0 auto 22px;
    padding: 20px 22px;
    box-sizing: border-box;
    border-radius: 20px;
    background: #ffffff;
    border: 1px solid #d9e3f2;
    box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lost-found-filter-panel {
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    margin: 0;
  }

  .search-row {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .search-input-wrap {
    flex: 1 1 auto;
    min-width: 280px;
    height: 48px;
    display: flex;
    align-items: center;
    border: 1px solid #d9e3f2;
    border-radius: 999px;
    background: #ffffff;
    transition:
      border-color 0.18s ease,
      box-shadow 0.18s ease;
  }

  .search-input-wrap:focus-within {
    border-color: #ef5f85;
    box-shadow: 0 0 0 3px rgba(239, 95, 133, 0.14);
  }

  .free-search-input {
    flex: 1 1 auto;
    width: 100%;
    min-width: 0;
    border: none;
    outline: none;
    background: transparent;
    color: #24324a;
    font: inherit;
    font-weight: 600;
    padding: 0 16px;
  }

  .free-search-input::placeholder {
    color: #66758f;
    font-weight: 500;
  }

  .search-buttons,
  .toolbar-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
  }

  .search-buttons {
    flex: 0 0 auto;
  }

  .lost-found-toolbar button {
    min-height: 44px;
    border-radius: 14px;
    padding: 0 16px;
    font-family: inherit;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition:
      transform 0.16s ease,
      border-color 0.18s ease,
      background 0.18s ease,
      color 0.18s ease,
      box-shadow 0.18s ease;
  }

  .lost-found-toolbar button:hover {
    transform: translateY(-1px);
  }

  .lost-found-toolbar .primary {
    border: 1px solid #ef5f85;
    background: #ef5f85;
    color: #ffffff;
    box-shadow: 0 10px 22px rgba(239, 95, 133, 0.2);
  }

  .lost-found-toolbar .filter-btn {
    border: 1px solid #d9e3f2;
    background: #111827;
    color: #ffffff;
  }

  .lost-found-toolbar .filter-btn.active {
    border-color: #111827;
    background: #ffffff;
    color: #111827;
    box-shadow: inset 0 0 0 1px #111827;
  }

  .lost-found-toolbar .outline {
    border: 1px solid #d9e3f2;
    background: #f8fafc;
    color: #24324a;
    box-shadow: none;
  }

  .lost-found-toolbar .outline:hover {
    border-color: #cbd5e1;
    background: #ffffff;
  }

  .advanced-filter-grid {
    display: grid;
    grid-template-columns: repeat(5, minmax(120px, 1fr));
    gap: 10px 12px;
    padding-top: 4px;
  }

  .filter-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
    min-width: 0;
  }

  .filter-field label {
    font-size: 0.68rem;
    font-weight: 800;
    color: #66758f;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  .filter-field input,
  .filter-field select {
    width: 100%;
    min-width: 0;
    height: 44px;
    box-sizing: border-box;
    border: 1px solid #d9e3f2;
    border-radius: 14px;
    background: #ffffff;
    color: #24324a;
    font: inherit;
    font-weight: 600;
    padding: 0 12px;
    outline: none;
  }

  .filter-field input:focus,
  .filter-field select:focus {
    border-color: #ef5f85;
    box-shadow: 0 0 0 3px rgba(239, 95, 133, 0.14);
  }

  .toolbar-actions {
    justify-content: flex-end;
    padding-top: 2px;
  }

  .lost-found-results-zone {
    width: 100%;
  }

  .lost-found-results-grid {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 24px;
    align-items: stretch;
  }

  .lost-found-result-card {
    min-width: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .lost-found-result-card .lf-card-ambient {
    width: 100%;
    max-width: none;
    margin: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
  }

  .lost-found-result-card .floating-card-top {
    height: 100%;
  }

  .lost-found-result-card .lf-card-v2 {
    display: flex;
    flex-direction: column;
    cursor: default;
    touch-action: manipulation;
  }

  .lost-found-result-card .lf-card-photo-wrap {
    flex: 0 0 auto;
  }

  .lost-found-result-card .floating-card-photo.lf-photo-v2 {
    height: 260px;
    min-height: 260px;
    max-height: 260px;
  }

  .lost-found-result-card .floating-card-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .lost-found-result-card .lf-body-v2 {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .lost-found-result-card .lf-hero-title {
    min-height: 44px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .lost-found-result-card .lf-hero-sub {
    min-height: 48px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .lost-found-result-card .lf-desc-v2 {
    min-height: 42px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .lost-found-result-card .lf-chip-row {
    min-height: 128px;
    align-content: flex-start;
  }

  .lost-found-result-card .lf-link-details {
    align-self: flex-start;
    margin-top: auto;
    padding-top: 12px;
  }

  .lost-found-result-card .lf-card-v2:active {
    cursor: default;
  }

  .lost-found-result-card .lf-actions-v2 {
    flex: 0 0 auto;
    margin-top: auto;
    min-height: 154px;
    box-sizing: border-box;
    border-top: 1px solid #e6edf5;
  }

  .lost-found-result-card .lf-actions-v2 .lf-btn-primary,
  .lost-found-result-card .lf-actions-v2 .lf-btn-ghost {
    min-height: 56px;
    height: 56px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .result-card-found .lf-card-ambient {
    background: radial-gradient(70% 60% at 50% 0%, rgba(167, 243, 208, 0.55) 0%, transparent 70%),
      radial-gradient(60% 50% at 80% 70%, rgba(125, 211, 252, 0.35) 0%, transparent 65%);
  }

  .result-card-reunited .lf-card-ambient {
    background: radial-gradient(70% 60% at 50% 0%, rgba(196, 181, 253, 0.5) 0%, transparent 70%),
      radial-gradient(60% 50% at 25% 75%, rgba(134, 239, 172, 0.32) 0%, transparent 65%);
  }

  .lost-found-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 14px;
    margin: 22px 0 6px;
  }

  .pagination-page {
    font-weight: 900;
    color: #40536b;
  }

  .lost-found-moving-zone {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100vw;
    margin-left: calc(50% - 50vw);
    margin-right: calc(50% - 50vw);
  }

  .moving-strip {
    border-radius: 0;
    padding: 18px 0 22px;
    box-sizing: border-box;
    overflow: hidden;
    border: none;
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
  }

  .moving-strip-lost {
    background: radial-gradient(120% 80% at 10% 0%, rgba(251, 113, 133, 0.35) 0%, transparent 55%),
      radial-gradient(90% 70% at 90% 20%, rgba(253, 186, 116, 0.32) 0%, transparent 50%),
      linear-gradient(165deg, rgba(255, 247, 252, 0.95) 0%, rgba(255, 255, 255, 0.88) 45%, #fafbff 100%);
  }

  .moving-strip-found {
    background: radial-gradient(120% 80% at 8% 0%, rgba(52, 211, 153, 0.28) 0%, transparent 55%),
      radial-gradient(90% 70% at 92% 18%, rgba(167, 243, 208, 0.35) 0%, transparent 50%),
      linear-gradient(165deg, rgba(240, 253, 250, 0.95) 0%, rgba(255, 255, 255, 0.9) 45%, #fafbff 100%);
  }

  .moving-strip-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    width: min(1180px, calc(100% - 32px));
    margin: 0 auto;
    padding: 0 0 12px;
  }

  .moving-strip-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 900;
    color: #0f172a;
    font-family: Quicksand, system-ui, sans-serif;
  }

  .moving-strip-lost .moving-strip-title {
    color: #be123c;
  }

  .moving-strip-found .moving-strip-title {
    color: #047857;
  }

  .moving-strip-track-wrap {
    width: 100%;
    overflow: hidden;
    padding: 10px 0 12px;
  }

  .moving-strip-track {
    display: flex;
    width: max-content;
    gap: 18px;
    will-change: transform;
    animation-duration: 42s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  .moving-strip-track.left-to-right {
    animation-name: lfMarqueeLeftToRight;
  }

  .moving-strip-track.right-to-left {
    animation-name: lfMarqueeRightToLeft;
  }

  .moving-strip-track-wrap:hover .moving-strip-track,
  .moving-strip-track-wrap:focus-within .moving-strip-track {
    animation-play-state: paused;
  }

  .moving-strip-card {
    flex: 0 0 clamp(280px, 31vw, 352px);
    width: clamp(280px, 31vw, 352px);
  }

  .moving-strip-card .lf-card-ambient {
    width: 100%;
    max-width: 352px;
    margin: 0;
  }

  .moving-strip-found .lf-card-ambient {
    background: radial-gradient(70% 60% at 50% 0%, rgba(167, 243, 208, 0.55) 0%, transparent 70%),
      radial-gradient(60% 50% at 80% 70%, rgba(125, 211, 252, 0.35) 0%, transparent 65%);
  }

  .moving-strip-card .lf-card-v2 {
    cursor: default;
    touch-action: manipulation;
  }

  .moving-strip-card .lf-card-v2:active {
    cursor: default;
  }

  @media (max-width: 720px) {
    .lost-found-moving-zone {
      gap: 18px;
    }

    .moving-strip {
      padding-top: 16px;
    }

    .moving-strip-head {
      width: calc(100% - 28px);
      padding-bottom: 10px;
    }

    .moving-strip-track {
      gap: 14px;
      animation-duration: 36s;
    }

    .moving-strip-card {
      flex-basis: min(82vw, 330px);
      width: min(82vw, 330px);
    }
  }

  .reunited-zone {
    margin-top: 28px;
    padding: 20px 18px 22px;
    border-radius: 28px;
    background: linear-gradient(
      165deg,
      rgba(220, 252, 231, 0.55) 0%,
      rgba(255, 255, 255, 0.95) 45%,
      #fafbff 100%
    );
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.65),
      0 14px 36px rgba(16, 185, 129, 0.12);
  }

  .reunited-zone-head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 14px;
    padding: 0 4px;
  }

  .reunited-zone-title {
    margin: 0;
    font-size: 1.15rem;
    font-weight: 900;
    color: #047857;
    font-family: Quicksand, system-ui, sans-serif;
  }

  .reunited-zone-sub {
    margin: 0;
    font-size: 0.88rem;
    font-weight: 700;
    color: #5b6770;
    max-width: 520px;
    line-height: 1.45;
  }

  .reunited-cards {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
  }

  .reunited-card {
    flex: 1 1 220px;
    max-width: 320px;
    min-width: 200px;
    border-radius: 18px;
    overflow: hidden;
    background: #fff;
    border: 1px solid rgba(226, 232, 240, 0.95);
    box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
  }

  .reunited-card-photo {
    height: 120px;
    background: #eef2f7;
  }

  .reunited-card-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .reunited-card-body {
    padding: 12px 14px 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  .reunited-card-badge {
    align-self: flex-start;
    font-size: 0.65rem;
    font-weight: 900;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 4px 10px;
    border-radius: 999px;
    background: linear-gradient(135deg, #22c55e, #059669);
    color: #fff;
  }

  .reunited-card-name {
    margin: 0;
    font-size: 1.05rem;
    font-weight: 900;
    color: #0f172a;
    font-family: Quicksand, system-ui, sans-serif;
  }

  .reunited-card-snippet {
    margin: 0;
    font-size: 0.82rem;
    font-weight: 600;
    color: #64748b;
    line-height: 1.4;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .reunited-card .pill {
    align-self: flex-start;
    margin-top: 4px;
  }

  .deck-column {
    border-radius: 32px;
    padding: 18px 14px 22px;
    box-sizing: border-box;
    border: none;
  }

  .deck-column.deck-lost {
    background: radial-gradient(120% 80% at 10% 0%, rgba(251, 113, 133, 0.35) 0%, transparent 55%),
      radial-gradient(90% 70% at 90% 20%, rgba(253, 186, 116, 0.32) 0%, transparent 50%),
      linear-gradient(165deg, rgba(255, 247, 252, 0.95) 0%, rgba(255, 255, 255, 0.88) 45%, #fafbff 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
  }

  .deck-column.deck-found {
    background: radial-gradient(120% 80% at 8% 0%, rgba(52, 211, 153, 0.28) 0%, transparent 55%),
      radial-gradient(90% 70% at 92% 18%, rgba(167, 243, 208, 0.35) 0%, transparent 50%),
      linear-gradient(165deg, rgba(240, 253, 250, 0.95) 0%, rgba(255, 255, 255, 0.9) 45%, #fafbff 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.65);
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
    font-size: 0.8rem;
    letter-spacing: 0.07em;
    padding: 8px 16px;
    border-radius: 999px;
    border: none;
    box-shadow: 0 10px 26px rgba(15, 23, 42, 0.12);
  }

  .deck-pill-lost {
    background: linear-gradient(135deg, #fb7185, #f43f5e);
    color: #fff;
  }

  .deck-pill-found {
    background: linear-gradient(135deg, #34d399, #10b981);
    color: #fff;
  }

  .deck-count {
    font-weight: 800;
    font-size: 0.85rem;
    color: #40536b;
  }

  .deck-stack-area {
    position: relative;
    min-height: 540px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 12px;
  }

  .lf-card-ambient {
    position: relative;
    z-index: 1;
    width: calc(100% - 4px);
    max-width: 352px;
    margin: 0 auto;
    padding: 10px;
    border-radius: 36px;
    background: radial-gradient(70% 60% at 50% 0%, rgba(255, 182, 193, 0.45) 0%, transparent 70%),
      radial-gradient(60% 50% at 20% 80%, rgba(196, 181, 253, 0.35) 0%, transparent 65%);
    filter: blur(0);
    transition:
      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
      filter 0.35s ease;
  }

  .deck-found .lf-card-ambient {
    background: radial-gradient(70% 60% at 50% 0%, rgba(167, 243, 208, 0.55) 0%, transparent 70%),
      radial-gradient(60% 50% at 80% 70%, rgba(125, 211, 252, 0.35) 0%, transparent 65%);
  }

  @media (hover: hover) {
    .lf-card-ambient.lf-can-hover:hover {
      transform: translateY(-6px) scale(1.01);
    }
  }

  .floating-card {
    border-radius: 28px 28px 22px 22px;
    overflow: hidden;
    border: none;
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    box-sizing: border-box;
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.85) inset,
      0 24px 50px rgba(15, 23, 42, 0.12),
      0 8px 20px rgba(240, 106, 138, 0.08);
  }

  .lf-card-v2 {
    position: relative;
    cursor: grab;
    user-select: none;
    -webkit-user-select: none;
  }

  .lf-card-v2:active {
    cursor: grabbing;
  }

  .lf-card-decor {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    overflow: hidden;
    border-radius: inherit;
  }

  .lf-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(28px);
    opacity: 0.45;
  }

  .lf-blob-a {
    width: 120px;
    height: 120px;
    background: #fecdd3;
    top: -40px;
    right: -20px;
  }

  .lf-blob-b {
    width: 100px;
    height: 100px;
    background: #ddd6fe;
    bottom: 120px;
    left: -30px;
  }

  .lf-paw {
    position: absolute;
    bottom: 18%;
    right: 8%;
    width: 36px;
    height: 36px;
    opacity: 0.12;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2311161f'%3E%3Cpath d='M12 14c-2 0-3.5-1.5-3.5-3.5S10 7 12 7s3.5 1.5 3.5 3.5S14 14 12 14zm-5-2.5c-.8 0-1.5-.7-1.5-1.5S6.2 8.5 7 8.5 8.5 9.2 8.5 10 7.8 11.5 7 11.5zm10 0c-.8 0-1.5-.7-1.5-1.5S15.2 8.5 16 8.5s1.5.7 1.5 1.5S16.8 11.5 16 11.5zM8 16.5c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm8 0c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z'/%3E%3C/svg%3E")
      center / contain no-repeat;
  }

  .floating-card-peek {
    position: absolute;
    left: 50%;
    top: 32px;
    width: calc(100% - 8px);
    max-width: 328px;
    transform: translateX(-50%) scale(0.9);
    opacity: 0.55;
    pointer-events: none;
    z-index: 0;
    filter: saturate(0.92) blur(0.5px);
    border-radius: 26px;
    overflow: hidden;
    border: none;
    box-shadow: 0 16px 36px rgba(15, 23, 42, 0.1);
  }

  .lf-peek-v2 {
    background: rgba(255, 255, 255, 0.55);
  }

  .floating-card-top {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: none;
    margin: 0;
  }

  .deck-surface-lost {
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.85) inset,
      0 28px 60px rgba(244, 63, 94, 0.14),
      0 12px 32px rgba(15, 23, 42, 0.1);
  }

  .deck-surface-found {
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.85) inset,
      0 28px 60px rgba(16, 185, 129, 0.14),
      0 12px 32px rgba(15, 23, 42, 0.1);
  }

  .deck-surface-reunited {
    box-shadow:
      0 1px 0 rgba(255, 255, 255, 0.85) inset,
      0 28px 60px rgba(124, 58, 237, 0.12),
      0 12px 32px rgba(15, 23, 42, 0.1);
  }

  .lf-card-photo-wrap {
    position: relative;
    z-index: 2;
  }

  .floating-card-photo {
    height: 228px;
    background: linear-gradient(180deg, #e0e7ff 0%, #fce7f3 100%);
    overflow: hidden;
    border-radius: 28px 28px 0 0;
  }

  .lf-photo-v2 {
    position: relative;
  }

  .lf-photo-fade {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 52%;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.55) 38%,
      rgba(255, 255, 255, 0.92) 100%
    );
    pointer-events: none;
  }

  .floating-card-photo.peek-photo {
    height: 176px;
    border-radius: 24px 24px 0 0;
  }

  .floating-card-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .lf-photo-overlays {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    pointer-events: none;
    z-index: 3;
  }

  .lf-pill-status {
    position: absolute;
    top: 12px;
    left: 12px;
    font-size: 0.72rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    padding: 7px 12px;
    border-radius: 999px;
    color: #fff;
    box-shadow: 0 10px 24px rgba(15, 23, 42, 0.2);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  }

  .lf-pill-lost {
    background: linear-gradient(135deg, #fb7185, #e11d48);
  }

  .lf-pill-found {
    background: linear-gradient(135deg, #4ade80, #059669);
  }

  .lf-pill-reunited {
    background: linear-gradient(135deg, #a78bfa, #7c3aed);
  }

  .lf-pill-active-search {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 0.62rem;
    font-weight: 900;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 7px 11px;
    border-radius: 999px;
    color: #422006;
    background: linear-gradient(135deg, rgba(255, 251, 235, 0.95), rgba(254, 243, 199, 0.98));
    border: 1px solid rgba(253, 224, 71, 0.65);
    animation: lfStatusPulse 2.8s ease-in-out infinite;
  }

  .lf-sightings-bubble {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 10px;
    font-size: 0.78rem;
    font-weight: 900;
    padding: 10px 14px;
    border-radius: 16px;
    color: #0f172a;
    background: rgba(255, 255, 255, 0.88);
    border: 1px solid rgba(255, 255, 255, 0.95);
    box-shadow: 0 14px 32px rgba(15, 23, 42, 0.12);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    animation: lfFloaty 4s ease-in-out infinite;
  }

  .floating-card-body {
    padding: 0;
    color: #11161f;
    position: relative;
    z-index: 2;
  }

  .lf-body-v2 {
    padding: 16px 16px 8px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(248, 250, 252, 0.95) 18%);
  }

  .lf-hero-title {
    margin: 0 0 6px;
    font-family: Quicksand, system-ui, sans-serif;
    font-size: clamp(1.35rem, 4.5vw, 1.65rem);
    font-weight: 900;
    letter-spacing: -0.03em;
    line-height: 1.15;
    color: #0f172a;
  }

  .lf-hero-sub {
    margin: 0 0 10px;
    font-size: 0.9rem;
    font-weight: 700;
    color: #475569;
    line-height: 1.4;
  }

  .lf-desc-v2 {
    margin: 0 0 12px;
    font-size: 0.86rem;
    line-height: 1.5;
    color: #64748b;
    font-weight: 600;
  }

  .lf-chip-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 10px;
  }

  .lf-chip {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 6px 10px;
    border-radius: 999px;
    font-size: 0.76rem;
    font-weight: 800;
    color: #1e293b;
    background: rgba(255, 255, 255, 0.82);
    border: 1px solid rgba(226, 232, 240, 0.95);
    box-shadow: 0 4px 12px rgba(15, 23, 42, 0.05);
  }

  .lf-link-details {
    display: inline-block;
    margin: 4px 0 2px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    font-weight: 800;
    font-size: 0.82rem;
    color: #0066ba;
    text-decoration: underline;
    text-underline-offset: 3px;
    font-family: inherit;
  }

  .lf-link-details:hover {
    color: #f06a8a;
  }

  .lf-actions-v2 {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 14px 16px 18px;
    border-top: 1px solid rgba(226, 232, 240, 0.65);
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.35) 0%, rgba(248, 250, 252, 0.92) 100%);
    position: relative;
    z-index: 3;
    touch-action: manipulation;
  }

  .lf-actions-v2 .lf-btn-primary,
  .lf-actions-v2 .lf-btn-ghost {
    width: 100%;
    border-radius: 999px;
    padding: 14px 16px;
    font-weight: 900;
    cursor: pointer;
    font-family: Quicksand, system-ui, sans-serif;
    font-size: 0.92rem;
    transition:
      transform 0.18s ease,
      box-shadow 0.22s ease,
      filter 0.2s ease;
  }

  .lf-btn-primary {
    border: none;
    color: #fff;
    background: linear-gradient(135deg, #f97316 0%, #f43f5e 45%, #a855f7 130%);
    box-shadow: 0 12px 28px rgba(244, 63, 94, 0.35);
  }

  .lf-btn-primary:hover {
    transform: translateY(-2px);
    filter: brightness(1.04);
    box-shadow: 0 16px 36px rgba(244, 63, 94, 0.42);
  }

  .lf-btn-found {
    background: linear-gradient(135deg, #10b981 0%, #0d9488 50%, #2563eb 130%);
    box-shadow: 0 12px 28px rgba(16, 185, 129, 0.32);
  }

  .lf-btn-found:hover {
    box-shadow: 0 16px 36px rgba(16, 185, 129, 0.4);
  }

  .lf-btn-ghost {
    background: rgba(255, 255, 255, 0.65);
    color: #334155;
    border: 1px solid rgba(203, 213, 225, 0.95);
    box-shadow: 0 6px 16px rgba(15, 23, 42, 0.06);
  }

  .lf-btn-ghost:hover {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.92);
  }

  .floating-card-actions button {
    flex: none;
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

  .pill:disabled,
  .primary:disabled {
    opacity: 0.45;
    cursor: not-allowed;
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

  @media (max-width: 1040px) {
    .search-row {
      align-items: stretch;
      flex-wrap: wrap;
    }

    .search-input-wrap {
      flex-basis: 100%;
    }

    .search-buttons,
    .toolbar-actions {
      justify-content: flex-start;
    }

    .advanced-filter-grid {
      grid-template-columns: repeat(3, minmax(130px, 1fr));
    }

    .lost-found-results-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 20px;
    }
  }

  @media (max-width: 620px) {
    .lost-found-toolbar {
      padding: 16px;
      border-radius: 18px;
    }

    .search-input-wrap {
      flex-basis: 100%;
      min-width: 0;
      border-radius: 16px;
    }

    .search-buttons,
    .toolbar-actions {
      display: grid;
      grid-template-columns: 1fr;
      width: 100%;
      gap: 8px;
    }

    .lost-found-toolbar button {
      width: 100%;
    }

    .advanced-filter-grid {
      grid-template-columns: 1fr;
    }

    .lost-found-results-grid {
      grid-template-columns: 1fr;
      gap: 16px;
    }

    .lost-found-result-card .floating-card-photo.lf-photo-v2 {
      height: 220px;
      min-height: 220px;
      max-height: 220px;
    }

    .lost-found-result-card .lf-chip-row {
      min-height: 0;
    }

    .lost-found-pagination {
      gap: 10px;
      flex-wrap: wrap;
    }
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

export const StyledLostFoundReunitedModal = styled(StyledLostFoundContactModal)`
  .reunion-field {
    margin-top: 14px;
  }

  .reunion-field label {
    display: block;
    font-size: 0.78rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #7a8794;
    margin-bottom: 6px;
  }

  .reunion-textarea {
    width: 100%;
    box-sizing: border-box;
    min-height: 88px;
    padding: 10px 12px;
    border-radius: 12px;
    border: 1px solid #d8e1ef;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 600;
    color: #11161f;
    resize: vertical;
  }

  .reunion-textarea:focus {
    outline: 2px solid rgba(240, 106, 138, 0.35);
    border-color: #f06a8a;
  }

  .reunion-photo-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    margin-top: 6px;
  }

  .reunion-photo-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 12px;
    border-radius: 12px;
    border: 1px solid #d8e1ef;
    background: #f6f8fc;
    font-weight: 800;
    font-size: 0.85rem;
    cursor: pointer;
    font-family: inherit;
    color: #40536b;
  }

  .reunion-photo-btn:hover {
    border-color: #f06a8a;
    color: #11161f;
  }

  .reunion-photo-preview {
    max-width: 100%;
    max-height: 140px;
    border-radius: 12px;
    object-fit: cover;
    border: 1px solid #ececf4;
  }

  .reunion-photo-clear {
    border: none;
    background: none;
    color: #0066ba;
    font-weight: 800;
    cursor: pointer;
    font-family: inherit;
    text-decoration: underline;
    font-size: 0.88rem;
  }
`;

