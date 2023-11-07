import { createAction, createReducer } from "@reduxjs/toolkit";

export const login = createAction("LOGIN");
export const logout = createAction("LOGOUT");
export const addToMyList = createAction("ADD_TO_MY_LIST");
export const removeToMyList = createAction("REMOVE_TO_MY_LIST");

const initialState = {
  name: null,
  lastname: null,
  email: null,
  myList: [],
};

const userReducer = createReducer(initialState, {
  [login]: (state, action) => {
    action.payload, (state.myList = []);
  },
  [logout]: (state, action) => {
    state.name = null;
    state.lastname = null;
    state.email = null;
    state.myList = null;
  },
  [addToMyList]: (state, action) => {
    return { ...state, myList: [...state.myList, action.payload] };
  },
  [removeToMyList]: (state, action) => {
    return {
      ...state,
      myList: state.myList.filter((fav) => fav.id !== action.payload.id),
    };
  },
});

export default userReducer;
