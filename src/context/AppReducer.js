import {
  GET_USERS,
  GET_SINGLE_USER,
  OPEN_MODAL,
  CLOSE_MODAL,
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

    default:
      return state;
  }
};

export default AppReducer;
