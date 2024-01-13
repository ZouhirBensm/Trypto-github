const fs = require('fs');


const { getGoodLookingDateTime } = require('../../../full-stack-libs/utils')
const { getExpressLog, getEndpointResponseMessage } = require('../../../full-stack-libs/logs/log_messages')


async function cont1(req, res, next) {

  const logId = req.headers['x-log-id'];

  console.log({logId})

  // Get the current date and time in a readable format
  const GoodLookingDateTime = getGoodLookingDateTime()


  // Testing error handling
  // const error = new Error('Error description');
  // return next(error);

  const expressLog = getExpressLog(__filename, req, logId, GoodLookingDateTime)

  fs.appendFileSync(process.env['LOGS_FILE_PATH'], expressLog);

  // Closes the logs generated from the sh script /home/zouhir/scripts/cron-curl-poc-2.sh on /home/zouhir/logs/cron-curl-poc-2.txt
  const message = 'Success'
  const endpointResponseMessage = getEndpointResponseMessage(req, message)

  return res.status(200).send(endpointResponseMessage);
}





async function error_cont1(err, req, res, next) {

  const GoodLookingDateTime = getGoodLookingDateTime()

  const logId = req.headers['x-log-id'];

  const expressLog = getExpressLog(__filename, req, logId, GoodLookingDateTime, err)
  
  fs.appendFileSync(process.env['LOGS_FILE_PATH'], expressLog);

  const message = 'An error occurred'

  const endpointResponseMessage = getEndpointResponseMessage(req, message)

  return res.status(500).send(endpointResponseMessage);
}



module.exports = {
  cont1,
  error_cont1
}