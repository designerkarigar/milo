import styled from "styled-components";

export const StyledMyPets = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: white;

  .my-pets-nav-con {
    width: 100%;
    background-color: #0066ba;
  }

  .my-pets-main-con {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 50px 0px;
    align-items: center;
    background-color: white;
  }

  .my-pets-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .my-pets-wave svg {
    position: relative;
    display: block;
    width: calc(154% + 1.3px);
    height: 45px;
  }

  .my-pets-wave .shape-fill {
    fill: rgb(0, 102, 186);
  }

  .my-pets-container {
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 40px 20px;
    position: relative;
    z-index: 1;
  }

  .header-section {
    text-align: center;
    margin-bottom: 50px;

    .page-title {
      font-size: 3rem;
      font-weight: 700;
      color: #2c3e50;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);

      @media (max-width: 768px) {
        font-size: 2rem;
      }
    }

    .page-subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
      margin: 0;
    }
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
  }

  .empty-state {
    text-align: center;
    padding: 60px 20px;
    background: white;
    border-radius: 20px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

    p {
      font-size: 1.2rem;
      color: #7f8c8d;
    }
  }

  .carousel-container {
    position: relative;
    width: 100%;
    margin: 0 auto;
  }

  .carousel-wrapper {
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
  }

  .carousel-track {
    display: flex;
    gap: 30px;
    transition: transform 0.5s ease-in-out;
    width: 100%;

    @media (max-width: 1024px) {
      gap: 20px;
    }

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 20px;
    }
  }

  .pet-card {
    flex: 0 0 calc(50% - 15px);
    background: white;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    display: flex;
    flex-direction: column;
    min-height: 600px;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
    }

    @media (max-width: 768px) {
      flex: 0 0 100%;
      min-height: auto;
    }
  }

  .pet-card-image {
    width: 100%;
    height: 350px;
    overflow: hidden;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    @media (max-width: 768px) {
      height: 250px;
    }
  }

  .pet-card-content {
    padding: 30px;
    flex: 1;
    display: flex;
    flex-direction: column;

    @media (max-width: 768px) {
      padding: 20px;
    }
  }

  .pet-name {
    font-size: 2rem;
    font-weight: 700;
    color: #2c3e50;
    margin: 0 0 20px 0;
    border-bottom: 2px solid #f06a8a;
    padding-bottom: 10px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .pet-details {
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-bottom: 20px;
    flex: 1;
  }

  .pet-detail-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid #ecf0f1;

    &:last-child {
      border-bottom: none;
    }

    .detail-label {
      font-weight: 600;
      color: #7f8c8d;
      font-size: 0.95rem;
    }

    .detail-value {
      font-weight: 500;
      color: #2c3e50;
      font-size: 1rem;
      text-align: right;

      &.available {
        color: #27ae60;
        font-weight: 600;
      }

      &.not-available {
        color: #e74c3c;
        font-weight: 600;
      }
    }
  }

  .pet-info {
    margin-top: auto;
    padding-top: 20px;
    border-top: 1px solid #ecf0f1;

    p {
      color: #7f8c8d;
      font-size: 0.95rem;
      line-height: 1.6;
      margin: 0;
    }
  }

  .carousel-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transition: all 0.3s ease;
    z-index: 10;
    color: #2c3e50;
    font-size: 1.2rem;

    &:hover {
      background: #f06a8a;
      color: white;
      transform: translateY(-50%) scale(1.1);
      box-shadow: 0 6px 20px rgba(240, 106, 138, 0.4);
    }

    &:active {
      transform: translateY(-50%) scale(0.95);
    }

    @media (max-width: 768px) {
      display: none;
    }
  }

  .carousel-button-left {
    left: -25px;

    @media (max-width: 1200px) {
      left: -15px;
    }
  }

  .carousel-button-right {
    right: -25px;

    @media (max-width: 1200px) {
      right: -15px;
    }
  }

  .carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 30px;

    .indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      background: #bdc3c7;
      cursor: pointer;
      transition: all 0.3s ease;
      padding: 0;

      &:hover {
        background: #95a5a6;
        transform: scale(1.2);
      }

      &.active {
        background: #f06a8a;
        width: 30px;
        border-radius: 6px;
      }
    }

    @media (max-width: 768px) {
      margin-top: 20px;
    }
  }
`;

