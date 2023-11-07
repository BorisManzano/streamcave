import { createAction, createReducer } from "@reduxjs/toolkit";

export const trendingMovies = createAction("TRENDINGMOVIES");

const initialState = {
  data: null,
};

const moviesReducer = createReducer(initialState, {
  [trendingMovies]: (state, action) => {
    state.data = action;
  },
});

export default moviesReducer;
