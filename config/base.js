

if(process.env.NODE_ENV == 'production' || process.env.NODE_ENV == 'development') {
  module.exports = require('./env')
} else {
  console.log(`Environment is not as wanted: ${process.env.NODE_ENV}`)
}


// switch (process.env.NODE_ENV) {
//   case 'remote':
//     console.log("Exporting Remote variables")
//     module.exports = require('./remote')
//     break;
//   case 'development':
//     console.log("Exporting Development variables")
//     console.log(process.env)
//     module.exports = require('./dev')
//     break;
//   default:
//     console.log("Exporting Default variables")
//     // module.exports = require('./dev')
//     break;
// }


// TODO setup production real paypal plan, and change env variables accordingly
