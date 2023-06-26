class InvalidCredentials extends Error {
  constructor(message = 'Неправильные почта или пароль') {
    super(message);
    this.name = 'InvalidCredentials';
  }
}

module.exports.InvalidCredentials = InvalidCredentials;
