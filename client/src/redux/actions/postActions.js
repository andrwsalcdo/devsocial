import axios from "axios";
import { ADD_POST, POST_LOADING, GET_POSTS, DELETE_POST } from "./actionTypes";
import { getErrors } from "./errorsActions";

const _addPost = postData => ({
  type: ADD_POST,
  payload: postData
});

const _getPosts = data => ({
  type: GET_POSTS,
  payload: data
});

const _deletePost = id => ({
  type: DELETE_POST,
  payload: id
});

const _setPostLoading = () => ({
  type: POST_LOADING
});

// Add Post
export const addPost = postData => dispatch => {
  axios
    .post("/api/posts", postData)
    .then(res => dispatch(_addPost(res.data)))
    .catch(err => dispatch(getErrors(err)));
};

// Get All Posts
export const getAllPosts = () => dispatch => {
  dispatch(_setPostLoading());
  axios
    .get("/api/posts")
    .then(res => dispatch(_getPosts(res.data)))
    .catch(err => dispatch(_getPosts(null)));
};
// delete post by id
export const deletePost = id => dispatch => {
  axios
    .delete(`/api/posts/${id}`)
    .then(res => dispatch(_deletePost(id)))
    .catch(err => dispatch(getErrors(err)));
};

// Add like
export const addLike = id => dispatch => {
  axios
    .post(`/api/posts/like/${id}`)
    .then(res => dispatch(getAllPosts()))
    .catch(err => dispatch(getErrors(err)));
};

// remove like
export const removeLike = id => dispatch => {
  axios
    .delete(`/api/posts/unlike/${id}`)
    .then(res => dispatch(getAllPosts()))
    .catch(err => dispatch(getErrors(err)));
};
