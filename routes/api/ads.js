const router = require("express").Router()
// const passport = require("passport")
const mongoose = require("mongoose")

const User = require("../../models/User")
const Profile = require("../../models/Profile")
const Ad = require("../../models/Ad")
const Application = require("../../models/Application")

const validateAdInput = require("../../validation/advertisement")
const {
  isEmployer,
  isStudent,
  isStudentOrEmployer,
} = require("../../middleware/middleware")
const isAuthenticated = require("../../middleware/auth")

/*
  @route /api/ads/
  @method POST
  @desc create a new job advertisement
  @access private
*/
router.post("/", isAuthenticated, isEmployer, async (req, res) => {
  const { errors, isValid } = validateAdInput(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  try {
    const ad = new Ads({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      salary: req.body.salary,
    })
    const Ad = await ad.save()
    res.json(Ad).status(200)
  } catch (e) {
    console.log(e)
    res.json(e).status(500)
  }
})

/*
  @route /api/ads
  @method GET
  @desc return all ads
  @access private (employer)
*/
router.get("/", isAuthenticated, isStudentOrEmployer, async (req, res) => {
  // Get all ads
  try {
    const ads = await Ads.find().populate("user", ["name"])
    console.log(ads)
    res.json(ads).status(200)
  } catch (e) {
    console.log(e)
    res.json(e).status(500)
  }
})

/*
  @route /api/ads/:id
  @method DELETE
  @desc Delete an Ad
  @access private
*/
router.delete("/:id", isAuthenticated, isEmployer, async (req, res) => {
  // Get all ads
  try {
    // find the ad with the id
    const userAd = await Ad.findById(req.params.id)
    // does it belong to the current user
    if (userAd.user != req.user.id) {
      return res.json("Unauthorized").status(403)
    }
    const id = userAd._id
    await userAd.remove()
    res.json({ success: true, id })
  } catch (e) {
    console.log(e)
    res.json(e).status(200)
  }
})

/*
  @route /api/ads/myads
  @method GET
  @desc Get user ads
  @access private (employer)
*/
router.get("/myads", isAuthenticated, isEmployer, async (req, res) => {
  try {
    //get all ads by user
    const ads = await Ad.find({ user: req.user.id })
    console.log(ads)
    res.json(ads)
  } catch (e) {
    console.log(e)
    res.json(e).status(500)
  }
})

/*
  @route /api/ads/apply/:id
  @method POST
  @desc Apply to a job offering
  @access private
*/
router.post("/apply/:id", isAuthenticated, isStudent, async (req, res) => {
  // Should receive two things, Advertisement id, User id

  try {
    // ! check if user has a Profile
    const userProfile = await Profile.findOne({ user: req.body.userId })
    if (!userProfile) {
      throw new Error("Please set up your profile first")
    }
    const application = new Application({
      // ? could have used req.params.id
      offering: req.body.jobId,
      // ? Could have used req.user.id
      user: req.body.userId,
    })
    const app = await application.save()
    console.log(app)
    res.status(200).json({ id: app._id })
  } catch (e) {
    console.log(e)
    console.log(e.message)
    res.status(500).json({ error: e.message })
  }
})

/*
  @route /api/ads/applications/:id
  @method GET
  @desc Get all applied users for a job
  @access private employer route
*/
router.get(
  "/applications/:id",
  isAuthenticated,
  isEmployer,
  async (req, res) => {
    try {
      var appliedUsers = await Application.find({
        offering: req.params.id,
      }).populate("user", ["name", "gravatar", "email"])
      console.log("applied users:")
      console.log(appliedUsers)
      const appliedUsersIds = appliedUsers.map((row) => row.user._id.toString())

      const userPhone = await Profile.find({
        user: {
          $in: appliedUsersIds,
        },
      }).select(["phone", "handle"])

      appliedUsers = appliedUsers.map((user, index) => {
        return {
          id: user.user._id,
          name: user.user.name,
          email: user.user.email,
          phone: userPhone[index].phone,
          handle: userPhone[index].handle,
        }
      })

      res.json({ appliedUsers })
    } catch (e) {
      console.log(e)
      console.log(e.message)
      res.status(500).json({ error: "An error has occurred." })
    }
  }
)

/*
  @route /api/ads/myapplications
  @method GET
  @desc Get all applied jobs for a user
  @access private
*/
router.get("/myapplications", isAuthenticated, isStudent, async (req, res) => {
  try {
    let appliedJobs = await Application.find({ user: req.user.id }).populate({
      path: "offering",
      populate: { path: "user" },
    })
    console.log("type is")
    console.log(req.query.type)
    if (req.query.type === "id") {
      appliedJobs = appliedJobs.map((row) => row.offering._id)
    }
    res.json({ appliedJobs })
  } catch (e) {
    console.log(e)
    console.log(e.message)
    res.json({ error: "An error has occurred." }).status(500)
  }
})

module.exports = router
