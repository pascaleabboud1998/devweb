import { ADD_COMMENT, GET_USER_COMMENTS, DELETE_COMMENT, COMMENTS_LOADING } from "../actions/types";

const initialState = {
  comments: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case COMMENTS_LOADING:
      return { ...state, loading: true };
    case ADD_COMMENT:
      return { ...state, comments: [action.payload, ...state.comments] };
    case DELETE_COMMENT:
      return { ...state, comments: state.comments.filter(c => c._id !== action.payload) };
    case GET_USER_COMMENTS:
      return {
        ...state,
        comments: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
