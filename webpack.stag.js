const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const {EnvironmentPlugin} = require("webpack")


let config_array = []

common.forEach(common_element => {
  config_array.push(merge(common_element, {
    mode: 'production',
    plugins: [
      new EnvironmentPlugin({
        ROOT: "https://hidden-plateau-87550.herokuapp.com",
      })
    ]
  }))
})


module.exports = config_array