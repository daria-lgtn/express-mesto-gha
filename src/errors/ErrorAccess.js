class ErrorAccess extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorAccess';
  }
}

module.exports.ErrorAccess = ErrorAccess;
