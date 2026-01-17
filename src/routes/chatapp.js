const express = require("express");
const {
  register,
  loginUser,
  allUsers,
  getMyMessages,
  deleteall,
} = require("../controller/chatapp");
const { authmiddleware } = require("../middlewares/auth");
const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/users", allUsers);
router.get("/messages/:id", authmiddleware, getMyMessages);
router.delete("/messages", deleteall);

module.exports = router;
