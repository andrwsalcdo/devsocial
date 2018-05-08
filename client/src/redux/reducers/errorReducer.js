import { GET_ERRORS } from "../actions/actionTypes";

const initialErrorState = {};

function errorReducer(state = initialErrorState, action) {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;
    default:
      return state;
  }
}

export default errorReducer;
