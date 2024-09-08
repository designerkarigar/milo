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
    padding: 50px 0px;
  }

  .match-content {
    margin-top: 50px;
    max-width: 400px;
    width: 90%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    flex-direction: column;

    h1 {
      color: #f1c21b;
      font-family: Quicksand;
      font-size: 3.5rem;
    }
    p {
      font-size: 1.3rem;
      font-family: Quicksand;
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
    .match-card-con {
      flex-direction: column;
      row-gap: 30px;
    }

    .match-card {
      width: 90%;
      height: fit-content;
      padding: 20px 0px;
      row-gap: 20px;

      h4 {
        font-size: 1.3rem;
      }
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

    .pup-gallery {
      padding: 0;
    }
    .match-card {
      border-radius: 20px;
      height: fit-content;
      padding: 20px 0px;
      row-gap: 10px;

      h4 {
        font-size: 1rem;
      }
      p {
        text-align: right;
      }
      img {
        width: 35px;
        height: 35px;
      }
    }

    .match-content {
      h1 {
        font-size: 2rem;
      }
      p {
        font-size: 1.2rem;
      }
    }
  }
  @media (max-width: 400px) {
  }
`;
