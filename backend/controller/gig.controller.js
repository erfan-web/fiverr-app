const { isValidObjectId } = require("mongoose");
const Gig = require("../models/Gig");
const { createError } = require("../utils/createError");

exports.createGig = async (req, res, next) => {
  if (!req.user?.isSeller)
    return next(createError(403, "Only sellers can create a gig!"));
  const newGig = new Gig({
    userId: req.user._id,
    ...req.body,
  });
  try {
    const savedGig = await newGig.save();
    res.status(201).json(savedGig);
  } catch (err) {
    next(err);
  }
};
exports.deleteGig = async (req, res, next) => {
  try {
    const gigId = req.params.id;
    if (!isValidObjectId(gigId))
      return next(createError(400, "Invalid Gig ID format"));
    const gig = await Gig.findOne({ _id: gigId });
    if (!gig) return next(createError(404, "gig Not Found!"));
    if (gig.userId != req.user._id)
      return next(createError(403, "you can delete only your gig!"));
    await Gig.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Gig has been deleted!" });
  } catch (err) {
    next(err);
  }
};
exports.getGig = async (req, res, next) => {
  try {
    const gigId = req.params.id;
    if (!isValidObjectId(gigId))
      return next(createError(400, "Invalid Gig ID format"));
    const gig = await Gig.findOne({ _id: gigId });
    if (!gig) return next(createError(404, "gig Not Found!"));

    res.status(200).json(gig);
  } catch (err) {
    next(err);
  }
};
exports.getGigs = async (req, res, next) => {
  try {
    const { category, search, min, max, sort, userId } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (userId && isValidObjectId(userId)) filters.userId = userId;
    if (min || max) {
      filters.price = {};
      // if both true =>  filters:{ price:{ $gte: <number>, $lte: <number>} }
      if (min) filters.price.$gte = Number(min); // filters:{price: {$gte: Number(minPrice)}}
      if (max) filters.price.$lte = Number(max); // filters:{price: {$lte: Number(minPrice)}}
    }

    const query = search
      ? {
          $and: [filters, { title: { $regex: search, $options: "i" } }],
        }
      : filters;

    const gigs = await Gig.find(query).sort({ [sort]: -1 });
    res.status(200).json(gigs);
  } catch (err) {
    next(err);
  }
};
