import styled from "styled-components";

export const StyledAddPetCapture = styled.main`
  min-height: 72vh;
  padding: 32px 16px 56px;
  background: #f8f8fb;
  display: flex;
  justify-content: center;
  align-items: center;

  .container {
    width: 100%;
    max-width: 620px;
    text-align: center;
    background: white;
    border: 1px solid #ececf4;
    border-radius: 16px;
    padding: 26px 20px;
  }

  h1 {
    margin: 0 0 8px;
    color: #5b6770;
  }

  p {
    margin: 0;
    color: #687888;
  }

  .limit-notice {
    margin-top: 16px;
    padding: 14px 16px;
    border-radius: 12px;
    background: #fff8f0;
    border: 1px solid #f0dfc8;
    color: #5c4a3a;
    font-size: 0.95rem;
    line-height: 1.55;
    text-align: left;
  }

  .action-row {
    display: flex;
    justify-content: center;
    gap: 12px;
    margin-top: 22px;
  }

  .action-row button {
    border: none;
    border-radius: 10px;
    padding: 11px 20px;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;
    background: #f06a8a;
    color: white;
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }

  .action-row button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .action-row button svg {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }

  .hidden-input {
    display: none;
  }
`;

