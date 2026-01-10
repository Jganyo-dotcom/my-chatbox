const Joi = require("joi");

const validateRegister = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validateLoginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const validatemessages = Joi.object({
  sender: Joi.string().hex().length(24).required(),
  recipient: Joi.string().hex().length(24).required(),
  message: Joi.string().required(),
});

module.exports = { validateRegister, validateLoginUser, validatemessages };
