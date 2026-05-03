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

  a {
    text-decoration: none;
    color: inherit;
    display: inline-block;
  }

  .logo {
    width: 150px;
    margin-left: 40px;
    cursor: pointer;
    display: block;
    @media (max-width: 1280px) {
      width: 120px;
      margin-left: 20px;
    }
  }

  .logo-link {
    display: inline-block;
  }

  .nav-bar-con {
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 40px;
    transition: none !important;
    animation: none !important;
    transform: none !important;

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
    border: none;
    border-radius: 15px;
    margin-left: 15px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      text-decoration: none;
    }
  }

  .login-btn {
    /* Apply Sign In button styles to Login button */
    font-size: 1.3rem;
    font-weight: 600;
    color: black;
    padding: 10px 20px;
    background-color: white;
    border: none;
    border-radius: 15px;
    margin-left: 15px;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-decoration: none;
    display: inline-block;

    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      background-color: #f8f9fa;
    }

    &:active {
      transform: scale(0.98);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }
  }

  .burger-icon {
    height: 100%;
    width: 20px;
    display: none;
    transition: none !important;
    animation: none !important;
    transform: none !important;

    img {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
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

    .res-list-item-btn {
      border: none;
      background: transparent;
      cursor: pointer;
      font-size: 1.4rem;
      color: #0066ba;
      padding: 0;
      font-family: inherit;
    }
  }

  .close {
    font-size: 50px;
    color: #0066ba;
    position: absolute;
    top: 15px;
    right: 15px;
    transition: none !important;
    animation: none !important;
    transform: none !important;

    svg {
      transition: none !important;
      animation: none !important;
      transform: none !important;
    }
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

  .user-avatar-container {
    position: relative;
    margin-left: 15px;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    border: 2px solid white;
    background: white;
    color: #0066ba;
    font-weight: 700;
    font-size: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    border-style: solid;
    animation: none !important;
    transition: none !important;
    transform: none !important;

    &:hover {
      transform: none !important;
      box-shadow: none !important;
    }
  }

  .user-menu {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 150px;
    z-index: 1000;
    overflow: hidden;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }

  .user-menu-item {
    display: block;
    width: 100%;
    padding: 12px 20px;
    border: none;
    background: none;
    text-align: left;
    cursor: pointer;
    font-size: 1rem;
    color: #333;
    text-decoration: none;
    transition: background-color 0.2s ease;
    font-family: inherit;

    &:hover {
      background-color: #f5f5f5;
    }

    &:first-child {
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
    }

    &:last-child {
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
    }

    &:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.05);
    }
  }

  .res-user-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    margin-top: 20px;
  }

  .res-user-avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
    border: none;
    background: white;
    color: #0066ba;
    border: 2px solid #f06a8a;
  }

  .res-user-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }

  .res-profile-switch {
    margin-top: 35px;
    margin-bottom: 28px;
    display: inline-flex;
    align-items: center;
    gap: 0;
    border: none;
    background: transparent;
    color: #0066ba;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }

  .res-profile-avatar {
    width: 42px;
    height: 42px;
    border-radius: 50%;
    border: 2px solid #f06a8a;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    background: white;
  }

  .res-profile-view {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .res-back-btn {
    margin-top: 55px;
    margin-bottom: 20px;
    border: none;
    background: transparent;
    color: #0066ba;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
  }
`;
