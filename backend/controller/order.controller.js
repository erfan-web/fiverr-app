const { createError } = require("../utils/createError");
const Order = require("../models/Order");
const Gig = require("../models/Gig");

exports.payment = async (req, res, next) => {
  try {
    const gig = await Gig.findById(req.params.id);
    const response = await fetch("https://gateway.zibal.ir/v1/request", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        merchant: "zibal",
        amount: gig.price * 1_070_000,
        callbackUrl: "http://localhost:8000/api/orders/verify-payment",
      }),
    });
    const { trackId, result } = await response.json();

    const newOrder = new Order({
      gigId: gig._id,
      image: gig.cover,
      title: gig.title,
      buyerId: req.user._id,
      sellerId: gig.userId,
      price: gig.price,
      payment_intent: trackId,
    });
    await newOrder.save();
    res.status(200).json({ trackId, result });
  } catch (err) {
    next(err);
  }
};

exports.verifyPayment = async (req, res, next) => {
  try {
    const { trackId, success } = req.query;

    if (success !== "1") {
      return res.redirect("http://localhost:5173/payment/failure");
    }

    const verifyRes = await fetch("https://gateway.zibal.ir/v1/verify", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        merchant: "zibal",
        trackId,
      }),
    });

    const data = await verifyRes.json();

    if (data.result === 100) {
      // پرداخت موفق
      await Order.findOneAndUpdate(
        { payment_intent: trackId },
        { isCompleted: true }
      );

      return res.redirect("http://localhost:5173/payment/success");
    } else {
      return res.redirect("http://localhost:5173/payment/failure");
    }
  } catch (err) {
    next(err);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({
      ...(req.user.isSeller
        ? { sellerId: req.user._id }
        : { buyerId: req.user._id }),
      isCompleted: true,
    });
    res.status(200).json(orders);
  } catch (err) {
    next(err);
  }
};
