import {
  GET_ALL_CLIENTS,
  CREATE_NEW_CLIENT,
  EDIT_CLIENT,
  DELETE_CLIENT,
  GET_ALL_PRODUCTS,
  CREATE_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  GET_ALL_PEDIDOS,
  CREATE_PEDIDO,
  EDIT_PEDIDO,
  GET_ALL_SUBPEDIDOS,
  CREATE_SUBPEDIDO,
  EDIT_SUBPEDIDO,
  DELETE_SUBPEDIDO,
  DELETE_PEDIDO
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

export const editProduct = (obj) => async (dispatch) => {
  await axios.put(`${url}/productos`, obj);
  return dispatch({ type: EDIT_PRODUCT });
};

export const deleteProduct = (id) => async (dispatch) => {
  console.log(id);
  await axios.post(`${url}/productos/delete`, { id: id });
  return dispatch({ type: DELETE_PRODUCT });
};


// Pedidos actions

export const getAllPedidos = () => async (dispatch) => {
  let allPedidos = await axios.get(`${url}/pedidos`);
  return dispatch({ type: GET_ALL_PEDIDOS, payload: allPedidos.data });
};

export const createPedido = (obj) => async (dispatch) => {
  await axios.post(`${url}/pedidos`, obj);
  return dispatch({ type: CREATE_PEDIDO });
};

export const editPedido = (obj) => async (dispatch) => {
  await axios.put(`${url}/pedidos`, obj);
  return dispatch({ type: EDIT_PEDIDO });
};

export const deletePedido = (id) => async (dispatch) => {
  await axios.post(`${url}/pedidos/delete`, { id: id });
  return dispatch({ type: DELETE_PEDIDO });
};


// Sub Pedidos actions

export const getAllSubPedidos = () => async (dispatch) => {
  let allSubPedidos = await axios.get(`${url}/subpedidos`);
  return dispatch({ type: GET_ALL_SUBPEDIDOS, payload: allSubPedidos.data });
};

export const createSubPedido = (obj) => async (dispatch) => {
  await axios.post(`${url}/subpedidos`, obj);
  return dispatch({ type: CREATE_SUBPEDIDO });
};

export const editSubPedido = (obj) => async (dispatch) => {
  await axios.put(`${url}/subpedidos`, obj);
  return dispatch({ type: EDIT_SUBPEDIDO });
};

export const deleteSubPedido = (id) => async (dispatch) => {
  await axios.post(`${url}/subpedidos/delete`, { id: id });
  return dispatch({ type: DELETE_SUBPEDIDO });
};
