const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

let config_array = []

common.forEach(common_element => {
  config_array.push(merge(common_element, {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
      static: './dist',
    },
    watch: true,
  }))
})


module.exports = config_array