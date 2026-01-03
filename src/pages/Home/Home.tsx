import { StyledHome } from "./StyledComponent";
import BlogSection from "../../components/BlogSection/index";
import Testimonial from "../../components/Testimonial";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar/index";
import Banner from "../../components/Banner/index";
import Features from "../../components/Features/index";
import { SEO } from "../../components/SEO";
import allpetsVideo from "../../videos/allpets.mp4";

export const HomePage = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Milo",
    "description": "India's leading pet care platform offering comprehensive services for dogs, cats, and all pets including veterinarians, pet daycare creches, pet breeding, and NGO connections.",
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
        title="Milo - Pet Care Platform | Find Vets, Pet Daycare Creches, Pet Breeding & More for Dogs & Cats"
        description="Milo is India's #1 pet care platform. Find trusted veterinarians for your dogs and cats, premium pet daycare creches, responsible pet breeding services, and connect with pet NGOs. Complete pet care solutions for all your furry friends."
        keywords="pet, vet, creches, dogs, cats, NGO, breeding, matching, pet care, veterinarian, pet daycare, pet services, dog care, cat care, pet boarding, pet grooming, pet breeding, dog breeding, cat breeding"
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
