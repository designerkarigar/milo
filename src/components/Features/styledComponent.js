import styled from "styled-components";

export const StyledFeatures = styled.div`
  .feature-main-con {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    row-gap: -100px;
  }

  .feature-bg-image {
    z-index: -1;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }

  .feature {
    display: flex;
    flex-direction: row;
    width: 90%;
    justify-content: space-between;
    align-items: center;
  }

  .feature:nth-child(3) {
    margin: -70px 0px;
    .feature-text {
      h1 {
        text-align: right;
      }
      p {
        text-align: right;
      }
    }
  }

  .feature-text {
    width: 40%;
    font-family: Quicksand;

    h1 {
      color: #f1c21b;
      font-size: 3.5rem;
      text-align: left;
    }
    p {
      padding: 30px 0px;
      font-size: 1.5rem;
    }
  }

  .feature-image {
    width: 50%;

    img {
      width: 100%;
      overflow: hidden;
    }
  }

  // RESPONSIVE CODE

  @media (max-width: 1280px) {
    .feature {
      justify-content: space-evenly;
    }
    .feature-text {
      h1 {
        font-size: 2rem;
      }

      p {
        font-size: 1.2rem;
        padding: 20px 0px;
      }
    }
  }

  @media (max-width: 800px) {
    .feature {
      width: 100%;
      justify-content: space-evenly;
    }

    .feature:nth-child(3) {
      margin: 0;
    }
    .feature-text {
      h1 {
        font-size: 2rem;
      }
      p {
        padding: 5px 0px;
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 600px) {
    .feature-bg-image {
      display: none;
    }
    .feature {
      flex-direction: column;
    }

    .feature-image {
      width: 90%;
      align-self: flex-start;
    }
    .feature-text {
      align-self: flex-end;
      margin-right: 20px;
      width: 80%;

      h1 {
        font-size: 2rem;
        text-align: right;
      }
      p {
        font-size: 1rem;
        text-align: right;
      }
    }

    .feature:nth-child(3) {
      .feature-text {
        order: 2;
        align-self: flex-start;
        margin-left: 20px;
        h1,
        p {
          text-align: left;
        }
      }
      .feature-image {
        align-self: flex-end;
      }
    }
  }

  @media (max-width: 400px) {
    .feature-text {
      align-self: flex-end;
      margin-right: 20px;
      width: 90%;

      h1 {
        font-size: 1.5rem;
        text-align: right;
      }
      p {
        font-size: 1rem;
        text-align: right;
        line-height: 1.2;
      }
    }
  }
`;
