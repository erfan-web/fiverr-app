const express = require("express");
const router = express.Router();
const { register, login, logout } = require("../controller/auth.controllers");
const { protect } = require("../middlewares/authMiddleware");
router.post("/register", register);
router.post("/login", login);
router.get("/logout", protect, logout);

module.exports = router;
