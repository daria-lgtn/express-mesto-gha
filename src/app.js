const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '64880d4a0b169d0633eabb57', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use('/users', require('./routes/user'));
app.use('/cards', require('./routes/card'));

app.use((req, res) => {
  res.status(404).send('Invalid route');
});

app.use((err, req, res, next) => {
  if (err) {
    if (err.name === 'ValidationError') {
      res.status(400).send(err.message);
    } else {
      res.status(500).send(err.message);
    }
  } else {
    next();
  }
});

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
