import { GET_ALL_CLIENTS, GET_ALL_PRODUCTS } from "../actions/actionsTypes";

export const initialState = {
  allClients: [],
  allProducts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CLIENTS:
      return {
        ...state,
        allClients: action.payload,
      };
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        allProducts: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
