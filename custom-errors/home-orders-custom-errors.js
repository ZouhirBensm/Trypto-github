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

class MongoCreateCustomError extends CustomError {
  constructor(){
    super()
    // this.statusCode = 200 // overwrite
    this.type = this.constructor.name
    this.message = `Server was unable to create your account`
  }
}

module.exports = {
  CustomError,
  SubCustomError,
  MongoCreateCustomError
}