switch (process.env.NODE_ENV) {
  case 'staging':
    console.log("Exporting Staging variables")
    module.exports = require('./stag')
    break;
  // case 'production':
  //   console.log("Exporting Production variables")
  //   module.exports = require('./prod')
  //   break;
  case 'development':
    console.log("Exporting Development variables")
    module.exports = require('./dev')
    break;
  default:
    module.exports = require('./dev')
    break;
}