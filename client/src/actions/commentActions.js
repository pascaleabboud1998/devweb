import axios from "axios";
import { COMMENTS_LOADING, GET_USER_COMMENTS, DELETE_COMMENT, ADD_COMMENT, GET_ERRORS } from "./types";

export const addComment = data => async dispatch => {
  try {
    const comment = await axios.post("/api/comment/", data);
    dispatch({ type: ADD_COMMENT, payload: comment.data });
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.response.data });
  }
};

export const deleteComment = id => async dispatch => {
  try {
    const deleteRequest = await axios.delete(`/api/comment/${id}`);
    dispatch({ type: DELETE_COMMENT, payload: deleteRequest.data });
  } catch (e) {
    console.log(e);
  }
};

export const getUserComments = handle => async dispatch => {
  try {
    dispatch({ type: COMMENTS_LOADING });
    const userComments = await axios.get("/api/comment/" + handle);
    dispatch({ type: GET_USER_COMMENTS, payload: userComments.data });
  } catch (e) {
    console.log(e);
  }
};
