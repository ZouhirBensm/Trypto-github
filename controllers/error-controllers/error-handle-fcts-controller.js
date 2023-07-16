const httpStatus = require("http-status-codes")
const ENV = require('../../config/base')



const errorResponseDispatcherController = async (err, req, res, next) => {
  console.log("\n\n\x1b[33;5mOn errorResponseDispatcherController\x1b[0m\n\n\n\x1b[37;43;1mConstructor: ", err.constructor.name, '\x1b[0m')

  switch (err.constructor.name) {
    // Used to experiment custom throw errors for mongo DB methods
    case "ResetPasswordReset":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.client_message,
        }
      })
    case "GenericJSONError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message,
        }
      })
    case "MongoError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.usr_message,
        }
      })
    case "GoogleAPIError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.usr_message,
        }
      })
    case "LoggingInError":
      return res.status(err.statusCode).send({
        error: {
          type: err.type,
          message: err.message,
          // message: res.locals.notification,
        }
      })
    case "ValidationError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message, // Array<string> format
          validatee: err.validatee
        }
      })
    case "NoRefererError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message, // String format
        }
      })
    case "FirstPathNotRegistered":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message, // String format
        }
      })
    case "UnsubscribeError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: {
            client_message: err.client_message,
            admin_message: err.admin_message
          }
        }
      })
    case "DeleteAccountProcessError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: {
            client_message: err.client_message,
            admin_message: err.admin_message
          }
        }
      })
    case "RoleNotPermitedError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: {
            client_message: err.message,
            admin_message: err.message
          }
        }
      })
    case "SessionRoleOrSentUIDnotAllowed":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: {
            client_message: err.client_message,
            admin_message: err.admin_message
          }
        }
      })
    case "MarketOrderSubmissionError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: {
            client_message: err.client_message,
            admin_message: err.admin_message
          }
        }
      })
    case "MulterError":
      return res.status(httpStatus.StatusCodes.REQUEST_TOO_LONG).json({
        error: {
          type: err.type,
          message: {
            client_message: `${err.message}, Images need to be under: ${max_marketimagefilesize} bytes`,
            admin_message: err.message
          }
        }
      })
    case "ProfileImageUploadError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: {
            client_message: err.client_message,
            admin_message: err.admin_message
          }
        }
      })
    case "CreateArticleError":
    case "EditArticleError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: {
            admin_message: err.admin_message,
            message: err.message
          }
        }
      })
    case "PayloadInadequateError":
      return res.status(err.statusCode).json({
        error: {
          type: err.type,
          message: err.message
        }
      })
    default:
      console.log("switch end")
      return next(err)
      break;
  }
}

const errorResponderController = (err, req, res, next) => {
  console.log("\n\n\n\x1b[38;5;130;5mOn errorResponderController\x1b[0m")


  console.log("\n\x1b[37;48;5;172;1mEnvironment", ENV.environment, '\x1b[0m\n\n')

  const errorStatus = httpStatus.StatusCodes.INTERNAL_SERVER_ERROR

  let error_sent

  ENV.environment === "developement" ?
    error_sent = `On errorResponderController.\nAn Error has occured on the server please have a look!\nError: ${err}` :
    error_sent = `${errorStatus} | Sorry, our web server is Down!`;


  return res.status(errorStatus).send(error_sent)

}





module.exports = {
  errorResponseDispatcherController,
  errorResponderController
}