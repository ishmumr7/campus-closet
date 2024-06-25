import axios from "axios";
import { server } from "../../server";

//create product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "productCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/product/create-product`,
      newForm,
      config
    );
    dispatch({
      type: "productCreateSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "productCreateFail",
      payload: error.response.data.message,
    });
  }
};

//Get all products seller
export const getAllProductsSeller = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsSellerRequest",
    });

    const { data } = await axios.get(
      `${server}/product/get-all-products-seller/${id}`
    );
    dispatch({
      type: "getAllProductsSellerSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsSellerFail",
      payload: error.response.data.message,
    });
  }
};

// Delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });

    const { data } = await axios.delete(
      `${server}/product/delete-seller-product/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error.response.data.message,
    });
  }
};
