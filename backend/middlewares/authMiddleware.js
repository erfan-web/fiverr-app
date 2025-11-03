const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { createError } = require("../utils/createError");

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return next(createError(401, "دسترسی غیرمجاز. لطفاً وارد شوید!"));
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return next(createError(401, "توکن معتبر نیست!"));
    }
    const user = await User.findById(payload.id).select("-password");

    req.user = user;
    next();
  } catch (err) {
    console.error("error in AuthMiddleware:" + err);
    next(err);
  }
};
