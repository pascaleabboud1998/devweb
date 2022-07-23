import { ADMIN_LOADING, DELETE_USER, GET_ALL_USERS } from "../actions/types";

const initialState = {
  users: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload),
      };
    case ADMIN_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
