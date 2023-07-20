const Joi = require('joi');

const userValidationSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

module.exports = {
  userValidationSchema,
};
