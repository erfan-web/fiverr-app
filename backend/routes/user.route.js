const express = require("express");
const router = express.Router();
const { getMe, getUser } = require("../controller/user.controller");
const { protect } = require("../middlewares/authMiddleware");

router.get("/me", protect, getMe);
router.get("/:id", getUser);

module.exports = router;
