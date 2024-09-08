import styled from "styled-components";

export const StyledDayCare = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  .nav-bar {
    width: 100%;
    background-color: rgba(0, 102, 186);
  }
  .daycare-banner-con {
    position: relative;
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .shade {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(0, 102, 186);
  }

  .daycare-banner-content {
    width: 100%;
    z-index: 4;
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    padding-bottom: 100px;
    justify-content: center;
    align-items: center;

    h1 {
      font-family: Quicksand;
      font-size: 4.5rem;
      color: white;
      text-align: center;
      color: #fecb02;
      width: fit-content;
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

  .daycare-content {
    position: relative;
    padding: 50px 0px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .daycare-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .daycare-heading {
    h3 {
      text-align: center;
      font-family: Quicksand;
      padding: 0px 10px;
    }

    h1 {
      padding: 10px 10px;
      text-align: center;
      font-family: Quicksand;
      color: #f1c21b;
    }
  }

  .daycare-card-con {
    padding: 50px 0px;
    width: 100%;
    row-gap: 60px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }

  .daycare-card {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: row;
  }

  .daycare-img {
    position: relative;
    border-radius: 50px;
    width: 35%;
  }

  .daycare-card-content {
    width: 30%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    row-gap: 20px;

    h1 {
      color: #f1c21b;
      font-size: 2.2rem;
    }
    p {
      font-size: 1.1rem;
      width: 400px;
    }
  }

  .daycare-card:nth-child(even) {
    .daycare-img {
      order: 2;
    }
    .daycare-card-content {
      h1 {
        text-align: right;
      }
      p {
        align-self: flex-end;
        text-align: right;
      }
    }
  }

  .join {
    margin-top: 50px;
    width: 400px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    row-gap: 20px;
    flex-direction: column;

    h1 {
      color: #f1c21b;
      font-family: Quicksand;
    }
    p {
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

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 1980px) {
  }
  @media (max-width: 1280px) {
  }
  @media (max-width: 980px) {
    .daycare-banner-content {
      h1 {
        padding: 10px 60px;
        font-size: 2.5rem;
      }
    }
    .daycare-card {
      flex-direction: column;
      row-gap: 50px;
    }
    .daycare-img {
      width: 80%;
    }
    .daycare-card-content {
      width: 90%;
      align-items: center;
      text-align: center;
      row-gap: 10px;
    }

    .daycare-card:nth-child(even) {
      .daycare-img {
      }
      .daycare-card-content {
        order: 2;
        p {
          text-align: center;
          align-self: center;
        }
      }
    }
  }
  @media (max-width: 600px) {
    .daycare-banner-content {
      h1 {
        font-size: 2.5rem;
      }
    }

    .daycare-heading {
      h3 {
        font-size: 1rem;
      }
      h1 {
        font-size: 1.3rem;
      }
    }
  }
  @media (max-width: 400px) {
    .daycare-banner-content {
      h1 {
        font-size: 2rem;
        padding: 5px 30px;
      }
    }

    .daycare-card-content {
      h1 {
        font-size: 1.2rem;
      }
      p {
        width: 100%;
        font-size: 1rem;
      }
    }

    .join {
      width: 80%;
      h1 {
        font-size: 1.3rem;
      }
      p {
        width: 100%;
        font-size: 0.9rem;
        padding: 0px 10px;
      }
    }
  }
`;
