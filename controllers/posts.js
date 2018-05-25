const mongoose = require("mongoose");
const Post = require("../models/Posts");
const Profile = require("../models/Profile");
const ValidatePostInput = require("../validation/post");

const getAllPosts = (req, res) => {};

const getPostById = (req, res) => {};

const createPost = (req, res) => {};

const deletePostById = (req, res) => {};

const likePost = (req, res) => {};

const unLikePost = (req, res) => {};

const addComment = (req, res) => {};

const deleteComment = (req, res) => {};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  deletePostById,
  likePost,
  unLikePost,
  addComment,
  deleteComment
};
