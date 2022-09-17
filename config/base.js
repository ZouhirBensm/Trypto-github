switch (process.env.NODE_ENV) {
  case 'staging':
    module.exports = require('./stag')
    break;
  case 'production':
    module.exports = require('./prod')
    break;
  case 'development':
    module.exports = require('./dev')
    break;
  default:
    module.exports = require('./dev')
    break;
}