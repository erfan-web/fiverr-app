const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  registerValidation,
  loginValidation,
} = require("../validators/authValidator");
const { createError } = require("../utils/createError");

exports.register = async (req, res, next) => {
  try {
    const { error, value } = registerValidation.validate(req.body);

    if (error) {
      const errorMessage = error.details[0].message;
      return next(createError(400, errorMessage));
    }

    const { username, email, password } = value;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return next(createError(401, "قبلاً ثبت نام شده اید"));
    }
    const hash = await bcrypt.hash(password, 10);
    await User.create({ ...req.body, password: hash });
    res.status(201).json({ message: "user register successfully." });
  } catch (err) {
    console.error("Register ERROR:" + err);
    next(err);
  }
};
exports.login = async (req, res, next) => {
  try {
    const { error, value } = loginValidation.validate(req.body);
    if (error) {
      const errorMessage = error.details[0].message;
      return next(createError(400, errorMessage));
    }
    const { username, password } = value;
    const user = await User.findOne({ username }).select("+password");
    if (!user) {
      return next(createError(401, "Wrong password or username!"));
    }
    const comparePass = await bcrypt.compare(password, user.password);
    if (!comparePass) {
      return next(createError(401, "Wrong password or username!"));
    }
    const token = jwt.sign(
      { id: user._id, username, isSeller: user.isSeller },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ message: "user login successfully" });
  } catch (err) {
    console.error("Login ERROR:" + err);
    next(err);
  }
};
exports.logout = async (req, res, next) => {
  try {
    res
      .clearCookie("token", {
        httpOnly: true,
        secure: true, //process.env.NODE_ENV === "production",
        sameSite: "none",
      })
      .status(200)
      .json({ message: "با موفقیت خارج شدید." });
  } catch (err) {
    console.error("error in Logout:" + err);
    next(err);
  }
};
