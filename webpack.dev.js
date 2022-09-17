const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');
const config = require('./webpack.common.js');
const {EnvironmentPlugin, ProvidePlugin} = require("webpack")

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
    }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ]
})


module.exports = dev_config
