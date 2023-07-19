const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

const {
  getMovies,
  postMovies,
  deleteMovies,
} = require('../controllers/movies');

router.get('/movies', authMiddleware, getMovies);

router.post('/movies', authMiddleware, postMovies);

router.delete('/movies/:moviesId', authMiddleware, deleteMovies);

module.exports = router;
