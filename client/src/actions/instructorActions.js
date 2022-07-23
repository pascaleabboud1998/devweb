import axios from "axios"

import {
  INSTRUCTOR_PROFILE_LOADING,
  GET_INSTRUCTOR_PROFILE,
  GET_INSTRUCTOR_PROFILES,
  CLEAR_CURRENT_PROFILE,
  GET_ERRORS,
  SET_CURRENT_USER,
  CLEAR_INSTRUCTOR_PROFILE,
} from "./types"

export const getInstructorProfile = () => (dispatch) => {
  dispatch(setProfileLoading())
  axios
    .get("/api/instructor")
    .then((res) =>
      dispatch({ type: GET_INSTRUCTOR_PROFILE, payload: res.data })
    )
    .catch((err) => dispatch({ type: GET_INSTRUCTOR_PROFILE, payload: {} }))
}

// Create Profile
export const createInstructorProfile = (profileData, history) => (dispatch) => {
  axios
    .post("/api/instructor", profileData)
    .then((res) => history.push("/dashboard"))
    .catch((err) => dispatch({ type: GET_ERRORS, payload: err.response.data }))
}

// Profile loading
export const setProfileLoading = () => {
  return {
    type: INSTRUCTOR_PROFILE_LOADING,
  }
}

// Clear current profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  }
}

// GET ALL PROFILES
export const getInstructorProfiles = () => (dispatch) => {
  dispatch(setProfileLoading())
  axios
    .get(`/api/instructor/all`)
    .then((res) =>
      dispatch({ type: GET_INSTRUCTOR_PROFILES, payload: res.data })
    )
    .catch((err) => dispatch({ type: GET_INSTRUCTOR_PROFILES, payload: {} }))
}

// Delete Profile
export const deleteInstructorProfile = () => (dispatch) => {
  if (window.confirm("Are you sure you want to delete your profile?")) {
    axios
      .delete("api/instructor/profile")
      .then((res) => dispatch({ type: CLEAR_INSTRUCTOR_PROFILE, payload: {} }))
      .catch((err) =>
        dispatch({ type: GET_ERRORS, payload: err.response.data })
      )
  }
}

// Delete Account & Profile
export const deleteInstructorAccount = () => (dispatch) => {
  if (
    window.confirm(
      "Are you sure you want to delete your account? This can't be undone"
    )
  ) {
    axios
      .delete("api/instructor/profile")
      .then((res) => dispatch({ type: SET_CURRENT_USER, payload: {} }))
      .catch((err) =>
        dispatch({ type: GET_ERRORS, payload: err.response.data })
      )
  }
}
