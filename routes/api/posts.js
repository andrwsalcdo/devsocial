const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Posts");
const Profile = require("../../models/Profile");
const ValidatePostInput = require("../../validation/post");

/*
    @route  GET api/posts/test
    @desc   Tests posts route
    @access Public
*/
router.get("/test", (req, res) => res.json({ msg: "posts test route" }));

/*
    @route  GET api/posts
    @desc   Get all posts
    @access Public
*/
router.get("/", (req, res) => {
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
});

/*
    @route  GET api/posts/:id
    @desc   Get post by id
    @access Public
*/
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(err =>
      res.status(404).json({ post: "No post with that id was found" })
    );
});

/*
    @route  POST api/posts
    @desc   Create post
    @access Private
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

/*
    @route  DELETE api/posts/:id
    @desc   Delete post by id
    @access Private
*/
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
      .catch(err =>
        res.status(404).json({ profile: "Could not find profile" })
      );
  }
);

/*
    @route  POST api/posts/like/:id
    @desc   Like post
    @access Private
*/
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
      .catch(err =>
        res.status(404).json({ profile: "Could not find profile" })
      );
  }
);

/*
    @route  DELETE api/posts/unlike/:id
    @desc   Unlike post || delete like from post
    @access Private
*/
router.delete(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
      .catch(err =>
        res.status(404).json({ profile: "Could not find profile" })
      );
  }
);

/*
    @route  POST api/posts/comment/:id
    @desc   Add comment to post
    @access Private
*/
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

/*
    @route  DELETE api/posts/comment/:id/:comment_id
    @desc   Remove Comment from Post
    @access Private
*/
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
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
  }
);

module.exports = router;
