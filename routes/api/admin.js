const router = require("express").Router();
const passport = require("passport");

const { isAdmin } = require("../../middleware/middleware");
const isAuthenticated = require("../../middleware/auth");

const User = require("../../models/User");

/*
  @route /api/admin/users
  @method GET
  @desc return all users in the database
  @access private (admin)
*/
router.get("/users", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: "couldn't get users" });
  }
});

/*
  @route /api/admin/users/:id
  @method DELETE
  @desc Delete a user from the database
  @access private (admin)
*/
router.delete("/users/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOneAndRemove({ _id: id });
    res.send(id).status(200);
  } catch (e) {
    res.status(200).json({ error: "couldn't delete user" });
  }
});

module.exports = router;
