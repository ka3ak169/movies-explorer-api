const express = require('express');
const mongoose = require('mongoose');
const movieRouter = require('./routers/movies');

const { PORT = 3000 } = process.env;

const app = express();

// Подключение к серверу MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(movieRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
