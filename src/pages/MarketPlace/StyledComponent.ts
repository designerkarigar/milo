import styled from "styled-components";

export const StyledMarketPlace = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-x: hidden;

  .market-nav-con {
    width: 100%;
    background-color: rgb(0, 102, 186);
    display: flex;
    justify-content: center;
    flex-direction: column;
    justify-content: center;
  }

  .market-main-con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 100%;
  }

  .wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .wave svg {
    position: relative;
    display: block;
    width: calc(154% + 1.3px);
    height: 45px;
  }

  .wave .shape-fill {
    fill: rgb(0, 102, 186);
  }

  .market-banner-content {
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 80px;
    padding-bottom: 40px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
  }

  .market-heading {
    width: 40%;
    display: flex;
    justify-content: center;
    h1 {
      width: fit-content;
      position: relative;
      color: #f1c21b;
      font-size: 4.5rem;
      font-family: Quicksand;
      text-align: center;
    }
  }

  .market-lines {
    position: absolute;
    top: 0;
    transform: translate(-100%, -100%) rotate(10deg);
    width: 70px;
    left: 0;
  }
  .market-thread {
    position: absolute;
    bottom: 0;
    transform: translate(40%, 150%) rotate(-25deg);
    width: 250px;
    right: 0;
  }
  .market-banner-img {
    width: 40%;
    img {
      width: 100%;
    }
  }

  .market-card-con {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .market-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .market-card {
    display: flex;
    width: 100%;
    margin-top: -70px;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }

  .market-card-text {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 20px;
    h1 {
      font-size: 2.8rem;
      color: #f1c21b;
      font-family: Quicksand;
    }
    p {
      font-family: Quicksand;
      font-size: 1.4rem;
      line-height: 1.5;
    }
  }

  .market-card-img {
    width: 50%;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .market-card:nth-child(2) {
    .market-card-text {
      justify-content: flex-start;
      order: 2;
    }
  }
  .market-card:nth-child(3) {
    .market-card-text {
      text-align: right;
    }
  }

  .market-join {
    margin: 50px 0px;
    padding: 0px 20px;
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
  .market-join-btn {
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
    .market-heading {
      h1 {
        font-size: 3.5rem;
      }
    }
    .market-lines {
      width: 60px;
    }

    .market-thread {
      width: 220px;
    }

    .market-card-text {
      h1 {
        font-size: 2.2rem;
      }
      p {
        font-size: 1.1rem;
      }
    }
  }
  @media (max-width: 980px) {
    .market-heading {
      width: 90%;
      padding: 100px 20px;
      h1 {
        font-size: 4rem;
      }
    }

    .market-banner-content {
      padding-bottom: 0px;
    }
    .market-card-con {
      /* padding: 50px 0px; */
    }
    .market-banner-img {
      display: none;
    }

    .market-card {
      flex-direction: column;
      margin: 0;
      row-gap: 30px;
    }
    .market-card-img {
      width: 90%;
    }
    .market-card-text {
      width: 70%;
    }
    .market-card-text {
      h1 {
        width: 100%;
      }
    }
    .market-card:nth-child(3) {
      .market-card-text {
        order: 2;
        text-align: left;
        align-self: flex-start;
        margin-left: 40px;
      }
    }
    .market-card:nth-child(2) {
      .market-card-text {
        order: 2;
        text-align: right;
        align-self: flex-end;
        margin-right: 40px;
      }
    }
  }
  @media (max-width: 600px) {
    .market-heading {
      h1 {
        font-size: 2.8rem;
      }
    }

    .market-lines {
      width: 50px;
    }

    .market-thread {
      width: 150px;
    }

    .market-card-text {
      width: 90%;
    }
  }
  @media (max-width: 400px) {
    .market-heading {
      h1 {
        font-size: 2.3rem;
      }
    }
    .market-lines {
      width: 40px;
    }

    .market-thread {
      width: 110px;
    }
    .market-card:nth-child(3) {
      .market-card-text {
        padding: 0px 15px;
        margin: 0;
      }
    }
    .market-card:nth-child(2) {
      .market-card-text {
        padding: 0px 15px;
        margin: 0;
      }
    }

    .market-card-text {
      width: 90%;

      h1 {
        font-size: 1.5rem;
      }

      p {
        font-size: 0.9rem;
      }
    }

    .market-heading {
      padding: 50px 20px;
    }

    .market-join {
      h1 {
        font-size: 1.5rem;
      }
      p {
        width: 90%;
        font-size: 1rem;
      }
    }
  }
`;
