switch (process.env.NODE_ENV) {
  case 'remote':
    console.log("Exporting Remote variables")
    module.exports = require('./remote')
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