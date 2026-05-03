import styled from "styled-components";

export const StyledAddPetProfile = styled.main`
  min-height: 75vh;
  padding: 32px 16px 56px;
  background: #f7f7fb;

  .container {
    max-width: 980px;
    margin: 0 auto;
  }

  .header-row {
    margin-bottom: 16px;
  }

  .header-row h1 {
    margin: 0 0 6px;
    color: #4c5d72;
    font-size: 2rem;
  }

  .header-row p {
    margin: 0;
    color: #69788e;
    font-weight: 600;
  }

  .success-tick {
    margin-top: 6px !important;
    font-size: 1.3rem;
    color: #17a34a !important;
    font-weight: 800 !important;
    width: fit-content;
  }

  .error-line {
    margin-top: 6px !important;
    color: #cc2d5a !important;
    font-size: 0.92rem;
    font-weight: 600;
  }

  .profile-grid {
    display: grid;
    grid-template-columns: minmax(260px, 420px) 1fr;
    gap: 16px;
    margin-bottom: 16px;
  }

  .photo-card,
  .details-card,
  .info-card,
  .error-box {
    background: white;
    border-radius: 16px;
    border: 1px solid #ebedf4;
  }

  .photo-card {
    min-height: 280px;
    overflow: hidden;
  }

  .photo-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .placeholder {
    min-height: 280px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8a8a8a;
  }

  .details-card {
    padding: 12px;
    background: #d5f4eb;
  }

  .detail-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #ebfffa;
    border-radius: 10px;
    padding: 10px 12px;
    margin-bottom: 8px;
  }

  .detail-row span {
    color: #3f4f62;
    font-weight: 600;
  }

  .detail-row-right {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .detail-row strong {
    color: #1f2d3f;
  }

  .detail-input {
    border: 1px solid #c3d3de;
    border-radius: 6px;
    padding: 4px 8px;
    min-width: 160px;
  }

  .edit-btn {
    border: none;
    background: transparent;
    color: #48607d;
    cursor: pointer;
    font-size: 1rem;
    padding: 0;
  }

  .info-card {
    padding: 16px;
  }

  .info-card h2 {
    margin: 0 0 8px;
    color: #4c5d72;
    font-size: 1.2rem;
  }

  .info-card p {
    margin: 0;
    color: #5a6572;
    line-height: 1.55;
  }

  .about-editor textarea {
    width: 100%;
    min-height: 110px;
    border-radius: 10px;
    border: 1px solid #cfd8e6;
    padding: 10px;
    resize: vertical;
  }

  .actions-row {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }

  .save-btn {
    border: none;
    background: #0066ba;
    color: white;
    border-radius: 10px;
    padding: 10px 18px;
    font-weight: 700;
    cursor: pointer;
  }

  .save-btn:disabled {
    background: #9db4ce;
    cursor: not-allowed;
  }

  .blink {
    animation: blinkPulse 1s ease-in-out infinite;
  }

  @keyframes blinkPulse {
    0% {
      opacity: 0.35;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.35;
    }
  }

  .error-box {
    padding: 24px;
    text-align: center;
  }

  .error-box button {
    margin-top: 10px;
    border: none;
    border-radius: 10px;
    padding: 10px 14px;
    background: #0066ba;
    color: white;
    cursor: pointer;
  }

  @media (max-width: 820px) {
    .profile-grid {
      grid-template-columns: 1fr;
    }
  }
`;

