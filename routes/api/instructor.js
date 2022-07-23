const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

// Load Instructor Model
const Instructor = require("../../models/InstructorProfile")
// Load User Model
const User = require("../../models/User")

const { isInstructor, isStudent } = require("../../middleware/middleware")
const isAuthenticated = require("../../middleware/auth")

// Load Validation
const validateInstructorProfileInput = require("../../validation/instructor")

/* @route  /api/instructor/test
   @method GET
   @desc   test instructor route
   @access Public
*/
router.get("/test", (req, res) => res.json({ msg: "Instructor Profile Works" }))

/*
  @route  /api/instructor
  @method GET
  @desc   get current user's profile
  @access Private
*/
router.get("/", isAuthenticated, isInstructor, (req, res) => {
  const errors = {}

  Instructor.findOne({ user: req.user.id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user"
        return res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch((err) => res.status(404).json(err))
})

/*
  @route  /api/instructor/all
  @method GET
  @desc   Get all instructor profiles
  @access Public
*/
router.get("/all", (req, res) => {
  const errors = {}

  Instructor.find()
    .populate("user", ["name", "avatar"])
    .then((profiles) => {
      if (!profiles) {
        errors.noprofiles = "There are no profiles"
        return res.status(404).json(errors)
      }
      // If there are any profiles then send them back
      res.json(profiles)
    })
    .catch((err) =>
      res.status(400).json({ noprofile: "There are no profiles" })
    )
})

// ? Possible feature. View Instructor Profile
// ! there is no handle property in database
/*
  @route  /api/instructor/handle/:handle
  @method GET
  @desc   Get the instructor profile by handle
  @access Public
*/
router.get("/handle/:handle", (req, res) => {
  const errors = {}

  Profile.findOne({ handle: req.params.handle })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user"
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch((err) =>
      res.status(400).json({ noprofile: "There is no profile for this user" })
    )
})

// ? This is useless. can't think of any use case.
/*
  @route  /api/instructor/user/user_id
  @method GET
  @desc   Get the profile by ID
  @access Public
*/
router.get("/user/:user_id", (req, res) => {
  const errors = {}

  Instructor.findOne({ user: req.params.user_id })
    .populate("user", ["name", "avatar"])
    .then((profile) => {
      if (!profile) {
        errors.noprofile = "There is no profile for this user"
        res.status(404).json(errors)
      }
      res.json(profile)
    })
    .catch((err) =>
      res.status(400).json({ noprofile: "There is no profile for this user" })
    )
})

/*
  @route  /api/instructor
  @method POST
  @desc   Create or Edit instructor profile
  @access Private
*/
router.post("/", isAuthenticated, isInstructor, (req, res) => {
  const { errors, isValid } = validateInstructorProfileInput(req.body)

  // Validation Check
  if (!isValid) {
    // Return the errors
    return res.status(400).json(errors)
  }

  // Get fields
  const profileFields = {}
  profileFields.user = req.user.id

  // if (req.body.location) profileFields.location = req.body.location

  // Skills
  profileFields.skills = req.body.skills
  profileFields.skills = profileFields.skills.map((x) => ({
    skill: x.skill.trim(),
    yearsOfExperience: x.yearsOfExperience,
  }))
  profileFields.phone = req.body.phone

  Instructor.findOne({ user: req.user.id }).then((profile) => {
    if (profile) {
      // Update
      //This is different than the tutorial
      //return the function to chain .then instead of nesting
      Instructor.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then((profile) => res.json(profile))
    } else {
      // Create
      //Check if handle already exists
      // Profile.findOne({ handle: profileFields.handle }).then((profile) => {
      //   if (profile) {
      //     //It does exist
      //     errors.handle = "That handle already exists"
      //     return res.status(400).json(errors)
      //   }
      //   // No it doesn't
      //   // Save profile
      //   new Profile(profileFields).save().then((profile) => res.json(profile))
      // })
      new Instructor(profileFields).save().then((profile) => res.json(profile))
    }
  })
})

/*
  @route  /api/instructor
  @method DELETE
  @desc   Delete user and profile
  @access Private
*/
router.delete("/", isAuthenticated, isInstructor, (req, res) => {
  Instructor.findOneAndRemove({ user: req.user.id }).then(() =>
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    )
  )
})

/*
  @route  /api/instructor/profile
  @method DELETE
  @desc   Delete profile only
  @access Private
*/
router.delete("/profile", isAuthenticated, isInstructor, (req, res) => {
  Instructor.findOneAndRemove({ user: req.user.id })
    .then(() => res.json({ success: true }))
    .catch((err) => res.json(err).status(500))
})

// * make profile private/public
router.post("/search", isAuthenticated, isStudent, async (req, res) => {
  try {
    console.log(req.body.skills)
    const result = await Instructor.find({
      "skills.skill": req.body.skills,
    }).populate("user", ["name"])
    console.log(result)
    res.status(200).json(result)
  } catch (e) {
    console.log(e)
    res.status(500).json({ error: "an error occurred" })
  }
})

// ? Possible feature
// * make profile private/public
router.post("/settings", isAuthenticated, isInstructor, (req, res) => {
  // * this would require a settings object
})

module.exports = router
