import styled, { keyframes } from "styled-components";

const drift = keyframes`
  0%, 100% { transform: translateY(0) rotate(-1deg); }
  50% { transform: translateY(-8px) rotate(1deg); }
`;

const shimmer = keyframes`
  0% { background-position: 0% 50%; }
  100% { background-position: 200% 50%; }
`;

export const StyledLostFoundSighting = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  padding: 0 0 48px;
  position: relative;

  .sight-toolbar {
    margin-bottom: 18px;
    display: flex;
    justify-content: flex-start;
  }

  .sight-back {
    border: 3px solid #11161f;
    border-radius: 999px;
    padding: 10px 18px;
    font-weight: 900;
    font-family: Quicksand, system-ui, sans-serif;
    cursor: pointer;
    background: linear-gradient(135deg, #fecb02 0%, #ffe066 100%);
    color: #11161f;
    box-shadow: 4px 4px 0 #11161f;
    transition: transform 0.12s ease, box-shadow 0.12s ease;

    &:hover {
      transform: translate(-2px, -2px);
      box-shadow: 6px 6px 0 #11161f;
    }

    &:active {
      transform: translate(1px, 1px);
      box-shadow: 3px 3px 0 #11161f;
    }
  }

  .sight-shell {
    position: relative;
    overflow: hidden;
    border-radius: 28px;
    border: 3px solid #11161f;
    background: linear-gradient(155deg, #fff5fb 0%, #f0f8ff 42%, #fffbeb 100%);
    box-shadow:
      10px 10px 0 rgba(240, 106, 138, 0.35),
      0 22px 56px rgba(0, 102, 186, 0.14);
  }

  .sight-blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(44px);
    opacity: 0.52;
    pointer-events: none;
    z-index: 0;
  }

  .sight-blob-a {
    width: 200px;
    height: 200px;
    background: #f06a8a;
    top: -70px;
    right: -50px;
  }

  .sight-blob-b {
    width: 160px;
    height: 160px;
    background: #0066ba;
    bottom: 10%;
    left: -60px;
  }

  .sight-blob-c {
    width: 130px;
    height: 130px;
    background: #fecb02;
    bottom: -40px;
    right: 12%;
  }

  .sight-card {
    position: relative;
    z-index: 1;
    padding: 24px 20px 26px;
  }

  .sight-rail {
    display: flex;
    gap: 10px;
    justify-content: center;
    margin-bottom: 12px;
    font-size: 1.35rem;
    animation: ${drift} 3.8s ease-in-out infinite;
  }

  .sight-kicker {
    font-size: 0.76rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    text-align: center;
    background: linear-gradient(90deg, #0066ba, #f06a8a, #fecb02);
    background-size: 200% auto;
    animation: ${shimmer} 6s linear infinite;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    margin-bottom: 8px;
  }

  .sight-title {
    margin: 0 0 8px;
    font-family: Quicksand, system-ui, sans-serif;
    font-size: clamp(1.35rem, 4vw, 1.85rem);
    font-weight: 900;
    color: #11161f;
    text-align: center;
    line-height: 1.15;
  }

  .sight-lead {
    margin: 0 0 22px;
    text-align: center;
    font-weight: 700;
    font-size: 0.96rem;
    color: #40536b;
    line-height: 1.5;
    padding: 0 8px;
  }

  .sight-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }

  @media (max-width: 620px) {
    .sight-grid {
      grid-template-columns: 1fr;
    }
  }

  .sight-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
  }

  .sight-field.span-2 {
    grid-column: 1 / -1;
  }

  .sight-label {
    font-size: 0.72rem;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 0.07em;
    color: #0066ba;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .sight-label-badge {
    font-size: 0.85rem;
    line-height: 1;
  }

  .sight-label-sub {
    font-weight: 700;
    color: #94a3b8;
    text-transform: none;
    letter-spacing: 0;
    margin-left: 4px;
  }

  .sight-input,
  .sight-select,
  .sight-textarea {
    width: 100%;
    box-sizing: border-box;
    padding: 12px 14px;
    border-radius: 14px;
    border: 3px solid #11161f;
    font-family: inherit;
    font-size: 0.95rem;
    font-weight: 600;
    background: #ffffff;
    color: #11161f;
    box-shadow: 4px 4px 0 rgba(17, 22, 31, 0.08);
    transition:
      border-color 0.15s ease,
      box-shadow 0.15s ease,
      transform 0.12s ease;

    &::placeholder {
      color: #94a3b8;
      font-weight: 600;
    }

    &:focus {
      outline: none;
      border-color: #f06a8a;
      box-shadow:
        4px 4px 0 rgba(240, 106, 138, 0.45),
        0 0 0 3px rgba(0, 102, 186, 0.2);
      transform: translate(-1px, -1px);
    }
  }

  .sight-select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%2311161f'%3E%3Cpath d='M4 6l4 4 4-4'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    padding-right: 40px;
  }

  .sight-textarea {
    min-height: 120px;
    resize: vertical;
    line-height: 1.45;
  }

  .sight-photo-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    align-items: center;
    margin-top: 4px;
  }

  .sight-photo-hint {
    width: 100%;
    margin: 0;
    font-size: 0.82rem;
    font-weight: 600;
    color: #64748b;
    line-height: 1.4;
  }

  .sight-capture-row {
    display: flex;
    justify-content: flex-start;
    gap: 14px;
    flex-wrap: wrap;
  }

  .sight-icon-btn {
    width: 72px;
    height: 72px;
    border-radius: 18px;
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
      font-size: 32px;
    }
  }

  .sight-photo-clear {
    border: none;
    background: transparent;
    font-weight: 800;
    font-size: 0.85rem;
    color: #0066ba;
    cursor: pointer;
    text-decoration: underline;
    text-underline-offset: 3px;
    padding: 4px 0;

    &:hover {
      color: #f06a8a;
    }
  }

  .sight-preview-wrap {
    margin-top: 12px;
    border-radius: 18px;
    overflow: hidden;
    border: 3px solid #11161f;
    background: #e2e8f0;
    max-height: 220px;
    box-shadow: 4px 4px 0 rgba(17, 22, 31, 0.1);
  }

  .sight-preview-wrap img {
    width: 100%;
    height: 100%;
    max-height: 220px;
    object-fit: cover;
    display: block;
  }

  .sight-checkbox-card {
    margin-top: 18px;
    padding: 14px 16px;
    border-radius: 18px;
    border: 3px dashed #0066ba;
    background: linear-gradient(135deg, rgba(0, 102, 186, 0.06), rgba(254, 203, 2, 0.12));
    display: flex;
    align-items: flex-start;
    gap: 12px;
    cursor: pointer;
    transition: border-color 0.15s ease, transform 0.12s ease;

    &:hover {
      border-style: solid;
      border-color: #f06a8a;
      transform: scale(1.01);
    }
  }

  .sight-checkbox-card input {
    width: 22px;
    height: 22px;
    margin-top: 2px;
    accent-color: #16a34a;
    cursor: pointer;
    flex-shrink: 0;
  }

  .sight-checkbox-copy strong {
    display: block;
    font-family: Quicksand, system-ui, sans-serif;
    font-size: 1.05rem;
    font-weight: 900;
    color: #11161f;
    margin-bottom: 4px;
  }

  .sight-checkbox-copy span {
    font-size: 0.88rem;
    font-weight: 600;
    color: #40536b;
    line-height: 1.4;
  }

  .sight-actions {
    margin-top: 22px;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    flex-wrap: wrap;
  }

  .sight-submit {
    border: 3px solid #11161f;
    border-radius: 999px;
    padding: 14px 28px;
    font-weight: 900;
    font-family: Quicksand, system-ui, sans-serif;
    font-size: 1rem;
    cursor: pointer;
    background: linear-gradient(135deg, #f06a8a 0%, #ec4899 55%, #f97316 160%);
    color: #ffffff;
    box-shadow: 6px 6px 0 #11161f;
    transition: transform 0.12s ease, box-shadow 0.12s ease, filter 0.12s ease;

    &:hover:not(:disabled) {
      transform: translate(-2px, -2px);
      box-shadow: 8px 8px 0 #11161f;
      filter: brightness(1.03);
    }

    &:active:not(:disabled) {
      transform: translate(2px, 2px);
      box-shadow: 4px 4px 0 #11161f;
    }

    &:disabled {
      opacity: 0.55;
      cursor: not-allowed;
      box-shadow: 4px 4px 0 #11161f66;
    }
  }

  .sight-mini-note {
    margin-top: 14px;
    font-size: 0.8rem;
    font-weight: 700;
    color: #64748b;
    text-align: center;
    line-height: 1.45;
  }
`;
