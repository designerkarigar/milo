import styled from "styled-components";

export const StyledBlog = styled.div`
  .blog-main-con {
    position: relative;
    width: 100%;

    display: flex;
    flex-direction: column;
    padding: 50px 0px;
    align-items: center;
  }

  .blog-nav-con {
    width: 100%;
    background-color: #0066ba;
  }

  .heading {
    margin-top: 20px;
    h1 {
      position: relative;
      font-family: QuickSand, "Courier New", Courier, monospace;
      font-size: 4rem;
      width: auto;
      color: #fecb02;
    }
  }

  .blog-wave {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
  }

  .blog-wave svg {
    position: relative;
    display: block;
    width: calc(154% + 1.3px);
    height: 45px;
  }

  .blog-wave .shape-fill {
    fill: rgb(0, 102, 186);
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 40vh;
    color: red;
  }

  .card-con {
    padding: 50px 0px;
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-height: 40vh;
    row-gap: 30px;
    column-gap: 30px;
    align-items: center;
    justify-content: center;
  }

  .blog-card {
    position: relative;
    text-decoration: none;
    color: black;
    width: 270px;
    height: 283px;
    overflow: hidden;
    /* border: 1px solid gray; */
    box-shadow: 0 0 7px 0 rgba(0, 0, 0, 0.25);
    /* box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); */
    border-radius: 20px;
  }

  .blog-card-img {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;

    img {
      width: 100%;
      object-fit: cover;
    }
  }

  .blog-card-text-con {
    padding-top: 15px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgb(255, 255, 255, 0.7);
    height: fit-content;
    width: 100%;
    color: black;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  .blog-card-date {
    width: 90%;
    text-align: center;
    padding-bottom: 10px;
    font-size: 14px;
  }
  .blog-card-text {
    width: 90%;
    text-align: center;
    padding: 0px 10px;
    color: #5b6770;
    font-weight: 500;
    font-size: 1rem;
    font-family: brandon-grotesque, Helvetica Neue, Arial, sans-serif;
  }

  .no-blogs {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    height: 400px;
    color: black;
  }

  .load-more {
    display: flex;
    font-family: QuickSand, "Courier New", Courier, monospace;
    justify-content: center;
    font-size: 20px;
    background-color: #f06a8a;
    padding: 5px 15px;
    text-decoration: none;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 600px) {
    .card-con {
      width: 100%;
      flex-direction: column;
    }

    .blog-card {
      width: 90%;
    }

    .blog-card-img {
    }
  }

  @media (max-width: 400px) {
    .blog-card-img {
      display: none;
    }

    .card-con {
      row-gap: 10px;
    }

    .blog-card {
      border-radius: 10px;
    }

    .blog-card {
      height: fit-content;
    }

    .blog-card-text-con {
      padding: 0px 5px;
      position: static;
    }

    .blog-card-date {
      font-size: 8px;
      text-align: right;
      margin-bottom: 0;
      padding: 10px 0px;
    }
    .blog-card-text {
      text-align: left;
      padding: 0px 10px;
      padding-bottom: 10px;
      font-size: 0.8rem;
    }

    .heading {
      h1 {
        font-size: 2.5rem;
      }
    }
  }
`;
