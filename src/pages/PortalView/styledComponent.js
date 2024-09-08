import styled from "styled-components";

export const StyledPortal = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;

  .ql-toolbar {
    max-width: 900px;
    width: 100%;
    border: none;
  }

  .editor {
    min-height: 100vh;
    max-width: 900px;
    width: 100%;

    .ql-container {
      border: none;
    }
    .ql-editor.ql-blank::before {
      font-size: 20px;
    }
  }
  .Buttons {
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
`;
