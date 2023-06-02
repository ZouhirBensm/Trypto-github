// const {RoleNotPermitedError} = require('../../custom-errors/custom-errors')
const httpStatus = require("http-status-codes")


function responseController(req, res){

  const msg = 'Successfully saved FAQ Item'
  return res.status(200).json({
    message: msg
  })
  
}



module.exports = {
  responseController
}