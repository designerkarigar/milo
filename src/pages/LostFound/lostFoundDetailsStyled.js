import styled from "styled-components";

export const StyledLostFoundDetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 420px) 1fr;
  gap: 16px;
  align-items: start;

  @media (max-width: 840px) {
    grid-template-columns: 1fr;
  }
`;

export const StyledLostFoundDetailAside = styled.div`
  .photo-card {
    position: relative;
    width: 100%;
    height: min(52vh, 520px);
    max-width: 520px;
    margin: 0 auto;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
    background: #f3f5f9;
  }

  .photo-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .sightings-launch-wrap {
    position: absolute;
    left: 12px;
    right: 12px;
    bottom: 12px;
    z-index: 4;
  }

  .sightings-launch-btn {
    width: 100%;
    border: none;
    cursor: pointer;
    border-radius: 16px;
    padding: 12px 16px;
    font-weight: 900;
    font-family: Quicksand, system-ui, sans-serif;
    font-size: 0.95rem;
    color: #0f172a;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(240, 249, 255, 0.92));
    border: 1px solid rgba(255, 255, 255, 0.85);
    box-shadow:
      0 12px 32px rgba(15, 23, 42, 0.18),
      0 0 0 1px rgba(255, 255, 255, 0.5) inset;
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition:
      transform 0.15s ease,
      box-shadow 0.2s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow:
        0 16px 40px rgba(0, 102, 186, 0.2),
        0 0 0 1px rgba(255, 255, 255, 0.6) inset;
    }

    &:active {
      transform: translateY(0);
    }

    &[data-loading="true"] {
      opacity: 0.85;
      pointer-events: none;
    }
  }

`;

export const StyledOwnerContextStrip = styled.div`
  width: 100%;
  margin-bottom: 16px;
  padding: 12px 16px;
  border-radius: 16px;
  background: linear-gradient(120deg, rgba(255, 251, 252, 0.95), rgba(240, 248, 255, 0.92));
  border: 1px solid rgba(226, 232, 240, 0.95);
  box-shadow: 0 10px 28px rgba(0, 102, 186, 0.08);
  font-size: 0.88rem;
  font-weight: 700;
  color: #40536b;
  line-height: 1.45;

  strong {
    color: #0066ba;
    font-weight: 900;
  }

  .strip-badge {
    display: inline-block;
    margin-right: 8px;
    padding: 2px 10px;
    border-radius: 999px;
    font-size: 0.68rem;
    font-weight: 900;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: linear-gradient(135deg, #f06a8a, #ec4899);
    color: #fff;
    vertical-align: middle;
  }
`;
