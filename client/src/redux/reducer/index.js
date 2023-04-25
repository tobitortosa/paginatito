import {
  GET_ALL_CLIENTS,
  GET_ALL_PRODUCTS,
  GET_ALL_PEDIDOS,
  GET_ALL_SUBPEDIDOS,
  GET_ALL_APORTESYGASTOS,
  LOGIN,
  CLEAR_LOGIN,
  GET_ALL_PCOSTS,
  GET_ALLPDETAILS,
} from "../actions/actionsTypes";

export const initialState = {
  loginObj: {},
  allClients: [],
  allProducts: [],
  allPedidos: [],
  allSubPedidos: [],
  allAportesYGastos: [],
  allPdetails: [],
  allPcosts: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        loginObj: action.payload,
      };
    case CLEAR_LOGIN:
      return {
        ...state,
        loginObj: {},
      };
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
    case GET_ALL_APORTESYGASTOS:
      return {
        ...state,
        allAportesYGastos: action.payload,
      };
    case GET_ALL_PCOSTS:
      return {
        ...state,
        allPcosts: action.payload,
      };
    case GET_ALLPDETAILS:
      return {
        ...state,
        allPdetails: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
