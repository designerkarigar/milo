import styled from "styled-components";

export const StyledCrecheDetailModal = styled.div`
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    padding: 20px;
  }

  .modal-content {
    background: white;
    border-radius: 20px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

    @media (max-width: 600px) {
      padding: 30px 20px;
      max-height: 95vh;
      max-width: 95%;
    }
  }

  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: none;
    border: none;
    cursor: pointer;
    color: #666;
    padding: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    z-index: 10;

    &:hover {
      background-color: #f0f0f0;
      color: #000;
    }

    svg {
      font-size: 24px;
    }
  }

  .modal-header {
    text-align: center;
    margin-bottom: 30px;
    position: relative;

    h2 {
      font-family: Quicksand;
      font-size: 2rem;
      color: #0066ba;
      margin-bottom: 10px;
      font-weight: 600;
    }

    .verified-badge {
      display: inline-block;
      background-color: #4caf50;
      color: white;
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: bold;
      font-family: Quicksand;
      margin-top: 10px;
    }
  }

  .modal-body {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .detail-image-container {
    width: 100%;
    height: 300px;
    border-radius: 15px;
    overflow: hidden;
    background-color: #f0f0f0;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .detail-header-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 15px;
    flex-wrap: wrap;
    gap: 20px;

    @media (max-width: 600px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }

  .rating-section {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: Quicksand;

    .rating-value {
      font-weight: bold;
      font-size: 1.5rem;
      color: #252525;
    }

    .star {
      color: #fecb02;
      font-size: 1.5rem;
    }

    .rating-text {
      color: #666;
      font-size: 0.9rem;
    }
  }

  .price-section {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-family: Quicksand;

    .price-label {
      font-size: 0.9rem;
      color: #666;
    }

    .price-value {
      font-size: 1.5rem;
      font-weight: bold;
      color: #f06a8a;
    }

    @media (max-width: 600px) {
      align-items: flex-start;
    }
  }

  .detail-section {
    font-family: Quicksand;

    h3 {
      font-size: 1.3rem;
      color: #0066ba;
      margin-bottom: 15px;
      font-weight: 600;
      border-bottom: 2px solid #f0f0f0;
      padding-bottom: 10px;
    }
  }

  .detail-item {
    display: flex;
    margin-bottom: 12px;
    gap: 10px;

    .label {
      font-weight: 600;
      color: #333;
      min-width: 120px;
    }

    .value {
      color: #666;
      flex: 1;
    }
  }

  .about-text {
    color: #666;
    line-height: 1.6;
    font-size: 1rem;
  }

  .services-grid,
  .days-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .service-badge,
  .day-badge {
    background-color: #f0f0f0;
    color: #333;
    padding: 8px 15px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
  }

  .hours-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .hour-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 10px;

    .hour-from,
    .hour-to {
      font-weight: 600;
      color: #333;
    }

    .hour-separator {
      color: #999;
    }
  }

  .capacity-text {
    font-size: 1.2rem;
    font-weight: 600;
    color: #0066ba;
  }

  .features-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .feature-item {
    display: flex;
    justify-content: space-between;
    padding: 12px;
    background-color: #f9f9f9;
    border-radius: 10px;
    align-items: center;

    .feature-label {
      font-weight: 600;
      color: #333;
    }

    .feature-value {
      font-weight: 600;
      padding: 5px 15px;
      border-radius: 20px;

      &.yes {
        background-color: #e8f5e9;
        color: #4caf50;
      }

      &.no {
        background-color: #ffebee;
        color: #f44336;
      }
    }
  }

  .photos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;

    .photo-item {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 10px;
      overflow: hidden;
      background-color: #f0f0f0;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .book-now-button {
    width: 100%;
    padding: 15px 30px;
    background-color: #f06a8a;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    font-family: Quicksand;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 20px;

    &:hover {
      background-color: #e05a7a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(240, 106, 138, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }
`;



