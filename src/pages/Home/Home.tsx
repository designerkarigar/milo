import { StyledHome } from "./StyledComponent";
import BlogSection from "../../components/BlogSection/index";
import Testimonial from "../../components/Testimonial";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/index";
import Banner from "../../components/Banner/index";
import Features from "../../components/Features/index";
import { SEO } from "../../components/SEO";

export const HomePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Milo",
    "description": "India's leading pet care platform offering comprehensive services for all pets - dogs, cats, birds, fish, horses, cows, goats, and more. Find veterinarians, pet daycare creches, pet breeding, and NGO connections for every pet type.",
    "url": "https://milo.social",
    "logo": "https://milo.social/favicon.png",
    "sameAs": [
      "https://www.facebook.com/profile.php?id=100090751023297",
      "https://www.instagram.com/milo.social.app/",
      "https://www.linkedin.com/company/milo-social/",
      "https://www.youtube.com/@milo.social"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-12345678",
      "contactType": "customer service",
      "email": "help@milo.social"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Gurugram",
      "addressCountry": "IN"
    }
  };

  return (
    <>
      <SEO
        title="Milo - Pet Care Platform | Find Vets, Pet Daycare, Grooming & Services for All Pets - Dogs, Cats, Birds, Fish, Horses & More"
        description="Milo is India's #1 pet care platform for all pets. Find trusted veterinarians for dogs, cats, birds, fish, horses, cows, goats, and more. Premium pet daycare, grooming services, breeding, and connect with pet NGOs. Complete pet care solutions for furry, feathered, and scaled companions."
        keywords="pet care, vet, veterinarians, pet daycare, creches, dogs, cats, birds, fish, horses, cows, goats, reptiles, farm animals, NGO, breeding, matching, pet services, pet boarding, pet grooming, animal care, pet breeding, all pets"
        url="https://milo.social"
        structuredData={structuredData}
      />
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
