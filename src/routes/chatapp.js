const express = require("express");
const { register, loginUser, allUsers } = require("../controller/chatapp");
const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/users", allUsers);

module.exports = router;
