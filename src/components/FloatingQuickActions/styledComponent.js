import styled from "styled-components";

export const StyledFloatingQuickActions = styled.div`
  .floating-actions {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 1200;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 12px;
  }

  .menu {
    display: flex;
    flex-direction: column;
    gap: 8px;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transform-origin: bottom right;
    pointer-events: none;
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .menu.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .menu-item {
    border: none;
    background: white;
    color: #355070;
    padding: 10px 14px;
    border-radius: 10px;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    text-align: left;
    min-width: 170px;
    white-space: nowrap;
  }

  .fab {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: #f06a8a;
    color: white;
    font-size: 2rem;
    line-height: 1;
    cursor: pointer;
    box-shadow: 0 10px 25px rgba(240, 106, 138, 0.45);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease, background-color 0.2s ease;
  }

  .fab.open {
    transform: rotate(45deg);
    background: #d65474;
  }

  .camera-input {
    display: none;
  }

  @media (max-width: 768px) {
    .floating-actions {
      right: 16px;
      bottom: 40px;
    }
  }
`;

