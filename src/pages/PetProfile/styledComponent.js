import styled from "styled-components";

export const StyledPetProfile = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: white;

  .pet-profile-nav-con {
    width: 100%;
    background-color: #0066ba;
  }

  .pet-profile-main-con {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 0px;
    align-items: center;
    background-color: white;
    min-height: 100vh;
  }

  .pet-profile-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .pet-profile-wave svg {
    position: relative;
    display: block;
    width: calc(154% + 1.3px);
    height: 45px;
  }

  .pet-profile-wave .shape-fill {
    fill: rgb(0, 102, 186);
  }

  .pet-profile-container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 40px 20px;
    position: relative;
    z-index: 1;
  }

  .loading-container,
  .error-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    gap: 20px;

    h2 {
      font-family: Quicksand;
      color: #666;
      font-size: 1.5rem;
    }
  }

  .pet-profile-header {
    text-align: center;
    margin-bottom: 40px;
    position: relative;

    .back-button {
      position: absolute;
      left: 0;
      top: 0;
      background: #f06a8a;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 600;
      font-family: Quicksand;
      transition: all 0.3s ease;

      &:hover {
        background: #e05a7a;
        transform: translateX(-5px);
      }

      @media (max-width: 768px) {
        position: relative;
        margin-bottom: 20px;
      }
    }

    .pet-name-title {
      font-family: Quicksand;
      font-size: 3.5rem;
      font-weight: 700;
      color: #2c3e50;
      margin: 0;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

      @media (max-width: 768px) {
        font-size: 2.5rem;
      }
    }
  }

  .pet-profile-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    margin-top: 30px;

    @media (max-width: 1024px) {
      grid-template-columns: 1fr;
      gap: 30px;
    }
  }

  .pet-image-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .pet-main-image {
    width: 100%;
    height: 500px;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    @media (max-width: 768px) {
      height: 350px;
    }
  }

  .pet-photos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 15px;

    .pet-photo-item {
      aspect-ratio: 1;
      border-radius: 15px;
      overflow: hidden;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
      background: #f0f0f0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .pet-details-section {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .pet-badges {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 10px;
  }

  .badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    border-radius: 25px;
    font-size: 0.9rem;
    font-weight: 600;
    font-family: Quicksand;

    svg {
      font-size: 1rem;
    }

    &.verified-badge {
      background: #e8f5e9;
      color: #4caf50;
    }

    &.adoption-badge {
      background: #fff3e0;
      color: #f57c00;
    }

    &.matching-badge {
      background: #e3f2fd;
      color: #0066ba;
    }
  }

  .info-card {
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid #f0f0f0;

    @media (max-width: 768px) {
      padding: 20px;
    }
  }

  .info-card-title {
    font-family: Quicksand;
    font-size: 1.5rem;
    font-weight: 700;
    color: #0066ba;
    margin: 0 0 20px 0;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;

    svg {
      color: #f06a8a;
    }
  }

  .info-grid {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 8px;

    &.full-width {
      grid-column: 1 / -1;
    }

    .info-label {
      font-family: Quicksand;
      font-size: 0.9rem;
      font-weight: 600;
      color: #7f8c8d;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      display: flex;
      align-items: center;
      gap: 8px;

      svg {
        color: #f06a8a;
      }
    }

    .info-value {
      font-family: Quicksand;
      font-size: 1.2rem;
      font-weight: 600;
      color: #2c3e50;
    }
  }

  .about-text {
    font-family: Quicksand;
    font-size: 1rem;
    line-height: 1.8;
    color: #555;
    margin: 0;
  }

  .status-grid {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 12px;

    .status-label {
      font-family: Quicksand;
      font-size: 1rem;
      font-weight: 600;
      color: #333;
    }

    .status-value {
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: Quicksand;
      font-size: 1rem;
      font-weight: 600;
      padding: 6px 15px;
      border-radius: 20px;

      &.yes {
        background: #e8f5e9;
        color: #4caf50;
      }

      &.no {
        background: #ffebee;
        color: #f44336;
      }

      svg {
        font-size: 1rem;
      }
    }
  }

  .back-button {
    background: #f06a8a;
    color: white;
    border: none;
    padding: 12px 25px;
    border-radius: 10px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 600;
    font-family: Quicksand;
    transition: all 0.3s ease;

    &:hover {
      background: #e05a7a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(240, 106, 138, 0.3);
    }
  }
`;

