class NotAuthorized extends Error {
  constructor(message = 'Необходима авторизация') {
    super(message);
    this.name = 'NotAuthorized';
  }
}

module.exports.NotAuthorized = NotAuthorized;
