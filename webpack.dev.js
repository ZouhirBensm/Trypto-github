const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');
const config = require('./webpack.common.js');
const {EnvironmentPlugin} = require("webpack")

// let config_array = []

let dev_config = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  watch: true,
  plugins: [
    new EnvironmentPlugin({
      ROOT: "http://localhost:3000",
      // All credentials generated through the https://developer.paypal.com/ URL, logged in as businessZBRS@gmail.com, in a sandbox context
      paypal_plan_id: "P-8K2448559P9609535MMAPYHA", // Product linked to sb-mzq9r20359069@business.example.com, throught to the BidBlock Development Staging created app, requires a product ID
      paypal_product_id: "PROD-6NP19803R0467982A", // Product linked to sb-mzq9r20359069@business.example.com, throught to the BidBlock Development Staging created app
      paypal_api_root: "https://api-m.sandbox.paypal.com/v1",
      paypal_access_token: 'A21AAL6mr71qJ-MIYVAjnQ7PaQRd45MXZJa27-aULXK42dO1O9B7BlvLUONy0lFo1fAIba3wvTvoD5bTj2ly5HD48d8KpvBbQ', // Generated from developer.paypal.com, linked to the sb-mzq9r20359069@business.example.com sandbox account, linked to the BidBlock Development Staging app, generated with client_id:secret
    })
  ]
})


// common.forEach(common_element => {
//   config_array.push(merge(common_element, {
//     mode: 'development',
//     devtool: 'inline-source-map',
//     devServer: {
//       static: './dist',
//     },
//     watch: true,
//     plugins: [
//       new EnvironmentPlugin({
//         ROOT: "http://localhost:3000",
//       })
//     ]
//   }))
// })

// module.exports = config_array

module.exports = dev_config
