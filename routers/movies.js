const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/authMiddleware');
const { movieValidationSchema, movieIdValidationSchema } = require('../utils/constants');

const {
  getMovies,
  postMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/movies', authMiddleware, getMovies);

router.post('/movies', authMiddleware, celebrate(movieValidationSchema), postMovies);

router.delete('/movies/:moviesId', authMiddleware, celebrate(movieIdValidationSchema), deleteMovies);

module.exports = router;
