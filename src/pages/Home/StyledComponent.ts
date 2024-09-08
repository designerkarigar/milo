import styled from "styled-components";

export const StyledFlexWrapper = styled.div`
  margin-top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-wrap: wrap;
  row-gap: 40px;
  padding-bottom: 60px;
  padding-top: 60px;
  background-color: transparent;

  @media (max-width: 790px) {
    flex-direction: column;
    justify-content: center;
    padding-top: 30px;
  }
`;

export const StyledHome = styled.div`
  background-image: url("../../images/homepage.ong.png");
  width: 100%;
  display: flex;
  overflow-x: hidden;
  flex-direction: column;
  align-items: center;

  .home-navbar-con {
    width: 100%;
    background-color: #0066ba;
  }
`;
