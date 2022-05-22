class CustomError extends Error {
  constructor() {
    super()
    this.statusCode = 500
  }
}

class SubCustomError extends CustomError {
  constructor(){
    super()
  }
}

// Kept as an example
class MongoCreateCustomError extends CustomError {
  constructor(){
    super()
    // this.statusCode = 200 // overwrite
    this.type = this.constructor.name
    this.message = `Server was unable to create your account`
  }
}


class LoggingInError extends CustomError {
  constructor(){
    super()
    this.type = this.constructor.name
    this.message
  }
}

module.exports = {
  CustomError,
  SubCustomError,
  MongoCreateCustomError,
  LoggingInError
}