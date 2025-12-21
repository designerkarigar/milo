import styled from "styled-components";

export const StyledBookingCheckout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  background-color: #f8f8f8;

  .booking-nav-con {
    width: 100%;
    background-color: #0066ba;
  }

  .booking-main-con {
    width: 100%;
    background-color: white;
    padding-bottom: 50px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .booking-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
    z-index: 1;
  }

  .booking-wave svg {
    position: relative;
    display: block;
    width: calc(154% + 1.3px);
    height: 45px;
  }

  .booking-wave .shape-fill {
    fill: #0066ba;
  }

  .booking-container {
    max-width: 800px;
    width: 100%;
    margin: 0 auto;
    padding: 60px 20px 40px;
    position: relative;
    z-index: 2;
  }

  .booking-title {
    font-family: "Quicksand", sans-serif;
    font-size: 2.5rem;
    color: #0066ba;
    text-align: center;
    margin-bottom: 40px;
    font-weight: 700;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  .creche-info-card {
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
    border-radius: 20px;
    padding: 30px;
    margin-bottom: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    h2 {
      font-family: "Quicksand", sans-serif;
      font-size: 1.8rem;
      color: #0066ba;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      gap: 10px;

      svg {
        color: #f06a8a;
      }
    }

    .creche-details {
      display: flex;
      flex-direction: column;
      gap: 10px;
      font-family: "Quicksand", sans-serif;

      p {
        margin: 0;
        font-size: 1rem;
        color: #333;

        strong {
          color: #0066ba;
          margin-right: 8px;
        }
      }
    }
  }

  .booking-form {
    background: white;
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      padding: 25px;
    }
  }

  .form-group {
    margin-bottom: 30px;

    label {
      display: flex;
      align-items: center;
      gap: 10px;
      font-family: "Quicksand", sans-serif;
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;

      svg {
        color: #f06a8a;
      }
    }

    .date-input {
      width: 100%;
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 10px;
      font-size: 1rem;
      font-family: "Quicksand", sans-serif;
      transition: border-color 0.3s ease;

      &:focus {
        outline: none;
        border-color: #0066ba;
      }

      &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }
    }

    .help-text {
      display: block;
      margin-top: 8px;
      font-size: 0.85rem;
      color: #666;
      font-family: "Quicksand", sans-serif;
    }
  }

  .error-message {
    background-color: #ffebee;
    color: #c62828;
    padding: 15px;
    border-radius: 10px;
    margin-bottom: 20px;
    font-family: "Quicksand", sans-serif;
    font-weight: 600;
    border-left: 4px solid #c62828;
  }

  .success-message {
    text-align: center;
    padding: 40px;
    background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
    border-radius: 20px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

    svg {
      font-size: 4rem;
      color: #4caf50;
      margin-bottom: 20px;
    }

    h2 {
      font-family: "Quicksand", sans-serif;
      font-size: 2rem;
      color: #2e7d32;
      margin-bottom: 10px;
    }

    p {
      font-family: "Quicksand", sans-serif;
      font-size: 1.1rem;
      color: #555;
    }
  }

  .booking-summary {
    background: #f9f9f9;
    border-radius: 15px;
    padding: 25px;
    margin-bottom: 30px;
    border: 2px solid #e0e0e0;

    h3 {
      font-family: "Quicksand", sans-serif;
      font-size: 1.3rem;
      color: #0066ba;
      margin-bottom: 20px;
      font-weight: 700;
    }

    .summary-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 0;
      border-bottom: 1px solid #e0e0e0;
      font-family: "Quicksand", sans-serif;
      font-size: 1rem;

      &:last-child {
        border-bottom: none;
      }

      span:first-child {
        color: #666;
        font-weight: 600;
      }

      span:last-child {
        color: #333;
        font-weight: 700;
      }

      &.total {
        margin-top: 10px;
        padding-top: 15px;
        border-top: 2px solid #0066ba;
        font-size: 1.2rem;

        span:last-child {
          color: #0066ba;
          font-size: 1.4rem;
        }
      }
    }
  }

  .form-actions {
    display: flex;
    gap: 20px;
    justify-content: flex-end;
    margin-top: 30px;

    @media (max-width: 768px) {
      flex-direction: column;
    }

    button {
      padding: 15px 30px;
      border-radius: 10px;
      font-size: 1rem;
      font-weight: 600;
      font-family: "Quicksand", sans-serif;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 10px;
      justify-content: center;

      &.cancel-button {
        background-color: #e0e0e0;
        color: #333;
        border: none;

        &:hover {
          background-color: #d0d0d0;
        }
      }

      &.submit-button {
        background-color: #f06a8a;
        color: white;
        border: none;

        &:hover:not(:disabled) {
          background-color: #e05a7a;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(240, 106, 138, 0.3);
        }

        &:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
          opacity: 0.6;
        }
      }
    }
  }
`;

