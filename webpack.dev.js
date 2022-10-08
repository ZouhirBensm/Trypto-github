const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');
const config = require('./webpack.common.js');
const { EnvironmentPlugin, ProvidePlugin, DefinePlugin } = require("webpack")

// let config_array = []
console.log(process.env)

let dev_config = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
  },
  watch: true,
  plugins: [
    // TODO real way to use:
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PAYPAL_API_ROOT: JSON.stringify(process.env.PAYPAL_API_ROOT),
        CONSOLE_CLOUD_GOOGLE_API_KEY: JSON.stringify(process.env.CONSOLE_CLOUD_GOOGLE_API_KEY),
        PAYPAL_PLAN_ID: JSON.stringify(process.env.PAYPAL_PLAN_ID),
        PAYPAL_PRODUCT_ID: JSON.stringify(process.env.PAYPAL_PRODUCT_ID),
      }
    }),
    // new EnvironmentPlugin(['ROOT', 'PAYPAL_PLAN_ID', 'PAYPAL_PRODUCT_ID','PAYPAL_API_ROOT', 'CONSOLE_CLOUD_GOOGLE_API_KEY']),
    // new EnvironmentPlugin({
    //   ROOT: "localhost:3000",
    //   // All credentials generated through the https://developer.paypal.com/ URL, logged in as businessZBRS@gmail.com, in a sandbox context
    //   paypal_plan_id: "P-8K2448559P9609535MMAPYHA", // Product linked to sb-mzq9r20359069@business.example.com, throught to the BidBlock Development Staging created app, requires a product ID
    //   paypal_product_id: "PROD-6NP19803R0467982A", // Product linked to sb-mzq9r20359069@business.example.com, throught to the BidBlock Development Staging created app
    //   paypal_api_root: "https://api-m.sandbox.paypal.com/v1",
    //   console_cloud_google_api_key: 'AIzaSyBIOZMezc-bUpTqR7yRRxcv2Lynb49CFCM',
    // }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ]
})


module.exports = dev_config
