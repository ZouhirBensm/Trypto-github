const mongoose = require('mongoose')
const httpStatus = require("http-status-codes")

module.exports = (req, res, next)=>{
  console.log(mongoose.connection.readyState);

  if(mongoose.connection.readyState === 1){
    res.status(httpStatus.StatusCodes.OK).json({
      server: {
        message: ["Yes the server, and mongoose connection is up!"]
      }
    })
  } else {
    res.status(httpStatus.StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: {
        message: ["Server is running, but problem with mongoose connection!"]
      }
    })
  }
}