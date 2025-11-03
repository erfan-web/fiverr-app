const Joi = require("joi");

const registerValidation = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.empty": "نام الزامی است",
    "string.min": "نام باید حداقل 3 کاراکتر باشد",
    "string.max": "نام نمی‌تواند بیش از ۵۰ کاراکتر باشد",
    "any.required": "نام الزامی است",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "ایمیل معتبر نیست",
    "string.empty": "ایمیل الزامی است",
    "any.required": "ایمیل الزامی است",
  }),
  password: Joi.string().min(6).max(64).required().messages({
    "string.empty": "رمز عبور الزامی است",
    "string.min": "رمز عبور باید حداقل ۶ کاراکتر باشد",
    "string.max": "رمز عبور نمی‌تواند بیشتر از ۶۴ کاراکتر باشد",
    "any.required": "رمز عبور الزامی است",
  }),
  image: Joi.string(),
  isSeller: Joi.boolean().default(false),
  desc: Joi.string(),
  phone: Joi.string(),
  //   role: Joi.string().valid("admin", "users").default("users").messages({
  //     "any.only": "نقش انتخاب‌شده معتبر نیست",
  //   }),
});

const loginValidation = Joi.object({
  username: Joi.string().min(3).max(50).required().messages({
    "string.empty": "نام الزامی است",
    "string.min": "نام باید حداقل 3 کاراکتر باشد",
    "string.max": "نام نمی‌تواند بیش از ۵۰ کاراکتر باشد",
    "any.required": "نام الزامی است",
  }),
  password: Joi.string().min(6).required().messages({
    "string.min": "رمز عبور باید حداقل ۶ کاراکتر باشد",
    "any.required": "رمز عبور الزامی است",
    "string.empty": "رمز عبور نباید خالی باشد",
  }),
});

module.exports = {
  registerValidation,
  loginValidation,
};
