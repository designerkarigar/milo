import styled from "styled-components";

export const MatchMakingStyledComponent = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .match-top-con {
    position: relative;
    width: 100%;
    height: 80vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgb(0, 102, 186);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  /* .match-shade {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: rgba(0, 102, 186, 0.7);
  } */
  .match-nav-con {
    width: 100%;
    background-color: transparent;
  }

  .match-banner {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 2;
    h1 {
      font-family: Quicksand;
      font-size: 4rem;
      text-align: center;
      color: #fecb02;
    }
  }

  .custom-shape-divider-bottom-1690829630 {
    z-index: 4;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .custom-shape-divider-bottom-1690829630 svg {
    position: relative;
    display: block;
    width: calc(151% + 1.3px);
    height: 102px;
    transform: rotateY(180deg);
  }

  .custom-shape-divider-bottom-1690829630 .shape-fill {
    fill: #ffffff;
  }

  .match-data {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 50px 0px 70px;
  }

  .loading-con,
  .empty-con {
    min-height: 340px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .empty-con h2 {
    color: #5b6770;
    font-size: 1.3rem;
  }

  .match-feed {
    width: 100%;
    max-width: 1000px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
  }

  .arrow-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    background: #11161f;
    color: white;
    font-size: 1.1rem;
    cursor: pointer;
  }

  .arrow-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .swipe-card {
    position: relative;
    width: min(88vw, 440px);
    height: min(74vh, 680px);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.2);
  }

  .swipe-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  .swipe-card .overlay {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 92px;
    padding: 0 18px;
    color: white;
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
  }

  .swipe-card .overlay h3 {
    margin: 0;
    font-size: 2rem;
    font-family: Quicksand;
  }

  .swipe-card .overlay p {
    margin: 2px 0 0;
    font-size: 1.2rem;
    font-family: Quicksand;
  }

  .swipe-card .overlay .location {
    margin-top: 6px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
  }

  .swipe-card .overlay .meta-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
  }

  .swipe-card .overlay .meta-row span {
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.35);
    padding: 4px 10px;
    border-radius: 14px;
    font-size: 0.85rem;
    text-transform: capitalize;
  }

  .swipe-card .actions {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 24px;
    display: flex;
    justify-content: center;
    gap: 70px;
  }

  .swipe-card .actions button {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    border: none;
    background: #10151d;
    color: white;
    font-size: 1.7rem;
    cursor: pointer;
  }

  .swipe-card .actions .cross {
    color: #ff4b7d;
  }

  .swipe-card .actions .heart {
    color: #df4fb2;
  }

  .loading-more {
    margin-top: 16px;
    color: #5b6770;
    font-weight: 600;
  }

  .match-content {
    margin-top: 50px;
    max-width: 1200px;
    width: 90%;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    row-gap: 20px;
    flex-direction: column;
    padding: 0 20px;

    h1 {
      color: #f1c21b;
      font-family: Quicksand;
      font-size: 3.5rem;
      text-align: left;
      width: 100%;
    }
    p {
      font-size: 1.3rem;
      font-family: Quicksand;
      text-align: left;
      line-height: 1.6;
      width: 100%;
    }
  }

  .join-btn {
    text-decoration: none;
    color: white;
    width: fit-content;
    padding: 8px 15px;
    background-color: #f06a8a;
    border-radius: 10px;
    transition: all 0.3s ease;
    cursor: pointer;

    &:hover {
      transform: scale(1.1);
    }
  }

  .match-card-con {
    padding: 60px 0px;
    padding-bottom: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 60px;
  }
  .match-card {
    width: 300px;
    height: 350px;
    border: 2px solid rgba(240, 106, 138, 1);
    border-radius: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* row-gap: 40px; */
  }

  .match-card {
    img {
      height: 30%;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      border: 2px solid rgba(241, 194, 27, 1);
    }
    h4 {
      height: 50%;
      width: 90%;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
    }
    p {
      display: flex;
      align-items: center;
      height: 20%;
      width: 90%;
      color: rgba(150, 150, 150, 1);
    }
  }

  .match-card-img {
    width: 90%;
  }

  .pup-gallery {
    padding: 50px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      color: #f1c21b;
      font-family: Quicksand;
      font-size: 3rem;
      text-align: center;
    }
  }
  .gallery-con {
    display: flex;
    flex-wrap: wrap;
    margin: 50px 20px;
  }

  .row {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    column-gap: 20px;
  }

  .gallery-img {
    flex: 0 0 calc(40% - 5px);
    max-width: calc(50% - 5px);
    height: auto;
  }

  @media (max-width: 1280px) {
  }
  @media (max-width: 980px) {
    .match-top-con {
      height: 60vh;
    }
    .match-feed {
      gap: 10px;
    }
  }

  @media (max-width: 600px) {
    .match-top-con {
      height: 50vh;
    }
    .match-banner {
      h1 {
        font-size: 2rem;
      }
    }

    .arrow-btn {
      width: 42px;
      height: 42px;
      font-size: 1rem;
    }

    .swipe-card {
      width: min(90vw, 420px);
      height: min(72vh, 620px);
    }

    .swipe-card .actions {
      gap: 55px;
    }

    .swipe-card .actions button {
      width: 58px;
      height: 58px;
      font-size: 1.5rem;
    }

    .swipe-card .overlay h3 {
      font-size: 1.8rem;
    }
  }
  @media (max-width: 400px) {
  }
`;
