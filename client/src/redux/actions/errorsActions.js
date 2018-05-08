import { GET_ERRORS } from "./actionTypes";

export const getErrors = error => ({
  type: GET_ERRORS,
  payload: error.response.data
});
