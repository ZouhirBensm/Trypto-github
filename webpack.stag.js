const { merge } = require('webpack-merge');
// const common = require('./webpack.common.js');
const config = require('./webpack.common.js');
// const { EnvironmentPlugin, ProvidePlugin, DefinePlugin } = require("webpack")


// let config_array = []
//deploy

let stage_config = merge(config, {
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
