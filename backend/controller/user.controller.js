const User = require("../models/User");
const { createError } = require("../utils/createError");

exports.getMe = async (req, res, next) => {
  try {
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(createError(404, "User Not Found!"));

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
