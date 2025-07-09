import React from 'react';
import Navbar from '../components/landingPage/Navbar';
import HeroSection from '../components/landingPage/HeroSection';
import TrustedBy from '../components/landingPage/TrustedBy';
import Testimonials from '../components/landingPage/Testimonials';
import ExploreCourses from '../components/landingPage/ExploreCourses';
import TopCategories from '../components/landingPage/TopCategories';
import FAQSection from '../components/landingPage/FAQSection';
import Footer from '../components/landingPage/Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <TrustedBy />
      <ExploreCourses />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Home;
