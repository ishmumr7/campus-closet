import React from "react";
import Header from "./../components/Layout/Header";
import Hero from "./../components/Home/Hero/Hero";
import Categories from "./../components/Home/Categories/Categories";
import BestDeals from "./../components/Home/BestDeals/BestDeals";
import FeaturedProuct from "./../components/Home/FeaturedProuct/FeaturedProuct.jsx"

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
      <BestDeals />
      <FeaturedProuct />
    </div>
  );
};

export default HomePage;
