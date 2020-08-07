import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

export const GET_USERS = 'GET_USERS';

const initialState = {
  users: null,
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  async function getAllUsers(page) {
    const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  }

  return (
    <GlobalContext.Provider value={{ users: state.users, getAllUsers }}>
      {children}
    </GlobalContext.Provider>
  );
};
