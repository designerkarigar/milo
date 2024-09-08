import styled from "styled-components";

export const StyledBanner = styled.div`
  width: 100%;
  background-color: #0066ba;
  position: relative;

  .banner-con {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .banner-img {
    width: 50%;
  }
  .second-image {
    display: none;
  }

  .banner-content {
    display: flex;
    flex-direction: column;
    width: 40%;
    justify-content: center;
    align-items: center;
  }

  .heading {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    h2 {
      text-align: center;
      color: white;
      width: fit-content;
      font-size: 6rem;
      line-height: 1.5;
      font-family: "Quicksand", sans-serif;
    }
    h1 {
      width: fit-content;
      line-height: 1;
      text-align: center;
      font-size: 9rem;
      color: #fecb02;
      font-family: "Quicksand", sans-serif;
    }
  }

  .banner-content {
    p {
      margin-top: 50px;
      text-align: center;
      width: 70%;
      font-size: 1.3rem;
      line-height: 1.3;
      color: white;
    }
  }

  .banner-wave {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .banner-wave svg {
    position: relative;
    display: block;
    width: calc(151% + 1.3px);
    height: 102px;
    transform: rotateY(180deg);
  }

  .banner-wave .shape-fill {
    fill: #ffffff;
  }

  @media (max-width: 1500px) {
    .heading {
      h2 {
        font-size: 4.5rem;
      }
      h1 {
        font-size: 7rem;
      }
    }

    .banner-content {
      p {
        margin-top: 50px;
      }
    }
  }

  @media (max-width: 980px) {
    .heading {
      h2 {
        font-size: 4rem;
      }
      h1 {
        font-size: 7rem;
      }
    }

    .banner-content {
      margin-top: 40px;
      width: 70%;
      p {
        width: 100%;
        font-size: 1.5rem;
      }
    }
    .banner-con {
      flex-direction: column;
    }
    .second-image {
      display: inline;
      margin-bottom: 50px;
      width: 80%;
    }
    .first-image {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .banner-content {
      width: 90%;

      p {
        font-size: 1.5rem;
      }
    }

    .banner-con {
      .second-image {
        width: 90%;
      }
    }

    .heading {
      h1 {
        font-size: 7rem;
      }
      h2 {
        font-size: 3rem;
      }
    }
  }

  @media (max-width: 400px) {
    .heading {
      h1 {
        font-size: 3.5rem;
      }

      h2 {
        font-size: 2.5rem;
      }
    }

    .banner-con {
      p {
        margin-top: 20px;
        font-size: 1.2rem;
      }
    }
  }
`;
