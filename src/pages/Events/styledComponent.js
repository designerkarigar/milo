import styled from "styled-components";

export const EventsStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .event-top-con {
    position: relative;
    width: 100%;
    height: 70vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgb(0, 102, 186);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  /* .event-shade {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: rgba(0, 102, 186, 0.7);
  } */
  .event-nav-con {
    width: 100%;
    background-color: transparent;
  }

  .event-banner {
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

  .event-wave {
    z-index: 4;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .event-wave svg {
    position: relative;
    display: block;
    width: calc(151% + 1.3px);
    height: 102px;
    transform: rotateY(180deg);
  }

  .event-wave .shape-fill {
    fill: #ffffff;
  }

  .events-con {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    align-items: center;
  }

  .filter-con {
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 100%;
    background-color: red;
  }

  .filter {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 20px;

    input {
      height: 40px;
      border-radius: 10px;
      border: none;
      padding: 0px 20px;
      width: 70%;
    }
  }

  .event-data-con {
    padding: 100px 0px;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 30px;
  }

  .event-heading {
    text-align: center;
    color: #fecb02;
    font-family: Quicksand;
    font-size: 3rem;
    align-self: flex-start;
    margin-left: 5%;
    text-shadow: 2px 2px 1px rgba(0, 0, 0, 0.3);
  }
  .recent-events-con {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 30vh;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    width: 95%;
    transition: all 0.3s ease;
    border-radius: 40px;
    &:hover {
      transform: scale(1.02);
    }

    h1 {
      font-family: Quicksand;
      font-size: 2rem;
      text-align: center;
      color: black;
    }
  }
  .load-events {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 8px 15px;
    border-radius: 15px;
    background-color: #f06a8a;
    color: white;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 1280px) {
  }
  @media (max-width: 980px) {
    .event-banner {
      h1 {
        font-size: 3rem;
      }
    }

    .event-top-con {
      height: 50vh;
    }
  }
  @media (max-width: 600px) {
    .event-heading {
      font-size: 2rem;
    }

    .recent-events-con {
      h1 {
        font-size: 1.5rem;
      }
    }
  }
  @media (max-width: 400px) {
    .event-banner {
      h1 {
        font-size: 2rem;
      }
    }

    .event-top-con {
      height: 55vh;
    }

    .event-data-con {
      padding: 50px 0px;
    }
  }
`;
