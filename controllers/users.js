const bcrypt = require('bcrypt');
const User = require('../models/user');
const getJwtToken = require('../utils/jwt');
require('dotenv').config();

const { BadRequestError } = require('../utils/BadRequestError');
const { ConflictError } = require('../utils/ConflictError');
const { ForbiddenError } = require('../utils/ForbiddenError');
const { NotFoundError } = require('../utils/NotFoundError');
const { UnauthorizedError } = require('../utils/UnauthorizedError');

const SALT_ROUNDS = 10;

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  if (!password) {
    const badRequestError = new BadRequestError('Не предоставлен пароль');
    next(badRequestError);
    return;
  }

  bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    if (err) {
      next((err) => next(err));
      return;
    }

    User.create({
      name, email, password: hash,
    })
      .then((user) => {
        const { password, ...userData } = user.toObject();
        res.send({ user: userData, message: 'Успешная регистрация' });
      })
      .catch((error) => {
        if (error.code === 11000) {
          const conflictError = new ConflictError('Пользователь с таким email уже существует');
          next(conflictError);
        } else if (error.name === 'ValidationError') {
          console.log(error);
          const badRequestError = new BadRequestError('Переданы некорректные данные пользователя');
          next(badRequestError);
        } else {
          next(error);
        }
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        next(new UnauthorizedError('Неправильные почта или пароль'));
        return;
      }

      bcrypt.compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            next(new UnauthorizedError('Неправильные почта или пароль'));
            return;
          }
          req.user = user;

          const id = user._id.toString();
          const token = getJwtToken(id);

          res.send({ message: 'Успешная авторизация', token });
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
};

// Получение списка фильмов
const getUserInformation = (req, res, next) => {
  const userId = req.user.id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        next(new NotFoundError('Пользователь не найден'));
        return;
      }
      res.send({ data: user });
    })
    .catch((error) => next(error));
};

// обновляет информацию о пользователе
const updateUserProfile = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    req.user.id,
    { name, email },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные обновления профиля'));
      } else if (error.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else {
        next(error);
      }
    });
};

module.exports = {
  getUserInformation,
  updateUserProfile,
  createUser,
  login,
};
