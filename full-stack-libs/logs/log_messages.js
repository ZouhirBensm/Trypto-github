const { getLogPiece1, getEndpointResponsePiece1 } = require('./log_template_pieces1')


function getExpressLog(filename, req, logId, GoodLookingDateTime, err = null) {

  let message = "You've hit the end of the endpoint"

  if (err) {
    message = `Error Message: ${err.message}`
  }

  const LogPiece1 = getLogPiece1(filename, req, logId, GoodLookingDateTime)

  const errorLogMessage =  LogPiece1 + `
${message}
------------------------------------------------------------
`
  return errorLogMessage;
}



function getEndpointResponseMessage(req, message) {

  const endpointResponsePiece1 = getEndpointResponsePiece1(req)

  const endpointResponseMessage = endpointResponsePiece1 + `Endpoint message: ${message}
------------------------------------------------------------
`
  return endpointResponseMessage;
}










module.exports = {
  getExpressLog,
  getEndpointResponseMessage
}