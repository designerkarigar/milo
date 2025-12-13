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

  .footer-paws .paw-path {
    animation: pawMove 3s ease-in-out infinite;
    transform-origin: center;
  }

  .footer-paws .paw-path:nth-child(1) {
    animation-delay: 0s;
  }
  .footer-paws .paw-path:nth-child(2) {
    animation-delay: 0.15s;
  }
  .footer-paws .paw-path:nth-child(3) {
    animation-delay: 0.3s;
  }
  .footer-paws .paw-path:nth-child(4) {
    animation-delay: 0.45s;
  }
  .footer-paws .paw-path:nth-child(5) {
    animation-delay: 0.6s;
  }
  .footer-paws .paw-path:nth-child(6) {
    animation-delay: 0.75s;
  }
  .footer-paws .paw-path:nth-child(7) {
    animation-delay: 0.9s;
  }
  .footer-paws .paw-path:nth-child(8) {
    animation-delay: 1.05s;
  }
  .footer-paws .paw-path:nth-child(9) {
    animation-delay: 1.2s;
  }
  .footer-paws .paw-path:nth-child(10) {
    animation-delay: 1.35s;
  }
  .footer-paws .paw-path:nth-child(11) {
    animation-delay: 1.5s;
  }
  .footer-paws .paw-path:nth-child(12) {
    animation-delay: 1.65s;
  }
  .footer-paws .paw-path:nth-child(13) {
    animation-delay: 1.8s;
  }
  .footer-paws .paw-path:nth-child(14) {
    animation-delay: 1.95s;
  }
  .footer-paws .paw-path:nth-child(15) {
    animation-delay: 2.1s;
  }
  .footer-paws .paw-path:nth-child(16) {
    animation-delay: 2.25s;
  }
  .footer-paws .paw-path:nth-child(17) {
    animation-delay: 2.4s;
  }
  .footer-paws .paw-path:nth-child(18) {
    animation-delay: 2.55s;
  }
  .footer-paws .paw-path:nth-child(19) {
    animation-delay: 2.7s;
  }
  .footer-paws .paw-path:nth-child(20) {
    animation-delay: 2.85s;
  }
  .footer-paws .paw-path:nth-child(n+21) {
    animation-delay: 3s;
  }

  @keyframes pawMove {
    0%, 100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(4px, -6px);
    }
    50% {
      transform: translate(-3px, 5px);
    }
    75% {
      transform: translate(3px, -4px);
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
  }

  .heading-con {
    h1 {
      color: white;
      font-size: 3rem;
    }
  }

  .foot-link-con {
    padding-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;
  }

  .contact-list {
    display: flex;
    flex-direction: column;
    justify-content: center;

    list-style: none;

    li,
    a {
      text-decoration: none !important;
      color: white !important;
      padding: 5px 0px;
      font-size: 18px;
      cursor: pointer;
    }
  }

  .footer-icon {
    margin-right: 20px;
  }

  .footer-nav {
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
  }

  .footer-navbar {
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    list-style: none;
    flex-wrap: wrap;
    row-gap: 10px;

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

    ul {
      display: flex;
      flex-direction: row;
      list-style: none;
      column-gap: 30px;
      font-size: 30px;
      color: white;
      align-items: center;
    }

    a {
      text-decoration: none;
      color: white;
    }
    p {
      color: white;
      font-size: 20px;
      text-align: center;
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
