import { GET_USERS } from './GlobalState';

const AppReducer = (state, action) => {
  switch (action.type) {
    case GET_USERS:
      {
        console.log('reducer', action.payload);
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

      break;

    default:
      return state;
  }
};

export default AppReducer;
