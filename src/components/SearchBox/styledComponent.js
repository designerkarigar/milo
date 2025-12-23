import styled from "styled-components";

export const StyledSearchBox = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 30px;
  position: relative;

  .search-box-container {
    position: relative;
    width: 100%;
  }

  .search-input-wrapper {
    display: flex;
    align-items: center;
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 50px;
    padding: 8px 15px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;

    &:focus-within {
      border-color: #0066BA;
      box-shadow: 0 2px 12px rgba(0, 102, 186, 0.2);
    }

    .search-icon {
      color: #666;
      margin-right: 10px;
      font-size: 20px;
    }

    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 16px;
      padding: 8px 0;
      color: #333;

      &::placeholder {
        color: #999;
      }
    }

    .clear-button {
      background: none;
      border: none;
      cursor: pointer;
      padding: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #999;
      margin-right: 5px;
      transition: color 0.2s;

      &:hover {
        color: #333;
      }

      svg {
        font-size: 18px;
      }
    }

    .search-button {
      background: #0066BA;
      color: white;
      border: none;
      border-radius: 25px;
      padding: 10px 20px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin-left: 10px;

      &:hover {
        background: #0052a3;
        transform: translateY(-1px);
        box-shadow: 0 4px 8px rgba(0, 102, 186, 0.3);
      }

      &:active {
        transform: translateY(0);
      }
    }
  }

  .suggestions-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #e0e0e0;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-top: 5px;
    max-height: 250px;
    overflow-y: auto;
    z-index: 1000;
    animation: slideDown 0.2s ease;

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .suggestion-item {
      display: flex;
      align-items: center;
      padding: 12px 15px;
      cursor: pointer;
      transition: background-color 0.2s;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      &:hover,
      &.selected {
        background-color: #f5f5f5;
      }

      .suggestion-icon {
        color: #0066BA;
        margin-right: 10px;
        font-size: 18px;
      }

      span {
        color: #333;
        font-size: 15px;
      }
    }
  }

  @media (max-width: 768px) {
    max-width: 100%;

    .search-input-wrapper {
      padding: 6px 12px;

      .search-input {
        font-size: 14px;
      }

      .search-button {
        padding: 8px 16px;
        font-size: 12px;
        margin-left: 5px;
      }
    }
  }
`;

