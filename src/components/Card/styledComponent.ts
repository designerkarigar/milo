import styled from "styled-components";

export const StyledCard = styled.div`
  display: flex;
  width: 300px;
  aspect-ratio: 1/1.25;
  background-color: #e1e1e1;
  flex-direction: column;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
  margin: 0px 5px;
  row-gap: 20px;

  .img-container {
    overflow: hidden;
    width: 100%;
    border-radius: 5px;
    height: 60%;

    img {
      width: 100%;
      border-radius: 5px;
      background-color: black;
      height: 250px;
      transition: transform 0.3s ease;

      &:hover {
        transform: scale(1.1);
      }
    }
  }

  h3 {
    word-wrap: break-word;
    overflow-wrap: break-word;
    padding: 0px 10px;
    color: #252525;
  }

  a {
    text-decoration: none;
    color: black;
  }

  @media (max-width: 400px) {
    width: 200px;
    aspect-ratio: 1/1.25;

    h3 {
      font-size: 13px;
    }
  }
`;
