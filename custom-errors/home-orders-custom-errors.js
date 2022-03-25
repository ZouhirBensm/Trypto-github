class CustomError extends Error {
  constructor() {
    super()
    this.name = this.constructor.name
    this.message = `message`
    this.statusCode = 500
  }
}

class SubCustomError extends CustomError {}

module.exports = {
  CustomError,
  SubCustomError
}