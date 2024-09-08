import React from "react";
import styled from "styled-components";
import not_found_image from "../../images/svgfiles/page-not-found.svg";

const StyledNotFound = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  img {
    aspect-ratio: 1/1;
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

export const PageNotFound = () => {
  return (
    <StyledNotFound>
      <img src={not_found_image} alt="" />
    </StyledNotFound>
  );
};
