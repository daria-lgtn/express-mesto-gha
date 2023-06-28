const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const { URL_REGEX, CODE_DUPLICATE } = require('./constants');
const { NotFoundError } = require('./errors/NotFound');
const {
  login, createUser,
} = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const {
  ERROR_SERVER, ERROR_CONFLICT, ERROR_FORBIDDEN,
  ERROR_VALIDATION, ERROR_UNAUTHORIZED, ERROR_NOT_FOUND,
} = require('./constants');
const { ErrorAuthorization } = require('./errors/ErrorAuthorization');
const { ErrorAccess } = require('./errors/ErrorAccess');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', celebrate(({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
})), login);
app.post('/signup', celebrate(({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REGEX),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
})), createUser);

app.use(auth);

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((req, res, next) => next(new NotFoundError('Некорректный маршрут')));
app.use(errors());
app.use((err, req, res, next) => {
  if ((err instanceof mongoose.Error.ValidationError)
  || (err instanceof mongoose.Error.CastError)) {
    res.status(ERROR_VALIDATION).send(err.message);
  } else if (err.code === CODE_DUPLICATE) {
    res.status(ERROR_CONFLICT).send(err.message);
  } else if (err instanceof NotFoundError) {
    res.status(ERROR_NOT_FOUND).send(err.message);
  } else if (err instanceof ErrorAuthorization) {
    res.status(ERROR_UNAUTHORIZED).send(err.message);
  } else if (err instanceof ErrorAccess) {
    res.status(ERROR_FORBIDDEN).send(err.message);
  } else {
    console.log(err.message);
    res.status(ERROR_SERVER).send('Произошла ошибка на сервере');
  }

  next();
});

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
