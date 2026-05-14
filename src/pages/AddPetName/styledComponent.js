import styled from "styled-components";

export const StyledAddPetName = styled.main`
  min-height: 75vh;
  padding: 32px 16px 56px;
  background: #f8f8fb;

  .container {
    max-width: 980px;
    margin: 0 auto;
  }

  h1 {
    color: #5b6770;
    margin-bottom: 8px;
  }

  .limit-notice {
    color: #5b6770;
    font-size: 0.95rem;
    margin: 0 0 12px;
  }

  .error-line {
    color: #c62828;
    font-size: 0.95rem;
    margin: 0 0 12px;
  }

  .content {
    display: grid;
    grid-template-columns: minmax(260px, 360px) 1fr;
    gap: 20px;
  }

  .preview-box {
    position: relative;
    border-radius: 16px;
    overflow: hidden;
    min-height: 280px;
    border: 2px solid #ececf4;
    background: white;
  }

  .image-edit-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 3;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: none;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.18);
    font-size: 1.1rem;
    cursor: pointer;
  }

  .image-menu {
    position: absolute;
    top: 50px;
    right: 10px;
    z-index: 4;
    background: white;
    border: 1px solid #e3e6ef;
    border-radius: 10px;
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
    padding: 6px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .image-menu button {
    border: none;
    background: #f5f7fb;
    border-radius: 8px;
    padding: 8px 10px;
    text-align: left;
    cursor: pointer;
    font-weight: 600;
    color: #425366;
  }

  .preview-box img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .placeholder {
    height: 100%;
    min-height: 280px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #767676;
  }

  .form-box {
    background: white;
    border: 1px solid #e8e8f0;
    border-radius: 16px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    min-height: 220px;
  }

  .form-box label {
    color: #404853;
    font-weight: 600;
  }

  .form-box input {
    height: 44px;
    border-radius: 10px;
    border: 1px solid #d7dce6;
    padding: 0 12px;
    font-size: 1rem;
  }

  .next-btn {
    margin-top: auto;
    align-self: center;
    border: none;
    border-radius: 10px;
    padding: 10px 16px;
    font-size: 1rem;
    font-weight: 700;
    background: #f06a8a;
    color: white;
    cursor: pointer;
  }

  .next-btn:disabled {
    background: #c9ccd5;
    cursor: not-allowed;
  }

  .error-box {
    background: white;
    border-radius: 16px;
    border: 1px solid #ebeaf1;
    padding: 24px;
    text-align: center;
  }

  .error-box button {
    margin-top: 12px;
    background: #0066ba;
    border: none;
    color: white;
    padding: 10px 16px;
    border-radius: 10px;
    cursor: pointer;
  }

  .hidden-input {
    display: none;
  }

  @media (max-width: 820px) {
    .content {
      grid-template-columns: 1fr;
    }
  }
`;

