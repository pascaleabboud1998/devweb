import {
  GET_INSTRUCTOR_PROFILE,
  GET_INSTRUCTOR_PROFILES,
  INSTRUCTOR_PROFILE_LOADING,
  CLEAR_INSTRUCTOR_PROFILE,
} from "../actions/types"

const initialState = {
  profile: null,
  profiles: null,
  loading: false,
}

export default function (state = initialState, action) {
  switch (action.type) {
    case INSTRUCTOR_PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_INSTRUCTOR_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false,
      }
    case GET_INSTRUCTOR_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      }
    case CLEAR_INSTRUCTOR_PROFILE:
      return {
        ...state,
        profile: null,
      }
    default:
      return state
  }
}
