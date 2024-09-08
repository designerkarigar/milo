import styled from "styled-components";

export const StyledNavbar = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;
  .header {
    justify-content: space-between;
    padding: 20px 40px;
    background-color: transparent;
    display: flex;
    border-bottom: none;
  }

  .logo {
    width: 150px;
    margin-left: 40px;
    @media (max-width: 1280px) {
      width: 120px;
      margin-left: 20px;
    }
  }

  .nav-bar-con {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 40px;

    @media (max-width: 1280px) {
      margin-right: 20px;
    }
    @media (max-width: 980px) {
      display: none;
    }
  }

  .nav-bar {
    position: relative;
    list-style: none;
    display: flex;
    flex-direction: row;
    column-gap: 40px;
    align-items: baseline;
  }

  .nav-bar li:hover > .drop-down {
    opacity: 1;
    visibility: visible;
  }
  .drop-down {
    visibility: hidden;
    opacity: 0;
    margin-top: 20px;
    left: -30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    row-gap: 0px;
    width: 150px;
    overflow: hidden;
    border: 2px solid rgb(0, 102, 186, 0.8);

    border-radius: 20px;
    position: absolute;
    color: black;
    list-style: none;
    background-color: white;
    transition: all 0.3s ease;
  }

  .drop-list-item {
    padding: 10px 15px;
    &:hover {
      background-color: rgb(0, 102, 186, 0.7);
      color: white;
    }
    color: #5b6770;
    font-weight: 500;
    font-family: Arial, sans-serif;
    text-decoration: none;

    text-align: center;
  }

  .list-item {
    position: relative;
    font-size: 1.2rem;
    color: white;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
  }
  .underline {
    &:hover {
      &::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 100%;
        height: 1.5px;
        background-color: white;
      }
    }
  }
  .down {
    transition: transform 0.3s ease;

    &:hover {
      transform: rotate(180deg);
    }
  }

  .register-btn {
    font-size: 1.3rem;
    color: black;
    padding: 7px 10px;
    background-color: white;
    border-radius: 15px;
    margin-left: 15px;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      text-decoration: none;
    }
  }

  .burger-icon {
    height: 100%;
    width: 20px;
    display: none;
  }

  .res-navbar {
    position: absolute;
    top: 0;
    left: 0;
    transform: translateY(-100%);
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;

    background-color: white;
    transition: all 0.3s ease;

    .res-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      row-gap: 10px;

      a {
        font-size: 1.4rem;
      }
    }

    .res-list-item {
      text-decoration: none;
      color: #0066ba;
    }
  }

  .close {
    font-size: 50px;
    color: #0066ba;
    position: absolute;
    top: 15px;
    right: 15px;
  }

  .res-register-btn {
    margin-top: 50px;
    padding: 10px 20px;
    font-size: 1.5rem;
    background-color: #f06a8a;
    border-radius: 20px;
    color: white;
    text-decoration: none;
  }

  .visible {
    z-index: 100;
    transform: translateY(0);
  }

  @media (max-width: 1280) {
  }

  @media (max-width: 980px) {
    /* .res-navbar {
      display: block;
    } */
    .burger-icon {
      display: block;
      width: 50px;
      height: 50px;
      img {
        width: 100%;
      }
    }
  }
  @media (max-width: 600px) {
    .header {
      padding: 10px 15px;

      .logo {
        width: 90px;
        margin-left: 10px;
      }
    }
  }
`;
