const express = require('express');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
const { userValidationSchema } = require('./utils/constants');
const errorMiddleware = require('./middlewares/errorMiddleware');
const moviesRouter = require('./routers/movies');
const usersRouter = require('./routers/users');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsMiddleware = require('./middlewares/corsMiddleware');
const {
  login,
  createUser,
} = require('./controllers/users');
require('dotenv').config();
const { NotFoundError } = require('./utils/NotFoundError');

const { PORT = 3000 } = process.env;
let dbUri = 'mongodb://127.0.0.1:27017/bitfilmsdb';
if (process.env.NODE_ENV === 'production') {
  dbUri = process.env.MONGODB_URI;
}

// Подключение к серверу MongoDB
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(requestLogger); // подключаем логгер запросов
app.use(express.json());
app.use(corsMiddleware);

app.post('/signin', celebrate(userValidationSchema), login);
app.post('/signup', celebrate(userValidationSchema), createUser);

app.use(moviesRouter);
app.use(usersRouter);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'));
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
