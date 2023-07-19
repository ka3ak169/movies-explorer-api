const Movie = require('../models/movie');

const { BadRequestError } = require('../utils/BadRequestError');
const { ConflictError } = require('../utils/ConflictError');
const { ForbiddenError } = require('../utils/ForbiddenError');
const { NotFoundError } = require('../utils/NotFoundError');
const { UnauthorizedError } = require('../utils/UnauthorizedError');
const { movieParams } = require('../utils/constants');
// const mongoose = require('mongoose');

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

const postMovies = (req, res, next) => {
  const movieBody = req.body;
  const owner = req.user.id;
  // console.log(movieBody);
  // console.log(owner);
  // console.log(mongoose.Types.ObjectId.isValid(owner));
  // console.log('Body of the request: ', newMovie);

  Movie.create({ ...movieBody, owner })
    .then((movie) => {
      console.log(movie);
      res.send({ movie });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        console.log(error.errors); // подробные ошибки валидации
        next(new BadRequestError('Переданы некорректные данные фильма'));
      } else {
        next(error);
      }
    });
};

// нужно подумать над реализацией
const deleteMovies = (req, res, next) => {
  const { moviesId } = req.params;
  const userId = req.user.id;
  // console.log(userId);
  // console.log(req.params.moviesId);

  Movie.findById(moviesId)
    .then((movie) => {
      // console.log(movie);
      if (!movie) {
        next(new NotFoundError('Такого фильма не существует'));
        return;
      }

      // if (movie.owner && movie.owner.toString() !== userId) {
      //   next(new ForbiddenError('Доступ запрещен'));
      //   return;
      // }

      Movie.findByIdAndRemove(moviesId)
        .then((deletedMovie) => res.send(deletedMovie))
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

module.exports = {
  getMovies,
  postMovies,
  deleteMovies,
};
