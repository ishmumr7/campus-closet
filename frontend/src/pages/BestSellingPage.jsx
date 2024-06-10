import React, { useEffect, useState } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useSearchParams } from "react-router-dom";
import { productData } from "../static/data";
import styles from "../styles/styles";
import ProductCard from "../components/ProductCard/ProductCard";

const BestSellingPage = () => {
  const [bestData, setBestData] = useState([]);

  useEffect(() => {
    const d =
      productData && productData.sort((a, b) => b.total_sell - a.total_sell);
    setBestData(d);
  }, []);

  return (
    <div>
      <Header activeHeading={2} />
      <br />
      <br />

      <div className={styles.section}>
        <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
          {bestData &&
            bestData.map((i, index) => <ProductCard data={i} key={index} />)}
        </div>
        {bestData && bestData.length === 0 ? (
          <h1 className="text-center w-full pb-[100px] text-[20px]">
            No products Found!
          </h1>
        ) : null}
      </div>
      <Footer />
    </div>
  );
};

export default BestSellingPage;
