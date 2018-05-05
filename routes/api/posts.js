const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");
const Post = require("../../models/Posts");
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

module.exports = router;
