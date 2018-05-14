import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  //   PROFILE_NOT_FOUND,
  CLEAR_CURRENT_PROFILE,
  GET_PROFILES
  // SET_CURRENT_USER
} from "./actionTypes";
import { getErrors } from "./errorsActions";
import { setCurrentUser } from "./authActions";

// profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});
// get profile
export const getProfile = profileData => ({
  type: GET_PROFILE,
  payload: profileData
});
// get all profiles
export const getAllProfiles = profiles => ({
  type: GET_PROFILES,
  payload: profiles
});
// clear current profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile({})));
};

// get profile by its handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile(null)));
};

// get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile/all")
    .then(res => dispatch(getAllProfiles(res.data)))
    .catch(err => dispatch(getAllProfiles({})));
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch(getErrors(err)));
};

// add Experience
export const addExperience = (experienceData, history) => dispatch => {
  axios
    .post("/api/profile/experience", experienceData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch(getErrors(err)));
};
// edit experience
export const editExperience = (experienceData, id, history) => dispatch => {
  axios
    .patch(`/api/profile/experience/${id}`, experienceData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch(getErrors(err)));
};
// delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getErrors(err)));
};

// add Education
export const addEducation = (educationData, history) => dispatch => {
  axios
    .post("/api/profile/education", educationData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch(getErrors(err)));
};
// edit Education
export const editEducation = (educationData, id, history) => dispatch => {
  axios
    .patch(`/api/profile/education/${id}`, educationData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch(getErrors(err)));
};
// delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getErrors(err)));
};

// Delete profile & user
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure you want to delete your profile")) {
    axios
      .delete("/api/profile")
      .then(res => dispatch(setCurrentUser({})))
      .catch(err => dispatch(getErrors(err)));
  }
};
