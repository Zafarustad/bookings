import {
  GET_USERS,
  GET_SINGLE_USER,
  OPEN_MODAL,
  CLOSE_MODAL,
  SET_ERRORS,
  CLEAR_MESSAGES,
  SET_SUCCESS_MESSAGE,
} from './GlobalState';

const AppReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS: {
      return {
        ...state,
        users:
          state.users === null
            ? action.payload
            : {
                ...action.payload,
                data: [...state.users.data, ...action.payload.data],
              },
      };
    }
    case OPEN_MODAL: {
      return {
        ...state,
        modal: true,
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        modal: false,
      };
    }
    case GET_SINGLE_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }

    case SET_SUCCESS_MESSAGE: {
      return {
        ...state,
        message: action.payload,
      };
    }
    case SET_ERRORS: {
      return {
        ...state,
        errors: action.payload,
      };
    }
    case CLEAR_MESSAGES: {
      return {
        ...state,
        errors: null,
        message: null,
      };
    }

    default:
      return state;
  }
};

export default AppReducer;
