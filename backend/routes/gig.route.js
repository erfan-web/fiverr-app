const express = require("express");
const router = express.Router();
const {
  createGig,
  deleteGig,
  getGig,
  getGigs,
} = require("../controller/gig.controller");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", protect, createGig);
router.delete("/:id", protect, deleteGig);
router.get("/single/:id", getGig);
router.get("/", getGigs);

module.exports = router;
