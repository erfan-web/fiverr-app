const { createError } = require("../utils/createError");
const Review = require("../models/Review");
const Gig = require("../models/Gig");
exports.createReview = async (req, res, next) => {
  try {
    if (req.user.isSeller)
      return next(createError(403, "Seller can't create reivew!"));

    const review = await Review.findOne({
      userId: req.user._id,
      gigId: req.body.gigId,
    });

    if (review)
      return next(
        createError(403, "you have already created a review for this gig!")
      );
    const NewReview = await Review.create({
      userId: req.user._id,
      gigId: req.body.gigId,
      description: req.body.description,
      star: req.body.star,
    });
    await Gig.findByIdAndUpdate(req.body.gigId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).json(NewReview);
  } catch (err) {
    next(err);
  }
};
exports.getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ gigId: req.params.gigId });
    res.status(200).json(reviews)
  } catch (err) {
    next(err);
  }
};
exports.rmReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
