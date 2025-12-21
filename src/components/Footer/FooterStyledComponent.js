import styled from "styled-components";

export const StyledFooter = styled.div`
  width: 100%;
  background-color: #0066ba;
  position: relative;

  .footer-wave {
    transform: scaleX(-1);
    position: static;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
  }

  .footer-wave svg {
    position: relative;
    display: block;
    width: calc(151% + 1.3px);
    height: 108px;
    transform: rotateY(180deg);
  }

  .footer-wave .shape-fill {
    fill: #ffffff;
  }

  .yellow {
    color: #f1c21b;
  }
  .footer-con {
    width: 100%;
    display: flex;
    position: relative;
    padding: 10px 0px;
  }

  .footer-paws {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: auto;
    opacity: 0.3;
    z-index: 0;
    pointer-events: none;
  }

  .footer-paws {
    /* All animations disabled - keeping static */
    animation: none !important;
    
    .paw-path {
      /* Animation removed - keeping static */
      animation: none !important;
      transform: none !important;
      transform-origin: center;
    }
  }

  .footer-content {
    width: 100%;
    display: flex;
    padding-top: 70px;
    flex-direction: column;
    row-gap: 10px;
    padding: 0px 40px;
    background-image: url();
    position: relative;
    z-index: 1;
    /* Ensure no animations in footer content area */
    animation: none !important;
    
    * {
      animation: none !important;
      transition: none !important;
    }
  }

  .heading-con {
    animation: none !important;
    
    h1 {
      color: white;
      font-size: 3rem;
      animation: none !important;
      transform: none !important;
    }
  }

  .foot-link-con {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
    animation: none !important;
  }

  .contact-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    list-style: none;
    animation: none !important;

    li,
    a {
      text-decoration: none !important;
      color: white !important;
      padding: 5px 0px;
      font-size: 18px;
      cursor: pointer;
      animation: none !important;
      transform: none !important;
    }
  }

  .footer-icon {
    margin-right: 20px;
    animation: none !important;
    transform: none !important;
  }

  .footer-nav {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    animation: none !important;
  }

  .footer-navbar {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    list-style: none;
    flex-wrap: wrap;
    row-gap: 10px;
    animation: none !important;

    li,
    a {
      display: flex;
      height: fit-content;
      width: fit-content;
      justify-content: center;
      align-items: center;
      text-decoration: none;
      cursor: pointer;
      padding: 0px 15px;
      color: white;
      font-size: 18px;
      animation: none !important;
      transform: none !important;
    }
  }

  .app-link {
    list-style: none;

    li {
      color: white;
    }
  }

  .line {
    width: 100%;
    border-top: solid 1px white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-top: 20px;
    /* Ensure no animations affect this section */
    animation: none !important;
    transform: none !important;

    ul {
      display: flex;
      flex-direction: row;
      list-style: none;
      column-gap: 30px;
      font-size: 30px;
      color: white;
      align-items: center;
      /* Ensure no animations */
      animation: none !important;
      transform: none !important;
    }

    a {
      text-decoration: none;
      color: white;
      /* Ensure no animations */
      animation: none !important;
      transform: none !important;
    }
    p {
      color: white;
      font-size: 20px;
      text-align: center;
      /* Ensure no animations */
      animation: none !important;
      transform: none !important;
    }
  }

  @media (max-width: 700px) {
    .line {
      flex-direction: column;
      align-items: center;
      row-gap: 15px;
    }

    .footer-navbar {
      flex-direction: column;
    }

    .foot-link-con {
      flex-direction: column;
      row-gap: 30px;
    }

    .contact-list {
      align-self: flex-start;
      li,
      a {
        text-align: left;
      }
    }
    .footer-nav {
      width: 100%;
    }

    .footer-navbar {
      flex-direction: row;
      justify-content: space-between;
      li,
      a {
        padding: 0px 0px;
        text-align: right;
      }
    }
  }

  @media (max-width: 500px) {
    .footer-content {
      padding: 0px 15px;
    }
    .heading-con {
      h1 {
        font-size: 2rem;
      }
    }

    .contact-list {
      li,
      a {
        font-size: 16px;
      }
    }

    .footer-navbar {
      column-gap: 5px;

      a,
      li {
        font-size: 16px;
      }
    }
  }

  .line {
    row-gap: 5px;
    ul,
    a {
      font-size: 25px;
    }
    p {
      font-size: 15px;
    }
  }
`;
