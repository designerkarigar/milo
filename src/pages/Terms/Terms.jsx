import React from "react";
import { TermsStyled } from "./styledComponent";
import NewNavbar from "../../components/Navbar";
import Footer from "../../components/Footer";
export const Terms = () => {
  return (
    <>
      <TermsStyled>
        <div className="terms-nav-con">
          <NewNavbar />
        </div>
        <div></div>
      </TermsStyled>
      <Footer />
    </>
  );
};
