class ErrorHandler extends Error {
  constructor({ message, status, data }) {
    super(message);
    this.name = 'Error';
    this.status = status;
    this.data = data;
  }
}

module.exports = ErrorHandler;
