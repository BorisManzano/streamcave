import { createAction, createReducer } from "@reduxjs/toolkit";

export const topRatedM = createAction("TOPRATEDM");

const initialState = {
  data: null,
};

const trmReducer = createReducer(initialState, {
  [topRatedM]: (state, action) => {
    state.data = action;
  },
});

export default trmReducer;
