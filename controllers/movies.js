const Movie = require('../models/movie');

const { BadRequestError } = require('../utils/BadRequestError');
const { ConflictError } = require('../utils/ConflictError');
const { ForbiddenError } = require('../utils/ForbiddenError');
const { NotFoundError } = require('../utils/NotFoundError');
const { UnauthorizedError } = require('../utils/UnauthorizedError');

// Получение списка фильмов
const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.send(movies);
    })
    .catch((error) => {
      if (error.name === 'UnauthorizedError') {
        next(new UnauthorizedError('Недействительный токен'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getMovies,
};
