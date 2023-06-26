class InvalidRoute extends Error {
  constructor(message = 'Неправильный маршрут') {
    super(message);
    this.name = 'InvalidRoute';
  }
}

module.exports.InvalidRoute = InvalidRoute;
