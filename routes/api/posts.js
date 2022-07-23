const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Post Model
const Post = require("../../models/Post");
// Load Profile Model
const Profile = require("../../models/Profile");

const isAuthenticated = require("../../middleware/auth");
// Load Validation
const validatePostInput = require("../../validation/post");

/* @route /api/posts/test
   @method GET
   @desc test post route
   @access public
*/
router.get("/test", (req, res) => res.json({ msg: "Posts Works" }));

/* @route   /api/post
   @method  GET
   @desc    Get post
   @access  Public
*/
router.get("/", (req, res) => {
  Post.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404));
});

/* @route   /api/post/:id
   @method  GET
   @desc    Get post by ID
   @access  Public
*/
router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostfound: "No post was found with that ID" }));
});

/* @route /api/post
   @method POST
   @desc create post
   @access private
*/
router.post("/", isAuthenticated, (req, res) => {
  // Run validation
  const { errors, isValid } = validatePostInput(req.body);

  // Validation Check
  if (!isValid) {
    // Return the errors
    return res.status(400).json(errors);
  }

  const newPost = new Post({
    text: req.body.text,
    name: req.body.name,
    avatar: req.body.avatar,
    user: req.user.id,
  });

  newPost.save().then(post => res.json(post));
});

/* @route   /api/posts/:id
   @method  DELETE
   @desc    Delete post
   @access  Private
*/
router.delete("/:id", isAuthenticated, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id).then(post => {
        // Check for post owner
        if (post.user.toString() !== req.user.id) {
          res.status(401).json({ notauthorized: "User not authorized" });
        }

        // Delete
        post.remove().then(() => res.json({ success: true }));
      });
    })
    .catch(err => res.status(404).json({ nopostfound: "No post was found" }));
});

/*
  @route   /api/posts/like/:id
  @method  Post
  @desc    Like post
  @access  Private
*/
router.post("/like/:id", isAuthenticated, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id).then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
          return res.status(404).json({ alreadyLiked: "User already liked this post" });
        }

        post.likes.unshift({ user: req.user.id });

        post.save().then(post => res.json(post));
      });
    })
    .catch(err => res.status(404).json({ nopostfound: "No post was found" }));
});

/*
  @route   /api/posts/unlike/:id
  @method  POST
  @desc    Unlike post
  @access  Private
*/
router.post("/unlike/:id", isAuthenticated, (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Post.findById(req.params.id).then(post => {
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
          return res.status(404).json({ notLiked: "User hasn't liked this post" });
        }

        // Get the remove index
        let removeIndex = post.likes.map(item => item.user.toString).indexOf(req.user.id);
        // Splice out of array
        post.likes.splice(removeIndex, 1);

        post.save().then(post => res.json(post));
      });
    })
    .catch(err => res.status(404).json({ nopostfound: "No post was found" }));
});

/*
  @route   /api/posts/comment/:id
  @method  POST
  @desc    Add comment to post
  @access  Private
*/
router.post("/comment/:id", isAuthenticated, (req, res) => {
  // Run validation
  const { errors, isValid } = validatePostInput(req.body);

  // Validation Check
  if (!isValid) {
    // Return the errors
    return res.status(400).json(errors);
  }

  Post.findById(req.params.id).then(post => {
    const newComment = {
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id,
    };

    // Add to comments array
    post.comments.unshift(newComment);
    // Save & check for errors
    post
      .save()
      .then(post => res.json(post))
      .catch(err => res.status(404).json({ nopostfound: "Post not found" }));
  });
});

/*
  @route   /api/posts/comment/:id/:comment_id
  @method  DELETE
  @desc    Delete comment from post
  @access  Private
*/
router.delete("/comment/:id/:comment_id", isAuthenticated, (req, res) => {
  Post.findById(req.params.id).then(post => {
    // Check to see if comment exists
    if (
      post.comments.filter(comment => comment._id.toString() === req.params.comment_id)
        .length === 0
    ) {
      return res.status(404).json({ commentnotexists: "Comment doesn't exists" });
    }

    const removeIndex = post.comments
      .map(item => item._id.toString())
      .indexOf(req.params.comment_id);

    post.comments.splice(removeIndex, 1);

    post.save().then(post => res.json(post));
  });
});

module.exports = router;
