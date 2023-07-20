const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/authMiddleware');

const {
  getUserInformation,
  updateUserProfile,
} = require('../controllers/users');

router.get('/users/me', authMiddleware, getUserInformation);

router.patch('/users/me', authMiddleware, updateUserProfile);

module.exports = router;
