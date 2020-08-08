import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

//Types
export const GET_USERS = 'GET_USERS';
export const GET_SINGLE_USER = 'GET_SINGLE_USER';
export const OPEN_MODAL = 'TOGGLE_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

const initialState = {
  users: null,
  modal: false,
  user: null,
};

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function openModal() {
    dispatch({
      type: OPEN_MODAL,
    });
  }
  function closeModal() {
    dispatch({
      type: CLOSE_MODAL,
    });
  }

  async function getAllUsers(page) {
    const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  }
  async function getSingleUser(id) {
    const res = await axios.get(`https://reqres.in/api/users/${id}`);
    openModal();
    dispatch({
      type: GET_SINGLE_USER,
      payload: res.data,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        user: state.user,
        modal: state.modal,
        getAllUsers,
        getSingleUser,
        closeModal
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
