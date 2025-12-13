import styled from "styled-components";

export const StyledLoginModal = styled.div`
  svg {
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }

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
    max-width: 500px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    position: relative;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);

    @media (max-width: 600px) {
      padding: 30px 20px;
      max-height: 95vh;
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

    &:hover {
      background-color: #f0f0f0;
      color: #000;
    }

    svg {
      font-size: 24px;
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }

  .modal-header {
    text-align: center;
    margin-bottom: 30px;

    h2 {
      font-size: 2rem;
      color: #0066ba;
      margin-bottom: 10px;
      font-weight: 600;
    }

    p {
      color: #666;
      font-size: 0.95rem;
    }
  }

  .error-message {
    background-color: #fee;
    color: #c33;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 20px;
    font-size: 0.9rem;
    border-left: 4px solid #c33;
  }

  .auth-tabs {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
    border-bottom: 2px solid #e0e0e0;

    .tab {
      flex: 1;
      padding: 12px;
      background: none;
      border: none;
      border-bottom: 3px solid transparent;
      cursor: pointer;
      font-size: 1rem;
      font-weight: 500;
      color: #666;

      &:hover {
        color: #0066ba;
      }

      &.active {
        color: #0066ba;
        border-bottom-color: #0066ba;
      }
    }
  }

  .auth-methods {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .social-buttons {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .social-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    padding: 12px 20px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    background: white;
    cursor: pointer;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    animation: none !important;
    transition: none !important;
    transform: none !important;

    &:hover:not(:disabled) {
      border-color: #0066ba;
      box-shadow: 0 4px 12px rgba(0, 102, 186, 0.2);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    svg {
      width: 20px;
      height: 20px;
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }

    * {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }

  .google-btn {
    animation: none !important;
    transition: none !important;
    transform: none !important;

    &:hover:not(:disabled) {
      border-color: #4285f4;
      box-shadow: 0 4px 12px rgba(66, 133, 244, 0.2);
    }

    * {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }

  .facebook-btn {
    animation: none !important;
    transition: none !important;
    transform: none !important;

    &:hover:not(:disabled) {
      border-color: #1877f2;
      box-shadow: 0 4px 12px rgba(24, 119, 242, 0.2);
    }

    * {
      animation: none !important;
      transition: none !important;
      transform: none !important;
    }
  }

  .divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 20px 0;
    color: #999;
    font-size: 0.9rem;

    &::before,
    &::after {
      content: "";
      flex: 1;
      border-bottom: 1px solid #e0e0e0;
    }

    span {
      padding: 0 15px;
    }
  }

  .auth-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;

    label {
      font-weight: 500;
      color: #333;
      font-size: 0.95rem;
    }

    input {
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;

      &:focus {
        outline: none;
        border-color: #0066ba;
        box-shadow: 0 0 0 3px rgba(0, 102, 186, 0.1);
      }

      &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }

      &::placeholder {
        color: #999;
      }
    }

    .help-text {
      font-size: 0.85rem;
      color: #666;
      margin-top: 5px;
    }
  }

  .phone-input-group {
    display: flex;
    gap: 10px;

    .phone-code {
      width: 120px;
      padding: 12px 15px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 1rem;
      background: white;
      cursor: pointer;

      &:focus {
        outline: none;
        border-color: #0066ba;
        box-shadow: 0 0 0 3px rgba(0, 102, 186, 0.1);
      }

      &:disabled {
        background-color: #f5f5f5;
        cursor: not-allowed;
      }
    }

    input {
      flex: 1;
    }
  }

  .forgot-password {
    background: none;
    border: none;
    color: #0066ba;
    cursor: pointer;
    font-size: 0.9rem;
    text-align: right;
    padding: 0;
    margin-top: -10px;

    &:hover {
      text-decoration: underline;
    }
  }

  .submit-btn {
    padding: 14px 20px;
    background: linear-gradient(135deg, #0066ba 0%, #004d8c 100%);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    margin-top: 10px;

    &:hover:not(:disabled) {
      box-shadow: 0 6px 20px rgba(0, 102, 186, 0.3);
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .back-button {
    padding: 10px 20px;
    background: white;
    color: #0066ba;
    border: 2px solid #0066ba;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    margin-top: 10px;

    &:hover {
      background: #f0f7ff;
    }
  }

  #recaptcha-container {
    display: none;
  }
`;

