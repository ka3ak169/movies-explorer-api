const Joi = require('joi');

const userValidationSchema = {
  body: Joi.object({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
};

const movieValidationSchema = {
  body: Joi.object({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().integer().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    owner: Joi.string().required().alphanum().length(24),
    movieId: Joi.number().required(),
    // nameRU: Joi.string().required().custom((value, helpers) => {
    //   if (/^[а-яёЁ\s\-]+$/i.test(value)) {
    //     return value;
    //   }
    //   return helpers.message('Только кириллица');
    // }),
    nameRU: Joi.string().required(),
    // nameEN: Joi.string().required().custom((value, helpers) => {
    //   if (/^[a-z\s\-]+$/i.test(value)) {
    //     return value;
    //   }
    //   return helpers.message('Только латиница');
    // }),
    nameEN: Joi.string().required(),
  }),
};

const movieIdValidationSchema = {
  params: Joi.object().keys({
    moviesId: Joi.string().length(24).hex().required(),
  }),
};

const userProfileValidationSchema = {
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).optional(),
    email: Joi.string().email().optional(),
  }),
};

// Массив доменов, с которых разрешены кросс-доменные запросы
// const allowedCors = [
//   '*',
// ];

const allowedCors = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3000',
  'https://localhost:3001',
  'http://127.0.0.1:3001',
  'https://127.0.0.1:3001',
  'https://diploma-folio.nomoredomainsicu.ru',
  'http://diploma-folio.nomoredomainsicu.ru',
  '*',
];

module.exports = {
  userValidationSchema,
  allowedCors,
  movieValidationSchema,
  movieIdValidationSchema,
  userProfileValidationSchema,
};
