import styled from "styled-components";

export const StyledBanner = styled.div`
  width: 100%;
  background-color: #0066ba;
  position: relative;
  margin-bottom: -1px;
  border-bottom: 0;

  .banner-con {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 5%;
  }

  .banner-img {
    width: 50%;
  }
  .banner-video {
    width: 500px;
    height: 500px;
    object-fit: cover;
    border-radius: 50%;
    margin-left: auto;
    margin-right: 0;
    animation: none !important;
    transition: none !important;
    transform: none !important;
  }
  .second-image {
    display: none;
  }

  .banner-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    padding-right: 2%;
  }

  .heading {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    align-items: flex-start;
    h1 {
      width: 100%;
      line-height: 1.3;
      text-align: left;
      font-size: 2.8rem;
      color: #fecb02;
      font-family: "Quicksand", sans-serif;
      letter-spacing: 0.5px;
      margin: 0;
    }
    .heading-second-line {
      margin-top: 0.3em;
      font-size: 2.2rem;
    }
  }

  .banner-content {
    p {
      margin-top: 30px;
      text-align: left;
      width: 100%;
      font-size: 1.3rem;
      line-height: 1.4;
      color: white;
    }
  }

  .banner-cta-button {
    margin-top: 40px;
    padding: 15px 40px;
    background-color: #f06a8a;
    color: white;
    text-decoration: none;
    border-radius: 30px;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: "Quicksand", sans-serif;
    transition: all 0.3s ease;
    display: inline-block;

    &:hover {
      background-color: #e55a7a;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(240, 106, 138, 0.4);
    }
  }

  .banner-wave {
    position: absolute;
    bottom: -1px;
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
    height: 103px;
    transform: rotateY(180deg);
  }

  .banner-wave .shape-fill {
    fill: #ffffff;
  }

  @media (max-width: 1500px) {
    .heading {
      h1 {
        font-size: 2.3rem;
      }
      .heading-second-line {
        font-size: 1.8rem;
      }
    }

    .banner-video {
      width: 450px;
      height: 450px;
    }

    .banner-content {
      p {
        margin-top: 30px;
      }
      .banner-cta-button {
        margin-top: 35px;
        padding: 14px 35px;
        font-size: 1.1rem;
      }
    }
  }

  @media (max-width: 980px) {
    .heading {
      h1 {
        font-size: 2rem;
      }
      .heading-second-line {
        font-size: 1.6rem;
      }
    }

    .banner-content {
      margin-top: 40px;
      width: 70%;
      align-items: center;
      padding-right: 0;
      p {
        width: 100%;
        text-align: center;
        font-size: 1.2rem;
        margin-top: 25px;
      }
      .banner-cta-button {
        margin-top: 30px;
        padding: 12px 30px;
        font-size: 1rem;
      }
    }
    .banner-con {
      flex-direction: column;
      padding: 0;
    }
    .banner-video {
      width: 350px;
      height: 350px;
      margin: 0 auto;
      margin-top: 20px;
    }
    .heading {
      h1 {
        text-align: center;
      }
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
        font-size: 1.1rem;
      }
      .banner-cta-button {
        padding: 10px 25px;
        font-size: 0.95rem;
      }
    }

    .banner-con {
      .banner-video {
        width: 300px;
        height: 300px;
      }
      .second-image {
        width: 90%;
      }
    }

    .heading {
      h1 {
        font-size: 1.6rem;
      }
      .heading-second-line {
        font-size: 1.3rem;
      }
    }
  }

  @media (max-width: 400px) {
    .heading {
      h1 {
        font-size: 1.3rem;
      }
      .heading-second-line {
        font-size: 1.1rem;
      }
    }

    .banner-con {
      .banner-video {
        width: 200px;
        height: 200px;
      }
      p {
        margin-top: 20px;
        font-size: 1rem;
      }
      .banner-cta-button {
        padding: 10px 20px;
        font-size: 0.9rem;
      }
    }
  }
`;
