import styled, { keyframes } from "styled-components";

const pulseGlow = keyframes`
  0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(240, 106, 138, 0.45); }
  50% { opacity: 0.98; box-shadow: 0 0 22px 4px rgba(0, 102, 186, 0.25); }
`;

const floaty = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
`;

const wiggle = keyframes`
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
`;

export const StyledLostFoundWizard = styled.div`
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding: 0 0 52px;
  position: relative;

  .wizard-shell {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    border: 3px solid #11161f;
    background: linear-gradient(145deg, #fff9fb 0%, #f4fbff 45%, #fffef8 100%);
    box-shadow:
      8px 8px 0 #11161f22,
      0 20px 50px rgba(240, 106, 138, 0.18);
  }

  .wizard-card {
    position: relative;
    padding: 26px 22px 28px;
    z-index: 1;
  }

  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    opacity: 0.55;
    pointer-events: none;
    z-index: 0;
  }

  .blob-a {
    width: 180px;
    height: 180px;
    background: #f06a8a;
    top: -60px;
    right: -40px;
  }

  .blob-b {
    width: 140px;
    height: 140px;
    background: #fecb02;
    bottom: 20%;
    left: -50px;
  }

  .blob-c {
    width: 120px;
    height: 120px;
    background: #0066ba;
    bottom: -30px;
    right: 10%;
  }

  .paw-rail {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-bottom: 14px;
    font-size: 1.25rem;
    animation: ${floaty} 4s ease-in-out infinite;
  }

  .step-meta {
    font-size: 0.78rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #0066ba;
    margin-bottom: 8px;
  }

  .wizard-title {
    margin: 0 0 10px;
    font-family: Quicksand, system-ui, sans-serif;
    font-size: clamp(1.45rem, 4vw, 2rem);
    color: #11161f;
    line-height: 1.15;
    font-weight: 900;
  }

  .wizard-lead {
    margin: 0 0 20px;
    color: #40536b;
    font-size: 1.02rem;
    line-height: 1.55;
    font-weight: 600;
  }

  .wizard-lead-step1 {
    color: #0066ba;
    font-weight: 700;
  }

  .kind-switch {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 20px;
  }

  .kind-pill {
    flex: 1;
    min-width: 140px;
    border: 3px solid #11161f;
    border-radius: 999px;
    padding: 12px 16px;
    font-weight: 900;
    font-family: Quicksand, sans-serif;
    cursor: pointer;
    background: #fff;
    color: #11161f;
    transition: transform 0.15s ease, background 0.15s ease;

    &:hover {
      transform: scale(1.02);
    }

    &.active-lost {
      background: #fecb02;
      animation: ${wiggle} 0.4s ease;
    }

    &.active-found {
      background: #f06a8a;
      color: #fff;
      animation: ${wiggle} 0.4s ease;
    }
  }

  .funky-banner {
    border: 3px dashed #0066ba;
    border-radius: 16px;
    padding: 14px 16px;
    margin-bottom: 18px;
    font-weight: 800;
    font-size: 0.98rem;
    color: #0f3059;
    background: linear-gradient(90deg, rgba(0, 102, 186, 0.08), rgba(254, 203, 2, 0.15));
    line-height: 1.45;

    &.pulse {
      animation: ${pulseGlow} 2.4s ease-in-out infinite;
    }
  }

  .ai-live-strip {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    padding: 10px 14px;
    border-radius: 999px;
    background: #11161f;
    color: #fecb02;
    font-weight: 900;
    font-size: 0.85rem;
    margin-bottom: 16px;
    letter-spacing: 0.04em;
  }

  .capture-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin: 18px 0;
    flex-wrap: wrap;
  }

  .icon-btn {
    width: 80px;
    height: 80px;
    border-radius: 22px;
    border: 3px solid #11161f;
    background: linear-gradient(145deg, #0066ba, #004e8f);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 4px 4px 0 #11161f;
    transition: transform 0.12s ease;

    &:hover:not(:disabled) {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0 #11161f;
    }

    &:disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }

    svg {
      font-size: 36px;
    }
  }

  .preview-wrap {
    margin-top: 16px;
    border-radius: 20px;
    overflow: hidden;
    border: 3px solid #11161f;
    background: #eee;
    max-height: 260px;
    box-shadow: 6px 6px 0 rgba(17, 22, 31, 0.12);
  }

  .preview-wrap img {
    width: 100%;
    height: 100%;
    max-height: 260px;
    object-fit: cover;
    display: block;
  }

  .optional-tag {
    display: inline-block;
    margin-left: 8px;
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #0066ba;
    background: rgba(0, 102, 186, 0.12);
    padding: 4px 10px;
    border-radius: 999px;
    vertical-align: middle;
  }

  .field-grid {
    display: grid;
    gap: 14px;
    grid-template-columns: 1fr;

    @media (min-width: 520px) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field.span-2 {
    grid-column: 1 / -1;
  }

  .label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
  }

  .field-label {
    font-weight: 900;
    font-size: 0.88rem;
    color: #11161f;
  }

  .ai-chip {
    font-size: 0.68rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #fff;
    background: linear-gradient(90deg, #0066ba, #f06a8a);
    padding: 5px 10px;
    border-radius: 999px;
    border: 2px solid #11161f;
  }

  .field input,
  .field select,
  .field textarea {
    width: 100%;
    padding: 12px 14px;
    border-radius: 14px;
    border: 2px solid #11161f;
    font-size: 1rem;
    font-family: inherit;
    box-sizing: border-box;
    background: #fff;
  }

  .field textarea {
    min-height: 110px;
    resize: vertical;
  }

  .field-error {
    color: #c41e3a;
    font-size: 0.82rem;
    font-weight: 800;
  }

  .error-banner {
    background: #ffeef2;
    border: 2px solid #f06a8a;
    color: #8b1538;
    padding: 12px 14px;
    border-radius: 14px;
    margin-bottom: 16px;
    font-weight: 700;
  }

  .warn-banner {
    background: #fff8e6;
    border: 2px solid #fecb02;
    color: #5c4a10;
    padding: 12px 14px;
    border-radius: 14px;
    margin-bottom: 16px;
    font-weight: 700;
  }

  .ai-insight {
    border: 3px solid #11161f;
    border-radius: 18px;
    padding: 16px;
    margin-bottom: 18px;
    background: #fff;
    font-size: 0.92rem;
    box-shadow: 4px 4px 0 #fecb0288;

    strong {
      color: #0066ba;
    }

    ul {
      margin: 8px 0 0;
      padding-left: 18px;
    }
  }

  .progress {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
    flex-wrap: wrap;
    padding: 0 8px;
  }

  .progress-dot {
    flex: 1;
    min-width: 48px;
    height: 10px;
    border-radius: 99px;
    border: 2px solid #11161f;
    background: #fff;

    &.done {
      background: linear-gradient(90deg, #fecb02, #f06a8a);
    }

    &.current {
      background: #0066ba;
    }
  }

  .nav-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    margin-top: 24px;
    flex-wrap: wrap;
  }

  .btn {
    border-radius: 999px;
    padding: 12px 22px;
    font-weight: 900;
    cursor: pointer;
    border: 3px solid #11161f;
    font-family: Quicksand, sans-serif;
    font-size: 1rem;
    transition: transform 0.12s ease;
  }

  .btn:hover:not(:disabled) {
    transform: translate(-1px, -1px);
  }

  .btn-ghost {
    background: #fff;
    color: #11161f;
  }

  .btn-primary {
    background: linear-gradient(135deg, #f06a8a, #ff8fb3);
    color: #ffffff;
    min-width: 140px;
    box-shadow: 4px 4px 0 #11161f;
  }

  .btn-primary:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
  }

  .btn-skip {
    background: #e8fff3;
    color: #0d5c3b;
    border-color: #11161f;
  }

  .btn-outline {
    background: #fff;
    color: #0066ba;
    box-shadow: 3px 3px 0 #11161f33;
  }

  .btn-outline:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  .success-panel {
    text-align: center;
    padding: 8px 8px 8px;

    .wizard-title {
      margin-top: 0;
    }

    p {
      color: #334155;
      font-size: 1.05rem;
      line-height: 1.6;
      margin: 0 auto 22px;
      font-weight: 600;
      max-width: 520px;
    }
  }
`;
