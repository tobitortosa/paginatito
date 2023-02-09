import {
  GET_ALL_CLIENTS,
  GET_ALL_PRODUCTS,
  GET_ALL_PEDIDOS,
} from "../actions/actionsTypes";

export const initialState = {
  allClients: [],
  allProducts: [],
  allPedidos: [],
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
    case GET_ALL_PEDIDOS:
      return {
        ...state,
        allPedidos: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
