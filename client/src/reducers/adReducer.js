import {
  GET_ADS,
  ADS_LOADING,
  DELETE_AD,
  ADD_AD,
  GET_JOB_APPLICATIONS,
  APPLY_TO_JOB,
  GET_USER_APPLIED_JOBS,
  GET_APPLIED_JOBS,
  // APPLICATIONS_LOADING,
} from "../actions/types"

const initialState = {
  ads: [],
  loading: false,
  appliedAds: [],
  applicationsLoading: false,
  userApplications: [],
  appliedUsers: [],
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADS:
      return {
        ...state,
        loading: false,
        ads: action.payload,
      }
    case ADS_LOADING:
      return {
        ...state,
        loading: true,
      }
    case DELETE_AD:
      return {
        ...state,
        ads: state.ads.filter((ad) => ad._id !== action.payload),
      }
    case ADD_AD:
      return {
        ...state,
        ads: [action.payload, ...state.ads],
      }
    case APPLY_TO_JOB:
      return {
        ...state,
        appliedAds: [...state.appliedAds, action.payload],
      }
    case GET_JOB_APPLICATIONS:
      return {
        ...state,
        appliedUsers: action.payload,
        loading: false,
      }
    case GET_USER_APPLIED_JOBS:
      return {
        ...state,
        appliedAds: action.payload,
        loading: false,
      }
    case GET_APPLIED_JOBS:
      return {
        ...state,
        userApplications: action.payload,
        loading: false,
      }
    // case APPLICATIONS_LOADING:
    //   return {
    //     ...state,
    //     applicationsLoading: true,
    //   }
    default:
      return state
  }
}
