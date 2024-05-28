import React from "react";
import Header from "./../components/Layout/Header";
import Hero from "./../components/Home/Hero/Hero";
import Categories from "./../components/Home/Categories/Categories.jsx";

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1}/>
      <Hero />
      <Categories />
    </div>
  );
};

export default HomePage;
