const router = require('express').Router();

const {
  getMovies,
} = require('../controllers/movies');

router.get('/movies', getMovies);

module.exports = router;
