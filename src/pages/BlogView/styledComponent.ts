import styled from "styled-components";

export const StyledBlogView = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  .blogview-nav-con {
    position: sticky;
    background-color: #0066ba;
    width: 100%;
  }

  .blog-fade-loader {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .editor {
    width: 100%;
    min-height: 100vh;
    max-width: 900px;
    padding-bottom: 50px;
    border: none;
    .ql-container {
      border: none;
    }
    .ql-editor.ql-blank::before {
      font-size: 30px;
      color: black;
      font-style: italic;
    }
  }
`;
