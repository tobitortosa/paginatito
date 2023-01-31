import {
  GET_ALL_CLIENTS,
  CREATE_NEW_CLIENT,
  EDIT_CLIENT,
  DELETE_CLIENT,
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
} from "./actionsTypes";
import axios from "axios";

const url = "http://localhost:3001";

//Clients actions

export const getAllClients = () => async (dispatch) => {
  let allClients = await axios.get(`${url}/clientes`);
  return dispatch({ type: GET_ALL_CLIENTS, payload: allClients.data });
};

export const createNewClient = (obj) => async (dispatch) => {
  await axios.post(`${url}/clientes`, obj);
  return dispatch({ type: CREATE_NEW_CLIENT });
};

export const editClient = (id) => async (dispatch) => {
  await axios.put(`${url}/clientes`, id);
  return dispatch({ type: EDIT_CLIENT });
};

export const deleteClient = (id) => async (dispatch) => {
  await axios.post(`${url}/clientes/delete`, { id: id });
  return dispatch({ type: DELETE_CLIENT });
};

// Products actions

export const getAllProducts = () => async (dispatch) => {
  let allProducts = await axios.get(`${url}/productos`);
  return dispatch({ type: GET_ALL_PRODUCTS, payload: allProducts.data });
};

export const createNewProduct = (obj) => async (dispatch) => {
  await axios.post(`${url}/productos`, obj);
  return dispatch({ type: CREATE_PRODUCT });
};

export const editProduct = (id) => async (dispatch) => {
  await axios.put(`${url}/productos`, id);
  return dispatch({ type: EDIT_PRODUCT });
};
