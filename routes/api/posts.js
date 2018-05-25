const express = require("express");
const passport = require("passport");
const postController = require("../../controllers/posts");

const router = express.Router();
const passportJWT = passport.authenticate("jwt", { session: false });

/*
    @route  GET api/posts
    @desc   Get all posts
    @access Public
*/
router.get("/", postController.getAllPosts);

/*
    @route  GET api/posts/:id
    @desc   Get post by id
    @access Public
*/
router.get("/:id", postController.getPostById);

/*
    @route  POST api/posts
    @desc   Create post
    @access Private
*/
router.post("/", passportJWT, postController.createPost);

/*
    @route  DELETE api/posts/:id
    @desc   Delete post by id
    @access Private
*/
router.delete("/:id", passportJWT, postController.deletePostById);

/*
    @route  POST api/posts/like/:id
    @desc   Like post
    @access Private
*/
router.post("/like/:id", passportJWT, postController.likePost);

/*
    @route  DELETE api/posts/unlike/:id
    @desc   Unlike post || delete like from post
    @access Private
*/
router.delete("/unlike/:id", passportJWT, postController.unLikePost);

/*
    @route  POST api/posts/comment/:id
    @desc   Add comment to post
    @access Private
*/
router.post("/comment/:id", passportJWT, postController.addComment);

/*
    @route  DELETE api/posts/comment/:id/:comment_id
    @desc   Remove Comment from Post
    @access Private
*/
router.delete(
  "/comment/:id/:comment_id",
  passportJWT,
  postController.deleteComment
);

module.exports = router;
