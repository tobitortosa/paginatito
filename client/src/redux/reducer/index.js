import {
  GET_ALL_CLIENTS,
  EDIT_CLIENT,
  CREATE_NEW_CLIENT,
} from "../actions/actionsTypes";

export const initialState = {
  allClients: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return {
        ...state,
        allClients: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
