const { getEndpointResponseMessage } = require('../../../../full-stack-libs/logs/log_messages')


async function mid1(req, res, next) {
  const cronCurlSecretToken1 = process.env['CRON_CURL_SECRET_TOKEN_1'];

  const cronCurlRequestToken1 = req.headers['x-cron-token'];

  console.log({cronCurlSecretToken1, cronCurlRequestToken1})

  if (cronCurlRequestToken1 !== cronCurlSecretToken1) {

    const message = 'Unauthorized'
    const endpointResponseMessage = getEndpointResponseMessage(req, message)
    return res.status(403).send(endpointResponseMessage);
  }

  return next()
}


// async function mid2(req, res, next) {
//   return next()
// }








module.exports = {
  mid1,
  // mid2
}