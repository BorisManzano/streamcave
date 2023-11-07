import { createAction, createReducer } from "@reduxjs/toolkit";

export const trendingTVSeries = createAction("TRENDINGTVSERIES");

const initialState = {
  data: null,
};

const seriesReducer = createReducer(initialState, {
  [trendingTVSeries]: (state, action) => {
    state.data = action;
  },
});

export default seriesReducer;
