class ErrorAccess extends Error {
  constructor(message = 'Нет доступа') {
    super(message);
    this.name = 'ErrorAccess';
  }
}

module.exports.ErrorAccess = ErrorAccess;
