const mongoose = require("mongoose");
const Post = require("../models/Posts");
const Profile = require("../models/Profile");
const ValidatePostInput = require("../validation/post");

const getAllPosts = (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => {
      if (!posts || posts.length === 0) {
        errors.nopost = "There aren't any posts";
        return res.status(404).json(errors);
      }
      res.json(posts);
    })
    .catch(err => res.status(404).json({ post: "There aren't any posts" }));
};

const getPostById = (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ post: "No post with that id was found" })
    );
};

const createPost = (req, res) => {
  const { errors, isValid } = ValidatePostInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id
  });

  newPost
    .save()
    .then(post => res.json(post))
    .catch(err => res.json(err));
};

const deletePostById = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          // check post owner
          if (post.user.toString() !== req.user.id) {
            return res.status(401).json({
              notauthorized: "User not authorized to delete this post"
            });
          }
          // delete
          post
            .remove()
            .then(() => res.json({ success: true }))
            .catch(err =>
              res.status(404).json({ fail: "couldn't delete post" })
            );
        })
        .catch(err => res.status(404).json({ post: "No post was found" }));
    })
    .catch(err => res.status(404).json({ profile: "Could not find profile" }));
};

const likePost = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "User already liked this post" });
          }
          //  add user to likes array
          post.likes = [{ user: req.user.id }].concat(post.likes);
          //  save
          post
            .save()
            .then(post => res.json(post))
            .catch(err =>
              res
                .status(404)
                .json({ post: "There was a problem liking this post" })
            );
        })
        .catch(err => res.status(404).json({ post: "No post was found" }));
    })
    .catch(err => res.status(404).json({ profile: "Could not find profile" }));
};

const unLikePost = (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id)
        .then(post => {
          if (
            post.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ alreadyLiked: "User has not liked this post yet" });
          }
          // remove like
          post.likes = post.likes.filter(
            like => like.user.toString() !== req.user.id
          );
          // save
          post
            .save()
            .then(post => res.json(post))
            .catch(err =>
              res
                .status(404)
                .json({ post: "There was a problem unliking this post" })
            );
        })
        .catch(err => res.status(404).json({ post: "No post was found" }));
    })
    .catch(err => res.status(404).json({ profile: "Could not find profile" }));
};

const addComment = (req, res) => {
  const { errors, isValid } = ValidatePostInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  Post.findById(req.params.id)
    .then(post => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar,
        user: req.user.id
      };

      // add to comments array
      post.comments = [newComment].concat(post.comments);
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.json(err));
    })
    .catch(err => res.status(404).json({ post: "Post not found" }));
};

const deleteComment = (req, res) => {
  Post.findById(req.params.id)
    .then(post => {
      if (
        post.comments.filter(
          comment => comment._id.toString() === req.params.comment_id
        ).length === 0
      ) {
        return res.status(400).json({
          comment: "Comment does not exist"
        });
      }
      // remove comment
      post.comments = post.comments.filter(
        comment => comment._id.toString() !== req.params.comment_id
      );
      // save
      post
        .save()
        .then(post => res.json(post))
        .catch(err => res.json(err));
    })
    .catch(err => res.status(404).json({ post: "No post was found" }));
};

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
