import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("productCreateRequest", (state) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase("productCreateSuccess", (state, action) => {
      return {
        ...state,
        isLoading: false,
        product: action.payload,
        success: true,
      };
    })
    .addCase("productCreateFail", (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };
    })
    
    // Get seller products
    .addCase("getAllProductsSellerRequest", (state) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase("getAllProductsSellerSuccess", (state, action) => {
      return {
        ...state,
        isLoading: false,
        products: action.payload,
      };
    })
    .addCase("getAllProductsSellerFail", (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    })

    // Delete product seller
    .addCase("deleteProductRequest", (state) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase("deleteProductSuccess", (state, action) => {
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    })
    .addCase("deleteProductFail", (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    })

    // Get all products
    .addCase("getAllProductsRequest", (state) => {
      return {
        ...state,
        isLoading: true,
      }
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      return {
        ...state,
        isLoading: false,
        allProducts: action.payload,
      }
    })
    .addCase("getAllProductsFail", (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }
    })

    // Clear errors
    .addCase("clearErrors", (state) => {
      return {
        ...state,
        error: null,
      };
    });
});
