const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "نام الزامی است"],
      trim: true,
      unique: [true, "این نام قبلاً ثبت شده است"],
      minlength: [3, "نام باید حداقل 3 کاراکتر باشد"],
      maxlength: [50, "نام نمی‌تواند بیش از ۵۰ کاراکتر باشد"],
    },

    email: {
      type: String,
      required: [true, "ایمیل الزامی است"],
      unique: [true, "این ایمیل قبلاً ثبت شده است"],
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "ایمیل وارد شده معتبر نیست"],
    },

    password: {
      type: String,
      required: [true, "رمز عبور الزامی است"],
      minlength: [6, "رمز عبور باید حداقل ۶ کاراکتر باشد"],
      select: false,
    },

    image: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: false,
    },
    desc: {
      type: String,
      required: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
