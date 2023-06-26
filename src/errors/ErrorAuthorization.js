class ErrorAuthorization extends Error {
  constructor(message) {
    super(message);
    this.name = 'ErrorAuthorization';
  }
}

module.exports.ErrorAuthorization = ErrorAuthorization;
