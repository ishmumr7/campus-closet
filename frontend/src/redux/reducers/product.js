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
      }
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
    .addCase("clearErrors", (state) => {
      return {
        ...state,
        error: null,
      }
    });
});
