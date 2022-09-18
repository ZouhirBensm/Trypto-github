

switch (process.env.NODE_ENV) {
  case 'remote':
    console.log("Exporting Remote variables")
    module.exports = require('./remote')
    break;
  case 'development':
    console.log("Exporting Development variables")
    module.exports = require('./dev')
    break;
  default:
    console.log("Exporting Default variables")
    
    break;
}

