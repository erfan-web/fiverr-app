const express = require("express");
const router = express.Router();
const { createMessage ,getMessages  } = require("../controller/message.controller");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createMessage);
router.get("/:id", protect, getMessages);

module.exports = router;
