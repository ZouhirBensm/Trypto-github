const { merge } = require('webpack-merge');
const config = require('./webpack.common.js');
const { EnvironmentPlugin, ProvidePlugin, DefinePlugin } = require("webpack")


// let config_array = []
//deploy

let stage_config = merge(config, {
  mode: 'production',
  plugins: [
    // If issues with environment variables, would require to comment out!
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PAYPAL_API_ROOT: JSON.stringify(process.env.PAYPAL_API_ROOT),
        CONSOLE_CLOUD_GOOGLE_API_KEY: JSON.stringify(process.env.CONSOLE_CLOUD_GOOGLE_API_KEY),
        PAYPAL_PLAN_ID: JSON.stringify(process.env.PAYPAL_PLAN_ID),
        PAYPAL_PRODUCT_ID: JSON.stringify(process.env.PAYPAL_PRODUCT_ID),
        PAYPAL_CLIENT_ID: JSON.stringify(process.env.PAYPAL_CLIENT_ID),
        DOMAIN_WITHOUT_PROTOCOL: JSON.stringify(process.env.DOMAIN_WITHOUT_PROTOCOL),
        BIDBLOCK_EMAIL: JSON.stringify(process.env.BIDBLOCK_EMAIL),
        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
      }
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    })
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})


// common.forEach(common_element => {
//   config_array.push(merge(common_element, {
//     mode: 'production',
//     plugins: [
//       new EnvironmentPlugin({
//         ROOT: "https://hidden-plateau-87550.herokuapp.com",
//       })
//     ]
//   }))
// })

// module.exports = config_array


module.exports = stage_config
