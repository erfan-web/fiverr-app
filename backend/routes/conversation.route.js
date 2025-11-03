const express = require("express");
const router = express.Router();
const {
  getConversations,
  createConversations,
  getConversation,
  updateConversations,
} = require("../controller/conversation.controller");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createConversations);
router.post("/:id", protect, updateConversations);
router.get("/", protect, getConversations);
router.get("/single/:id", protect, getConversation);

module.exports = router;
