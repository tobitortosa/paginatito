import {
  GET_ALL_CLIENTS,
  GET_ALL_PRODUCTS,
  GET_ALL_PEDIDOS,
  GET_ALL_SUBPEDIDOS,
} from "../actions/actionsTypes";

export const initialState = {
  allClients: [],
  allProducts: [],
  allPedidos: [],
  allSubPedidos: [],
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
    case GET_ALL_SUBPEDIDOS:
      return {
        ...state,
        allSubPedidos: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;