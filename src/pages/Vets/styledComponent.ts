import styled from "styled-components";

export const VetStyledComponent = styled.div`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;

  .vet-navbar {
    width: 100%;
    background-color: #0066ba;
  }
  .vet-banner {
    position: relative;
    width: 100%;
    padding-top: 150px;
    padding-bottom: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .vet-banner-content {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;

    margin-top: 0px;
    margin-bottom: 50px;
    flex-direction: column;
    row-gap: 30px;
    position: relative;
    h1 {
      width: fit-content;
      position: relative;
      color: #f1c21b;
      font-size: 3.5rem;
      font-family: Quicksand;
      text-align: center;
    }
    p {
      font-size: 1.3rem;
      font-family: Quicksand;
      text-align: center;
      line-height: 1.5;
      width: 70%;
    }
  }

  .vet-join-btn {
    display: flex;
    font-family: QuickSand, "Courier New", Courier, monospace;
    justify-content: center;
    font-size: 20px;
    background-color: #f06a8a;
    padding: 5px 15px;
    text-decoration: none;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }

  .vet-lines {
    position: absolute;
    top: 0;
    transform: translate(-90%, -70%) rotate(9deg);
    width: 70px;
    left: 0;
  }

  .vet-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .vet-wave svg {
    position: relative;
    display: block;
    width: calc(154% + 1.3px);
    height: 45px;
  }

  .vet-wave .shape-fill {
    fill: rgb(0, 102, 186);
  }

  .vet-card-con {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 50px;
    padding-top: 50px;
    padding-bottom: 100px;
  }

  .vet-big-card {
    width: 80%;
    position: relative;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
  }

  .big-card-text {
    font-family: Quicksand;
    margin-left: 100px;

    h1 {
      font-size: 3.5rem;
      color: rgb(241, 194, 27);
    }
    h3 {
      padding-top: 20px;
      font-size: 1.2rem;
    }
  }

  .vet-paws-big-card {
    position: absolute;
    bottom: 0;

    right: 0;
  }

  .vet-paws-small-card {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translateY(80%);
    width: 100px;
  }
  .vet-paws-big-card {
    width: 150px;
  }
  .vet-small-card-con {
    position: relative;
    width: 80%;
    display: flex;
    justify-content: space-between;

    flex-direction: row;
    align-items: center;
  }
  .vet-small-card {
    width: 45%;
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
    row-gap: 50px;
  }

  .small-card-text {
    font-family: Quicksand;
    text-align: center;
    padding: 0px 20px;

    h1 {
      font-size: 3.5rem;
      color: rgb(241, 194, 27);
    }
    h3 {
      padding-top: 10px;
      font-size: 1.2rem;
    }
  }

  .vet-big-img {
    width: 50%;
  }
  .vet-small-img {
    width: 100%;
  }

  @media (max-width: 1280px) {
  }
  @media (max-width: 980px) {
    .vet-big-card {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .big-card-text {
      margin-left: 0px;
      text-align: center;
    }
    .vet-banner-content {
      width: 90%;

      p {
        width: 100%;
        font-size: 1.2rem;
      }
      h1 {
        width: 100%;
        font-size: 2rem;
      }
    }

    .vet-join-btn {
      font-size: 18px;
    }

    .vet-lines {
      display: none;
    }
  }
  @media (max-width: 600px) {
    .vet-paws-big-card {
      display: none;
    }

    .vet-paws-small-card {
      display: none;
    }

    .vet-small-card-con {
      flex-direction: column;
    }

    .vet-small-card {
      width: 80%;
    }

    .vet-big-card {
      width: 80%;
      row-gap: 50px;

      .vet-big-img {
        width: 100%;
      }
    }

    .vet-small-card-con {
      width: 100%;
      row-gap: 50px;
    }

    .big-card-text {
      h1 {
        font-size: 2.5rem;
      }
      h3 {
        font-size: 1rem;
      }
    }
    .small-card-text {
      h1 {
        font-size: 2.5rem;
      }
      h3 {
        font-size: 1rem;
      }
    }
  }
  @media (max-width: 400px) {
  }
`;
