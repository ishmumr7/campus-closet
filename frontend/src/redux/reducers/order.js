import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    // get all orders of user
    .addCase('getAllOrdersUserRequest', (state) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase('getAllOrdersUserSuccess', (state, action) => {
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    })
    .addCase('getAllOrdersUserFailed', (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    })

    // Get all orders of a seller
    .addCase('getAllOrdersShopRequest', (state) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase('getAllOrdersShopSuccess', (state, action) => {
      return {
        ...state,
        isLoading: false,
        orders: action.payload,
      };
    })
    .addCase('getAllOrdersShopFailed', (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    })

    // get all orders for admin
    .addCase('adminAllOrdersRequest', (state) => {
      return {
        ...state,
        adminOrderLoading: true,
      };
    })
    .addCase('adminAllOrdersSuccess', (state, action) => {
      return {
        ...state,
        adminOrderLoading: false,
        adminOrders: action.payload,
      };
    })
    .addCase('adminAllOrdersFailed', (state, action) => {
      return {
        ...state,
        adminOrderLoading: false,
        error: action.payload,
      };
    })    

    // Clear Errors
    .addCase('clearErrors', (state) => {
      return {
        ...state,
        error: null,
      };
    });
});
