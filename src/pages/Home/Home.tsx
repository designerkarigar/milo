import { StyledHome } from "./StyledComponent";
import BlogSection from "../../components/BlogSection/index";
import Testimonial from "../../components/Testimonial";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/index";
import Banner from "../../components/Banner/index";
import Features from "../../components/Features/index";

export const HomePage = () => {
  return (
    <>
      <StyledHome>
        <div className="home-navbar-con">
          <Navbar />
        </div>
        <Banner />
        <Features />
        <Testimonial />
        <BlogSection />
      </StyledHome>
      <Footer />
    </>
  );
};
