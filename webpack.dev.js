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
