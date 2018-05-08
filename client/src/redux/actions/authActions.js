import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthorizationHeader from "../../utils/setAuthorizationHeader";
import { getErrors } from "./errorsActions";
import { SET_CURRENT_USER } from "./actionTypes";

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch(getErrors(err)));
};

// Login - Get User Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      const { token } = res.data;
      // send token to ls
      localStorage.setItem("jwt-ds", token);
      // set auth header
      setAuthorizationHeader(token);
      // decode token to get user data
      const decodedUser = jwt_decode(token);
      // set current user
      dispatch(setCurrentUser(decodedUser));
    })
    .catch(err => dispatch(getErrors(err)));
};

// Set Logged in user
export const setCurrentUser = decodedUser => ({
  type: SET_CURRENT_USER,
  payload: decodedUser
});
