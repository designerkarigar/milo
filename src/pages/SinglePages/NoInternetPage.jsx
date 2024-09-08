import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NoInternetPageImage from "../../images/NoInternetImage.jpeg";

const StyledNoInternet = styled.div`
  width: 100%;
  height: 100vh;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    @media (max-width: 1980px) {
      width: 1000px;
    }

    @media (max-width: 1280px) {
      width: 800px;
    }
    @media (max-width: 980px) {
      width: 500px;
    }
    @media (max-width: 600px) {
      width: 400px;
    }
    @media (max-width: 600px) {
      width: 300px;
    }
    @media (max-width: 300px) {
      width: 150px;
    }
  }
`;

const NoInternetPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(async () => {
      try {
        const response = await axios.get(
          "https://dns.google.com/resolve?name=www.google.com"
        );
        if (response.status === 200) {
          navigate("/home");
          clearInterval(intervalId);
        }
      } catch (error) {
        console.error("Error checking internet connection:", error);
      }
    }, 3000);

    return () => {
      clearInterval(intervalId);
    };
  }, [navigate]);

  return (
    <StyledNoInternet>
      <img src={NoInternetPageImage} alt="" />
    </StyledNoInternet>
  );
};

export default NoInternetPage;
