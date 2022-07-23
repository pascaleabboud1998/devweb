import {
  GET_ADS,
  ADD_AD,
  DELETE_AD,
  ADS_LOADING,
  GET_ERRORS,
  GET_JOB_APPLICATIONS,
  APPLY_TO_JOB,
  GET_USER_APPLIED_JOBS,
  GET_APPLIED_JOBS,
} from "./types"
import axios from "axios"

export const getAllAds = () => async (dispatch) => {
  dispatch({ type: ADS_LOADING, payload: null })
  try {
    // call the api
    const ads = await axios.get("/api/ads")
    dispatch({ type: GET_ADS, payload: ads.data })
  } catch (e) {
    // dispatch({ type: GET_ERRORS, payload: e.response.data });
  }
}

export const deleteAd = (id) => async (dispatch) => {
  console.log("deleted")
  try {
    const response = await axios.delete("/api/ads/" + id)
    console.log(response.data)
    dispatch({ type: DELETE_AD, payload: response.data.id })
  } catch (e) {
    console.log(e)
  }
}

export const addAd = (ad) => async (dispatch) => {
  try {
    // call the add api
    const Ad = await axios.post("/api/ads", ad)
    dispatch({ type: ADD_AD, payload: Ad.data })
  } catch (e) {
    dispatch({ type: GET_ERRORS, payload: e.response.data })
    console.log(e)
  }
}

export const getUserAds = () => async (dispatch) => {
  // loading
  dispatch({ type: ADS_LOADING })
  try {
    // call the api
    const ads = await axios.get("/api/ads/myads")
    dispatch({ type: GET_ADS, payload: ads.data })
  } catch (e) {
    console.log(e)
    console.log(e.message)
  }
}

// action to apply to job
export const applyToJob = (jobId, userId) => async (dispatch) => {
  //? loading
  try {
    // call the api
    const result = await axios.post(`/api/ads/apply/${jobId}`, {
      jobId,
      userId,
    })
    dispatch({ type: APPLY_TO_JOB, payload: jobId })
  } catch (e) {
    console.error(e)
    console.error(e.message)
    dispatch({ type: GET_ERRORS, payload: e.response.data })
  }
}

// action to get all applied jobs
export const getJobApplications = (id) => async (dispatch) => {
  //? loading
  // dispatch({ type: APPLICATIONS_LOADING })
  try {
    // call the api
    const result = await axios.get(`/api/ads/applications/${id}`)
    dispatch({
      type: GET_JOB_APPLICATIONS,
      payload: result.data.appliedUsers,
    })
  } catch (e) {
    console.error(e)
    console.error(e.message)
  }
}

// action to get all applied jobs
export const getUserJobApplications = () => async (dispatch) => {
  //? loading
  dispatch({ type: ADS_LOADING })
  try {
    // call the api
    const result = await axios.get(`/api/ads/myapplications?type=id`)
    dispatch({ type: GET_USER_APPLIED_JOBS, payload: result.data.appliedJobs })
  } catch (e) {
    console.error(e)
    console.error(e.message)
  }
}

// action to get all applied jobs
export const getAppliedJobs = () => async (dispatch) => {
  //? loading
  dispatch({ type: ADS_LOADING })
  try {
    // call the api
    const result = await axios.get(`/api/ads/myapplications`)
    dispatch({ type: GET_APPLIED_JOBS, payload: result.data.appliedJobs })
  } catch (e) {
    console.error(e)
    console.error(e.message)
  }
}
