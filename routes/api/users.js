const express = require("express");
const passport = require("passport");
const userController = require("../../controllers/users");

const router = express.Router();
const passportJWT = passport.authenticate("jwt", { session: false });

/*
    @route  POST api/users/register
    @desc   Register User
    @access Public
*/
router.post("/register", userController.registerUser);

/*
    @route  POST api/users/login
    @desc   Login User / Return JWT
    @access Public
*/
router.post("/login", userController.loginUser);

/*
    @route  GET api/users/current
    @desc   Return current user
    @access Private
*/
router.get("/current", passportJWT, userController.getCurrentUser);

module.exports = router;
