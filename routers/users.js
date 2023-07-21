const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { userProfileValidationSchema } = require('../utils/constants');
const authMiddleware = require('../middlewares/authMiddleware');

const {
  getUserInformation,
  updateUserProfile,
} = require('../controllers/users');

router.get('/users/me', authMiddleware, getUserInformation);

router.patch('/users/me', authMiddleware, celebrate(userProfileValidationSchema), updateUserProfile);

module.exports = router;
