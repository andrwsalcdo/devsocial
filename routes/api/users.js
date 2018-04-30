const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const keys = require("../../config/keys");

/*
    @route  GET api/users/test
    @desc   Tests users route
    @access Public
*/
router.get("/test", (req, res) => res.json({ msg: "users test route" }));

/*
    @route  POST api/users/register
    @desc   Register User
    @access Public
*/
router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exits" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", // rating
        d: "mm" // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

/*
    @route  POST api/users/login
    @desc   Login User / Return JWT
    @access Public
*/
router.post("/login", (req, res) => {
  // destructure user's email & password
  const [email, password] = [req.body.email, req.body.password];
  //find user by email
  User.findOne({ email }).then(user => {
    // email exists?
    if (!user) {
      return res.status(404).json({ email: "User not found" });
    }
    // password is same?
    bcrypt.compare(password, user.password).then(isMatch => {
      // User logins successfully.
      if (isMatch) {
        const payload = { id: user.id, name: user.name, avatar: user.avatar };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res.status(400).json({ password: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
