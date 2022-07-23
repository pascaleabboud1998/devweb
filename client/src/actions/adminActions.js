import axios from "axios";
import { ADMIN_LOADING, DELETE_USER, GET_ALL_USERS } from "./types";

export const getAllUsers = () => async dispatch => {
  dispatch({ type: ADMIN_LOADING });
  // call the api
  const usersRequest = await axios.get("/api/admin/users");
  // call dispatch
  dispatch({ type: GET_ALL_USERS, payload: usersRequest.data });
};

export const deleteUser = id => async dispatch => {
  // call the api
  const deleteRequest = await axios.delete(`/api/admin/users/${id}`);
  // call dispatch
  dispatch({ type: DELETE_USER, payload: deleteRequest.data });
};
