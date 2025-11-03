const express = require("express");
const router = express.Router();
const {
  getOrders,
  payment,
  verifyPayment,
} = require("../controller/order.controller");
const { protect } = require("../middlewares/authMiddleware");

router.get("/", protect, getOrders);
router.post("/create-payment/:id", protect, payment);
router.get("/verify-payment",protect, verifyPayment);

module.exports = router;
