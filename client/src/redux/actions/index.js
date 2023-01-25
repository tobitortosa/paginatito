import {
  GET_ALL_CLIENTS,
  CREATE_NEW_CLIENT,
  EDIT_CLIENT,
  DELETE_CLIENT,
} from "./actionsTypes";
import axios from "axios";

export const getAllClients = () => async (dispatch) => {
  let allClients = await axios.get("http://localhost:3001/clientes");
  return dispatch({ type: GET_ALL_CLIENTS, payload: allClients.data });
};

export const createNewClient = (obj) => async (dispatch) => {
  await axios.post("http://localhost:3001/clientes", obj);
  return dispatch({ type: CREATE_NEW_CLIENT });
};

export const editClient = (id) => async (dispatch) => {
  await axios.put("http://localhost:3001/clientes", id);
  return dispatch({ type: EDIT_CLIENT });
};

export const deleteClient = (id) => async (dispatch) => {
  await axios.post("http://localhost:3001/clientes/delete", { id: id });
  return dispatch({ type: DELETE_CLIENT });
};
