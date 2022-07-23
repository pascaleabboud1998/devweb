const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
const passport = require("passport")

// Load Profile Model
const Profile = require("../../models/Profile")
// Load User Model
const User = require("../../models/User")

const { isStudent } = require("../../middleware/middleware")
const isAuthenticated = require("../../middleware/auth")

// Load Validation
const validateProfileInput = require("../../validation/profile")
const validateExperienceInput = require("../../validation/experience")
const validateEducationInput = require("../../validation/education")

/* @route  /api/profile/test
   @method GET
   @desc   test profile route
   @access Public
*/
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }))

/*
  @route  /api/profile
  @method GET
  @desc   get current user's profile
  @access Private
*/
router.get("/", isAuthenticated, isStudent, (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.user.id })
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
  @route  /api/profile/all
  @method GET
  @desc   Get all profiles
  @access Public
*/
router.get("/all", (req, res) => {
  const errors = {}

  Profile.find()
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

/*
  @route  /api/profile/handle/:handle
  @method GET
  @desc   Get the profile by handle
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
        return
      }
      res.json(profile)
      return
    })
    .catch((err) =>
      res.status(400).json({ noprofile: "There is no profile for this user" })
    )
})

/*
  @route  /api/profile/user/user_id
  @method GET
  @desc   Get the profile by ID
  @access Public
*/
router.get("/user/:user_id", (req, res) => {
  const errors = {}

  Profile.findOne({ user: req.params.user_id })
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
  @route  /api/profile
  @method POST
  @desc   Create or Edit user profile
  @access Private
*/
router.post("/", isAuthenticated, isStudent, (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)

  // Validation Check
  if (!isValid) {
    // Return the errors
    return res.status(400).json(errors)
  }

  // Get fields
  const profileFields = {}
  profileFields.user = req.user.id

  if (req.body.handle) profileFields.handle = req.body.handle
  if (req.body.company) profileFields.company = req.body.company
  if (req.body.website) profileFields.website = req.body.website
  if (req.body.location) profileFields.location = req.body.location
  if (req.body.bio) profileFields.bio = req.body.bio
  if (req.body.status) profileFields.status = req.body.status
  if (req.body.githubusername)
    profileFields.githubusername = req.body.githubusername
  if (req.body.phone) profileFields.phone = req.body.phone

  // Skills - split into array
  if (typeof req.body.skills !== undefined) {
    profileFields.skills = req.body.skills.split(",")
    profileFields.skills = profileFields.skills.map((x) => x.trim())
  }

  //Social network links
  profileFields.social = {}
  if (req.body.youtube) profileFields.social.youtube = req.body.youtube
  if (req.body.twitter) profileFields.social.twitter = req.body.twitter
  if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
  if (req.body.facebook) profileFields.social.facebook = req.body.facebook
  if (req.body.instagram) profileFields.social.instagram = req.body.instagram

  Profile.findOne({ user: req.user.id }).then((profile) => {
    if (profile) {
      // Update
      //This is different than the tutorial
      //return the function to chain .then instead of nesting
      Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true }
      ).then((profile) => res.json(profile))
    } else {
      // Create
      //Check if handle already exists
      Profile.findOne({ handle: profileFields.handle }).then((profile) => {
        if (profile) {
          //It does exist
          errors.handle = "That handle already exists"
          return res.status(400).json(errors)
        }
        // No it doesn't
        // Save profile
        new Profile(profileFields).save().then((profile) => res.json(profile))
      })
    }
  })
})

/*
  @route  /api/profile/experience
  @method POST
  @desc   Add experience to profile
  @access Private
*/
router.post("/experience", isAuthenticated, isStudent, (req, res) => {
  const { errors, isValid } = validateExperienceInput(req.body)

  // Validation Check
  if (!isValid) {
    // Return the errors
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id }).then((profile) => {
    //This is different than the tutorial
    const newExp = {
      // ...req.body,
      title: req.body.title,
      company: req.body.company,
      from: req.body.from,
      to: req.body.to,
      description: req.body.description,
      location: req.body.location,
      current: req.body.current,
    }
    //Add to experience array
    profile.experience.unshift(newExp)
    profile.save().then((profile) => res.json(profile))
  })
})

/*
  @route  /api/profile/education
  @method POST
  @desc   Add education to profile
  @access Private
*/
router.post("/education", isAuthenticated, isStudent, (req, res) => {
  const { errors, isValid } = validateEducationInput(req.body)

  // Validation Check
  if (!isValid) {
    // Return the errors
    return res.status(400).json(errors)
  }

  Profile.findOne({ user: req.user.id }).then((profile) => {
    //This is different than the tutorial
    const newEdu = {
      // ...req.body,
      school: req.body.school,
      degree: req.body.degree,
      fieldofstudy: req.body.fieldofstudy,
      from: req.body.from,
      to: req.body.to,
      description: req.body.description,
      location: req.body.location,
      current: req.body.current,
    }
    //Add to experience array
    profile.education.unshift(newEdu)
    profile.save().then((profile) => res.json(profile))
  })
})

/*
  @route  /api/profile/experience/:exp_id
  @method DELETE
  @desc   Delete experience from profile
  @access Private
*/
router.delete("/experience/:exp_id", isAuthenticated, isStudent, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      //Get remove index
      let remove_index = profile.experience
        .map((item) => item.id)
        .indexOf(req.params.exp_id)

      // Splice out of array
      profile.experience.splice(remove_index, 1)
      // Save
      profile.save().then((profile) => res.json(profile))
    })
    .catch((err) => res.status(404).json({ err }))
})

/*
  @route  /api/profile/education/:edu_id
  @method DELETE
  @desc   Delete education from profile
  @access Private
*/
router.delete("/education/:edu_id", isAuthenticated, isStudent, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then((profile) => {
      //Get remove index
      let remove_index = profile.education
        .map((item) => item.id)
        .indexOf(req.params.edu_id)

      // Splice out of array
      profile.education.splice(remove_index, 1)

      // Save
      profile.save().then((profile) => res.json(profile))
    })
    .catch((err) => res.status(404).json({ err }))
})

/*
  @route  /api/profile
  @method DELETE
  @desc   Delete user and profile
  @access Private
*/
router.delete("/", isAuthenticated, isStudent, (req, res) => {
  Profile.findOneAndRemove({ user: req.user.id }).then(() =>
    User.findOneAndRemove({ _id: req.user.id }).then(() =>
      res.json({ success: true })
    )
  )
})

module.exports = router
