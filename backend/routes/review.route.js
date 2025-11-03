const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviews,
  rmReview,
} = require("../controller/review.controller");
const { protect } = require("../middlewares/authMiddleware");
router.post("/", protect, createReview);
router.get("/:gigId", getReviews);
router.delete("/:id", protect, rmReview);

module.exports = router;
