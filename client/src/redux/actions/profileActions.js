import axios from "axios";
import {
  GET_PROFILE,
  //   GET_PROFILES,
  PROFILE_LOADING,
  //   PROFILE_NOT_FOUND,
  CLEAR_CURRENT_PROFILE
} from "./actionTypes";

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res => dispatch(getProfile(res.data)))
    .catch(err => dispatch(getProfile({})));
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
