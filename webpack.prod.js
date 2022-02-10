const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


let config_array = []

common.forEach(common_element => {
  config_array.push(merge(common_element, {
    mode: 'production',
  }))
})


module.exports = config_array