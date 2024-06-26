import React, { useEffect, useState } from 'react'
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import ProductDetails from '../components/Products/ProductDetails';
import SuggestedProduct from '../components/Products/SuggestedProduct';
import { useParams, useSearchParams } from 'react-router-dom';
import { productData } from '../static/data';
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from '../redux/actions/product';

const ProductDetailsPage = () => {
  const { allProducts } = useSelector((state) => state.products);
  const { allEvents } = useSelector((state) => state.events);
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (eventData !== null) {
      const data = allEvents && allEvents.find((i) => i._id === id);
      setData(data);
    } else {
      const data = allProducts && allProducts.find((i) => i._id === id);
      setData(data);
    }
  }, [id, allProducts, allEvents, eventData]);

  return (
    <div>
      <Header />
      <ProductDetails data={data} />
        {
          !eventData && (
            <>
            {data && <SuggestedProduct data={data} />}
            </>
          )
        }
      <Footer />
    </div>
  )
}

export default ProductDetailsPage;