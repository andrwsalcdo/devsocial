import axios from "axios";
import { getErrors } from "./errorsActions";

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => dispatch(getErrors(err)));
};
