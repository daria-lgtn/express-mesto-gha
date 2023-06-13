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
// app.use('/films', require('./routes/films'));
// app.use('/directors', require('./routes/directors'));
// app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`localhost:${PORT}`);
});
