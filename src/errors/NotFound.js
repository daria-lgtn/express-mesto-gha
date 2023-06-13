class NotFoundError extends Error {
  constructor(message = 'entity not found') {
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports.NotFoundError = NotFoundError;
