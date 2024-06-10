import React from "react";
import Header from "./../components/Layout/Header";
import Hero from "./../components/Home/Hero/Hero";
import Categories from "./../components/Home/Categories/Categories";
import BestDeals from "./../components/Home/BestDeals/BestDeals";
import FeaturedProuct from "./../components/Home/FeaturedProuct/FeaturedProuct";
import Sponsor from "./../components/Home/Sponsor/Sponsor";
import Footer from "../components/Layout/Footer.jsx";
import Events from "../components/Events/Events.jsx";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <Events />
      <FeaturedProuct />
      <Sponsor />
      <Footer />
    </div>
  );
};

export default HomePage;
