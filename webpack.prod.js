const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');
const config = require('./webpack.common.js');
const { EnvironmentPlugin, ProvidePlugin, DefinePlugin } = require("webpack")

console.log(process.env)
// let config_array = []
//deploy

let prod_config = merge(config, {
  mode: 'production',
  plugins: [
    // new ProvidePlugin({
    //   Buffer: ['buffer', 'Buffer'],
    // }),
  ],
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
})


module.exports = prod_config
