const express = require("express");
const passport = require("passport");
const profileController = require("../../controllers/profile");

const router = express.Router();
const passportJWT = passport.authenticate("jwt", { session: false });

/*
    @route  GET api/profile/:id
    @desc   Current User's Profile
    @access Private
*/
router.get("/", passportJWT, profileController.currentProfile);

/*
    @route  GET api/profile/all
    @desc   Get all profiles
    @access Public
*/
router.get("/all", profileController.allProfiles);

/*
    @route  GET api/profile/handle/:handle
    @desc   Get profile by handle
    @access Public
*/
router.get("/handle/:handle", profileController.profileByHandle);

/*
    @route  GET api/profile/user/:user_id
    @desc   Get profile by user ID
    @access Public
*/
router.get("/user/:user_id", profileController.profileByUserId);

/*
    @route  POST api/profile
    @desc   Create or Edit User's Profile
    @access Private
*/
router.post("/", passportJWT, profileController.createEditProfile);

/*
    @route  POST api/profile/experience
    @desc   Add experience to profile
    @access Private
*/
router.post("/experience", passportJWT, profileController.addExperience);

/*
    @route  PATCH api/profile/experience/:exp_id
    @desc   Edit experience in Profile
    @access Private
*/
router.patch(
  "/experience/:exp_id",
  passportJWT,
  profileController.editExperience
);

/*
    @route  DELETE api/profile/experience/:exp_id
    @desc   Delete experience from profile
    @access Private
*/
router.delete(
  "/experience/:exp_id",
  passportJWT,
  profileController.deleteExperience
);

/*
    @route  POST api/profile/education
    @desc   Add education to profile
    @access Private
*/
router.post("/education", passportJWT, profileController.addEducation);

/*
    @route  PATCH api/profile/education/:edu_id
    @desc   Edit Education in Profile
    @access Private
*/
router.patch(
  "/education/:edu_id",
  passportJWT,
  profileController.editEducation
);

/*
    @route  DELETE api/profile/education/:edu_id
    @desc   Delete education from profile
    @access Private
*/
router.delete(
  "/education/:edu_id",
  passportJWT,
  profileController.deleteEducation
);

// @route   DELETE api/profile
// @desc    Delete user and profile, i.e. delete account
// @access  Private
router.delete("/", passportJWT, profileController.deleteAccount);

module.exports = router;
