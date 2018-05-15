import axios from "axios";
import { ADD_POST } from "./actionTypes";
import { getErrors } from "./errorsActions";

const _addPost = postData => ({
  type: ADD_POST,
  payload: postData
});

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res => dispatch(_addPost(res.data)))
    .catch(err => dispatch(getErrors(err)));
};
