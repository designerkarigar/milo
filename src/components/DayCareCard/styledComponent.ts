import styled from "styled-components";

export const StyledDayCareCard = styled.div`
  width: 300px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }

  .card-image-container {
    width: 100%;
    height: 200px;
    position: relative;
    overflow: hidden;
    background-color: #e1e1e1;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.05);
    }

    .placeholder-image {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #f0f0f0;
      color: #999;
      font-family: Quicksand;
    }

    .verified-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #4caf50;
      color: white;
      padding: 5px 10px;
      border-radius: 20px;
      font-size: 0.75rem;
      font-weight: bold;
      font-family: Quicksand;

      span {
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }
  }

  .card-content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
    min-height: 0; /* Allow flex item to shrink */
  }

  .card-title {
    font-family: Quicksand;
    font-size: 1.4rem;
    font-weight: bold;
    color: #252525;
    margin: 0;
    line-height: 1.3;
  }

  .card-owner {
    font-family: Quicksand;
    font-size: 0.9rem;
    color: #666;
    margin: 0;
  }

  .card-location {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: Quicksand;
    font-size: 0.9rem;
    color: #666;

    span:first-child {
      font-size: 1rem;
    }
  }

  .card-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
  }

  .card-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    font-family: Quicksand;

    .rating-value {
      font-weight: bold;
      color: #252525;
      font-size: 1rem;
    }

    .star {
      color: #fecb02;
      font-size: 1.1rem;
    }

    .review-count {
      color: #666;
      font-size: 0.85rem;
    }
  }

  .card-price {
    font-family: Quicksand;
    font-weight: bold;
    color: #f06a8a;
    font-size: 1rem;
  }

  .card-services {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: 10px;
  }

  .service-tag {
    background-color: #f0f0f0;
    color: #666;
    padding: 4px 10px;
    border-radius: 15px;
    font-size: 0.75rem;
    font-family: Quicksand;
  }

  .book-now-button {
    width: 100%;
    padding: 12px 20px;
    background-color: #f06a8a;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    font-family: Quicksand;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: auto; /* Push button to bottom of card */

    &:hover {
      background-color: #e05a7a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(240, 106, 138, 0.3);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 600px) {
    width: 100%;
    max-width: 350px;

    .card-image-container {
      height: 180px;
    }
  }
`;


