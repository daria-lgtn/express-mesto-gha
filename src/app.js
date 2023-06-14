const express = require('express');
const mongoose = require('mongoose');
const { NotFoundError } = require('./errors/NotFound');
const { ERROR_SERVER, ERROR_VALIDATION, ERROR_NOT_FOUND } = require('./constants');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64880d4a0b169d0633eabb57', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send('Invalid route');
});

app.use((err, req, res, next) => {
  if ((err instanceof mongoose.Error.ValidationError)
  || (err instanceof mongoose.Error.CastError)) {
    res.status(ERROR_VALIDATION).send(err.message);
  } else if (err instanceof NotFoundError) {
    res.status(ERROR_NOT_FOUND).send(err.message);
  } else {
    res.status(ERROR_SERVER).send(err.message);
  }

  next();
});

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
