import React, { createContext, useReducer } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';

//Types
export const GET_USERS = 'GET_USERS';
export const GET_SINGLE_USER = 'GET_SINGLE_USER';
export const OPEN_MODAL = 'TOGGLE_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const SET_SUCCESS_MESSAGE = 'SET_SUCCESS_MESSAGE';
export const SET_ERRORS = 'SET_ERRORS';
export const CLEAR_MESSAGES = 'CLEAR_MESSAGES';

const initialState = {
  users: null,
  modal: false,
  user: null,
  errors: null,
  message: null,
};

const uri = 'https://user-booking.herokuapp.com'

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
  function clearMessages() {
    dispatch({
      type: CLEAR_MESSAGES,
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

  async function bookSlot(data) {
    try {
      const res = await axios.post(`${uri}/booking`, data);
      dispatch({
        type: SET_SUCCESS_MESSAGE,
        payload: res.data.message,
      });
    } catch (err) {
      dispatch({
        type: SET_ERRORS,
        payload: err.response.data,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        users: state.users,
        user: state.user,
        modal: state.modal,
        errors: state.errors,
        message: state.message,
        getAllUsers,
        getSingleUser,
        closeModal,
        bookSlot,
        clearMessages,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
