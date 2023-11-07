import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./user";
import moviesReducer from "./movies";
import seriesReducer from "./tvSeries";
import trmReducer from "./topRatedM";

const store = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    tvSeries: seriesReducer,
    trm: trmReducer,
  },
});

export default store;
