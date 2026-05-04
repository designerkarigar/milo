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

  .action-row button svg {
    transition: none !important;
    animation: none !important;
    transform: none !important;
  }

  .hidden-input {
    display: none;
  }
`;

