import styled from "styled-components";

export const StyledMyBookings = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;

  .bookings-nav-con {
    width: 100%;
    background-color: #0066ba;
  }

  .bookings-main-con {
    width: 100%;
    background-color: white;
    padding-bottom: 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .bookings-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    z-index: 1;
  }

  .bookings-wave svg {
    position: relative;
    display: block;
    width: calc(154% + 1.3px);
    height: 45px;
  }

  .bookings-wave .shape-fill {
    fill: #0066ba;
  }

  .bookings-container {
    max-width: 1200px;
    width: 100%;
    margin: 0 auto;
    padding: 60px 20px 40px;
    position: relative;
    z-index: 2;
  }

  .page-title {
    font-family: "Quicksand", sans-serif;
    font-size: 3rem;
    color: #0066ba;
    text-align: center;
    margin-bottom: 40px;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 400px;
    width: 100%;
  }

  .bookings-grid {
    display: flex;
    flex-direction: column;
    gap: 25px;
    margin-bottom: 40px;

    @media (max-width: 768px) {
      gap: 20px;
    }
  }

  .booking-card {
    background: white;
    border-radius: 15px;
    padding: 25px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    border: 1px solid #e0e0e0;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
  }

  .booking-header {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 2px solid #f0f0f0;
    flex-wrap: wrap;
  }

  .service-icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #0066ba 0%, #004d8c 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.5rem;
    flex-shrink: 0;
  }

  .service-info {
    flex: 1;
    min-width: 0;

    .service-name {
      font-family: "Quicksand", sans-serif;
      font-size: 1.3rem;
      font-weight: 700;
      color: #333;
      margin: 0 0 5px 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .service-type {
      font-family: "Quicksand", sans-serif;
      font-size: 0.85rem;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  }

  .booking-status {
    padding: 6px 12px;
    border-radius: 20px;
    color: white;
    font-size: 0.75rem;
    font-weight: 600;
    font-family: "Quicksand", sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    white-space: nowrap;
  }

  .booking-details {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  .detail-row {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: "Quicksand", sans-serif;
    padding: 8px 0;

    svg {
      color: #f06a8a;
      width: 16px;
      flex-shrink: 0;
    }

    .detail-label {
      font-weight: 600;
      color: #666;
      min-width: 140px;
    }

    .detail-value {
      color: #333;
      flex: 1;
    }

    &.amount-row {
      grid-column: 1 / -1;
      margin-top: 10px;
      padding-top: 15px;
      border-top: 2px solid #f0f0f0;

      .amount {
        font-size: 1.3rem;
        font-weight: 700;
        color: #0066ba;
      }
    }
  }

  .booking-remark {
    margin-top: 15px;
    padding: 12px;
    background-color: #f9f9f9;
    border-radius: 8px;
    font-family: "Quicksand", sans-serif;
    font-size: 0.9rem;
    color: #555;
    border-left: 3px solid #0066ba;

    strong {
      color: #333;
    }
  }

  .pagination-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 30px;
    margin-top: 40px;
    font-family: "Quicksand", sans-serif;

    .pagination-btn {
      background-color: #f06a8a;
      color: white;
      border: none;
      padding: 12px 30px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background-color: #e05a7a;
        transform: scale(1.05);
      }

      &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .page-indicator {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
    }
  }

  .no-bookings {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 400px;
    text-align: center;

    svg {
      font-size: 4rem;
      color: #ccc;
      margin-bottom: 20px;
    }

    h2 {
      font-family: "Quicksand", sans-serif;
      font-size: 2rem;
      color: #666;
      margin-bottom: 10px;
    }

    p {
      font-family: "Quicksand", sans-serif;
      font-size: 1.1rem;
      color: #999;
    }
  }
`;

