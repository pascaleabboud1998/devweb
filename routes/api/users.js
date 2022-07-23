const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const isAuthenticated = require("../../middleware/auth");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// Config
const { secret } = require("../../config/keys");

/*
  @route  /api/users/test
  @method GET
  @desc   Test users route
  @access Public
*/
router.get("/test", (req, res) => res.json({ msg: "Users Works" }));

/*
  @route  /api/users/register
  @method POST
  @desc   Register a user
  @access Public
*/
router.post("/register", (req, res) => {
  // Get errors
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Check if the email exists
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already exists";
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "mm",
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar,
        password: req.body.password,
        type: req.body.type,
      });

      bcrypt.genSalt(10, (err, salt) => {
        //Gimme dat salt
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
  @route  /api/users/login
  @method POST
  @desc   Login user / Returning `JWT` token
  @access Public
*/
router.post("/login", (req, res) => {
  // Get errors
  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.password = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User Logged In Successfully
        // Create JWT payload
        const payload = {
          id: user.id,
          avatar: user.avatar,
          name: user.name,
          type: user.type,
        };
        // Sign token
        jwt.sign(payload, secret, { expiresIn: 3600 }, (err, token) => {
          res.json({ success: true, token: `Bearer ${token}` });
        });
      } else {
        errors.password = "Invalid Credentials";
        return res.status(400).json(errors);
      }
    });
  });
});

/*
  @route  /api/users/current
  @method GET
  @desc   Return current user
  @access Private
*/
router.get("/current", isAuthenticated, (req, res) => {
  console.log(req.user);
  res.json({ id: req.user.id, name: req.user.name, email: req.user.email });
});

module.exports = router;
