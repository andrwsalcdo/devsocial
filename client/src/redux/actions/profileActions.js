import axios from "axios";
import {
  GET_PROFILE,
  //   GET_PROFILES,
  PROFILE_LOADING,
  //   PROFILE_NOT_FOUND,
  CLEAR_CURRENT_PROFILE
  // SET_CURRENT_USER
} from "./actionTypes";
import { getErrors } from "./errorsActions";
import { setCurrentUser } from "./authActions";

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile({})));
};

// Create Profile
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post("/api/profile", profileData)
    .then(res => history.push("/dashboard"))
    .catch(err => dispatch(getErrors(err)));
};

// profile loading
export const setProfileLoading = () => ({
  type: PROFILE_LOADING
});

// get profile
export const getProfile = profileData => ({
  type: GET_PROFILE,
  payload: profileData
});

// clear current profile
export const clearCurrentProfile = () => ({
  type: CLEAR_CURRENT_PROFILE
});

// Delete profile & user
export const deleteAccount = () => dispatch => {
  if (window.confirm("Are you sure you want to delete your profile")) {
    axios
      .delete("/api/profile")
      .then(res => dispatch(setCurrentUser({})))
      .catch(err => dispatch(getErrors(err)));
  }
};
