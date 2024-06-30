const { merge } = require('webpack-merge');
const config = require('./webpack.common.js');
const { EnvironmentPlugin, ProvidePlugin, DefinePlugin } = require("webpack")
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

// console.log(process.env)
// let config_array = []
//deploy

let prod_config = merge(config, {
  mode: 'production',
  plugins: [
    new Dotenv(),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new NodePolyfillPlugin(),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})





module.exports = prod_config


// Add this to prod installation of sharp
// npm install --os=linux --cpu=x64 sharp
