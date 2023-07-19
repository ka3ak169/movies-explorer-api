const express = require('express');
const mongoose = require('mongoose');
const errorMiddleware = require('./middlewares/errorMiddleware');
const moviesRouter = require('./routers/movies');
const usersRouter = require('./routers/users');
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

app.post('/signin', login);
app.post('/signup', createUser);

app.use(moviesRouter);
app.use(usersRouter);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
