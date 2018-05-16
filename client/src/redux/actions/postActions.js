import axios from "axios";
import {
  ADD_POST,
  POST_LOADING,
  GET_POSTS,
  DELETE_POST,
  GET_POST
} from "./actionTypes";
import { getErrors } from "./errorsActions";

const _addPost = postData => ({
  type: ADD_POST,
  payload: postData
});

const _getPosts = data => ({
  type: GET_POSTS,
  payload: data
});

const _getPost = data => ({
  type: GET_POST,
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
// get post by id
export const getPost = id => dispatch => {
  axios
    .get(`/api/posts/${id}`)
    .then(res => dispatch(_getPost(res.data)))
    .catch(err => dispatch(_getPost(null)));
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

// Add Comment
export const addComment = (postId, commentData) => dispatch => {
  axios
    .post(`/api/posts/comment/${postId}`, commentData)
    .then(res => dispatch(_getPost(res.data)))
    .catch(err => dispatch(getErrors(err)));
};

// delete comment by id
export const deleteComment = (postId, commentId) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postId}/${commentId}`)
    .then(res => dispatch(_getPost(res.data)))
    .catch(err => dispatch(getErrors(err)));
};
