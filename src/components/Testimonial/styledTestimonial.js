import styled from "styled-components";

export const StyledTestimonial = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: #4d565d;
  background-color: white;
  padding: 30px 0px;
  position: relative;

  .test-main-con {
    position: relative;
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    background-color: #4d565d;
    margin: 50px 0px;
    padding: 30px 10px;
    position: relative;
    min-height: 80vh;
    height: auto;
    background-repeat: no-repeat;
    background-size: cover;
  }

  .test-heading {
    color: white;
    width: 70%;
    z-index: 2;
  }

  .test-heading h1 {
    font-family: Quicksand;
    text-align: center;
    font-size: 3rem;
    z-index: 2;
  }

  .test-logo-con {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    width: 70%;
    min-width: 1110px;
    justify-content: space-evenly;
    margin: 40px 0px;
    z-index: 2;
  }
  .test-bg-img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .test-shade {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 102, 186, 0.5);
    z-index: 1;
  }

  .test-logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 30%;
    z-index: 2;
  }

  .test-logo img {
    width: 100px;
    z-index: 3;
  }

  .logo-heading-numeric {
    color: #ffcc42;
    font-size: 2.5rem;
    z-index: 2;
    font-family: Quicksand;
  }

  .logo-heading {
    color: white;
    font-size: 1.7rem;
    text-align: center;
    z-index: 2;
    font-family: Quicksand;
  }

  .test-text-con {
    width: 40%;
    line-height: 1.6;
    font-size: 1.3rem;
    text-align: center;
    line-height: 1.5;
    z-index: 3;
    font-family: Quicksand;
  }

  .test-text {
    color: white;
    font-style: italic;
  }

  .by {
    color: #00acc6;
    font-size: 20px;
    font-weight: 900;
    font-style: italic;
  }

  .by::before {
    content: "";
  }

  .test-bg-img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .bg-img img {
    width: 100%;
  }

  @media (max-width: 1000px) {
    .test-logo-con {
      width: 80%;
      min-width: 795px;
    }

    .test-text-con {
      width: 70%;
    }
  }

  @media (max-width: 700px) {
    .test-logo-con {
      width: 90%;
      min-width: 623px;
    }

    .test-text-con {
    }

    .test-heading {
      width: 90%;
    }
  }

  @media (max-width: 600px) {
    .test-logo-con {
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .test-heading {
      width: 90%;
    }
    .test-text-con {
      width: 90%;
      row-gap: 70px;
    }

    .test-logo img {
      display: none;
    }

    .test-heading h1 {
      font-size: 2rem;
    }
  }
`;
