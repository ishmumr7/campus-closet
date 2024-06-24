import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: true,
  isAuthenticated: false,
  isSeller: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        isSeller: action.payload.role === "seller",
      };
    })
    .addCase("LoadUserFail", (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        isSeller: false,
      };
    })
    .addCase("clearErrors", (state) => {
      return {
        ...state,
        error: null,
      };
    });
});

// export const userReducer = createReducer(initialState, {
//   LoadUserRequest: (state) => {
//     state.loading = true;
//   },
//   LoadUserSuccess: (state, action) => {
//     state.isAuthenticated = true;
//     state.loading = false;
//     state.user = action.payload;
//   },
//   LoadUserFail: (state, action) => {
//     state.loading = false;
//     state.error = action.payload;
//     state.isAuthenticated = false;
//   },
//   clearErrors: (state) => {
//     state.error = null;
//   },
// });
