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

const { PORT = 3000 } = process.env;

// Подключение к серверу MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());
app.use(corsMiddleware);
app.use(requestLogger); // подключаем логгер запросов

app.post('/signin', login);
app.post('/signup', celebrate(userValidationSchema), createUser);

app.use(moviesRouter);
app.use(usersRouter);

app.use(errorLogger); // подключаем логгер ошибок

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
