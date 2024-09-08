import styled from "styled-components";

export const StyledBlogSection = styled.div`
  width: 100%;

  .blog-main-container {
    position: relative;
    width: 100%;
    display: flex;
    background-color: white;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    padding-bottom: 50px;
  }

  .background {
    width: 40%;
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    z-index: 3;
  }

  .content-con {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    column-gap: 40px;
    background-image: url(../../images/svgfiles/dog_blog_bg.svg);
    background-repeat: no-repeat;
    background-size: contain;
  }
  .text-con {
    padding: 0px 50px;
    width: 45%;
    display: flex;
    flex-direction: column;
    row-gap: 0px;
    justify-content: center;
    font-weight: bolder;
  }

  .content-img {
    width: 50%;
  }

  .content-img img {
    width: 100%;
  }

  .blog-btn {
    margin-top: 30px;
    width: fit-content;
    padding: 10px 10px;
    background-color: #f06a8a;
    color: white;
    text-align: center;
    font-size: 18px;
    text-decoration: none;
    border-radius: 10px;

    transition: all 0.3 ease;
  }

  .small-heading {
    color: #ffcc42;
    font-size: 2rem;
    font-weight: 900;
  }

  .big-heading {
    color: #5b6770;
    font-weight: 900;
    font-size: 3rem;
  }
  .paragraph {
    line-height: 1.6;
    font-size: 1.2rem;
  }

  .card-con {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: center;
    align-items: center;
    column-gap: 40px;
    margin-top: 50px;
    margin-bottom: 50px;
    min-width: 1409px;
    flex-wrap: wrap;
  }
  .card {
    position: relative;
    width: 270px;
    height: 283px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
    font-style: normal;
    text-decoration: none;
    position: relative;
    overflow: hidden;
    border-radius: 40px;
  }

  .card-img {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 40px;
  }

  .card-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s ease;
    overflow: hidden;
    border-radius: 40px;
  }

  .card-img img:hover {
    transform: scale(1.1);
  }

  .card-text {
    position: absolute;
    bottom: 0;
    left: 0;
    display: block;
    width: 90%;
    height: fit-content;
    background-color: rgba(255, 255, 255, 0.7);
    font-size: 1.3rem;
    line-height: 1.2;
    padding: 20px 10px;
    text-align: center;
    word-wrap: break-word;
    color: #5b6770;
    font-weight: 500;
    font-family: brandon-grotesque, Helvetica Neue, Arial, sans-serif;
    transition: all 0.2s ease-in;

    /* &:hover {
    display: none;
  } */
  }

  @media (max-width: 1250px) {
    .content-con {
      /* flex-direction: column; */
    }
    .card-con {
      flex-wrap: wrap;
      min-width: 200px;
    }
    .card {
      margin: 30px 10px;
    }
  }

  @media (max-width: 800px) {
    .content-img {
      width: 90%;
      align-self: flex-end;
    }
    .text-con {
      width: 85%;
      order: 2;
    }
    .content-con {
      flex-direction: column;
      width: 100%;
      min-width: 100px;
      background-image: none;
    }
  }

  @media (max-width: 650px) {
    .paragraph {
      margin-top: 20px;
      font-size: 1rem;
      font-weight: 500;
    }
    .small-heading {
      font-size: 2rem;
    }
    .big-heading {
      line-height: 1;
      font-size: 3rem;
    }

    .blog-main-container {
      margin-top: 0;
    }

    .card-con {
      display: none;
    }

    .card {
      width: 100%;
      flex-direction: row;
      height: fit-content;
      margin: 5px 10px;
    }

    .card:nth-child(odd) {
      transform: none;
    }
    .card:nth-child(even) {
      transform: none;
    }
    .card-img {
      width: 60%;
      height: 100%;
    }

    .card-text {
      width: 100%;
    }
  }

  @media (max-width: 500px) {
    .card-img {
      display: none;
    }
    .text-con {
      width: 100%;
      padding: 0 20px;
    }
  }
`;
