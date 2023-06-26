const express = require('express');
const mongoose = require('mongoose');
const { NotFoundError } = require('./errors/NotFound');
const {
  login, createUser,
} = require('./controllers/user');
const { auth } = require('./middlewares/auth');
const {
  ERROR_SERVER, ERROR_VALIDATION, ERROR_UNAUTHORIZED, ERROR_NOT_FOUND,
} = require('./constants');
const { NotAuthorized } = require('./errors/NotAuthorized');
const { InvalidCredentials } = require('./errors/InvalidCredentials');
const { InvalidRoute } = require('./errors/InvalidRoute');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mestodb');

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use(() => {
  throw new InvalidRoute();
});

app.use((err, req, res, next) => {
  console.log(err.message);

  if ((err instanceof mongoose.Error.ValidationError)
  || (err instanceof mongoose.Error.CastError)) {
    res.status(ERROR_VALIDATION).send();
  } else if (err instanceof NotFoundError) {
    res.status(ERROR_NOT_FOUND).send();
  } else if (err instanceof NotAuthorized) {
    res.status(ERROR_UNAUTHORIZED).send();
  } else if (err instanceof InvalidCredentials) {
    res.status(ERROR_UNAUTHORIZED).send();
  } else if (err instanceof InvalidRoute) {
    res.status(ERROR_NOT_FOUND).send();
  } else {
    res.status(ERROR_SERVER).send();
  }

  next();
});

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
