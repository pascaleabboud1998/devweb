const router = require("express").Router();
// const mongoose = require("mongoose");
const Comment = require("../../models/Comment");
const User = require("../../models/User");
const Profile = require("../../models/Profile");
const passport = require("passport");
const { isInstructor } = require("../../middleware/middleware");
const isAuthenticated = require("../../middleware/auth");

const validateCommentInput = require("../../validation/comment");
/*
  @route /api/comment/:handle
  @method GET
  @desc return all comment of a specified user
  @access public
*/
router.get("/:handle", async (req, res) => {
  try {
    const toProfile = await Profile.find({ handle: req.params.handle });
    console.log(toProfile);
    console.log(req.params.handle);
    const toId = toProfile[0].user;
    const comments = await Comment.find({ to: toId }).populate("from", ["name", "avatar"]);
    res.json(comments).status(200);
  } catch (e) {
    console.log(e);
  }
});

/*
  @route /api/comment/
  @method POST
  @desc Add a comment
  @access private (instructors)
*/
router.post("/", isAuthenticated, isInstructor, async (req, res) => {
  // Run validation
  const { errors, isValid } = validateCommentInput(req.body);

  // Validation Check
  if (!isValid) {
    // Return the errors
    return res.status(400).json(errors);
  }

  try {
    // current logged in user id
    const userId = req.user.id;
    // to whom are you making this comment
    const toProfile = await Profile.find({ handle: req.body.handle });
    const toId = toProfile[0].user;

    const commentObject = new Comment({ to: toId, from: userId, content: req.body.content });
    const comment = await commentObject.save();
    res.json(comment);
  } catch (e) {
    console.log(e);
  }
});

/*
  @route /api/comment/:id
  @method DELETE
  @desc Delete a comment
  @access private
*/
router.delete("/:id", isAuthenticated, isInstructor, async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findOneAndRemove({ _id: id });
    res.send(id).status(200);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
