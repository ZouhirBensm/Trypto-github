const path = require('path')

var config = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  stats: {errorDetails: true},
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: [/\.js$/, /\.jsx$/],
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ["@babel/preset-env", {
                "targets": {
                  "ie": "11",
                  "edge": "15",
                  "safari": "10",
                  "firefox": "50",
                  "chrome": "49"
                }
              }],
              "@babel/preset-react"
            ]
          }
        }
      }
    ]
  },
  devtool : 'inline-source-map',
  entry: {
    App: './src/App.jsx',
    OrdersApp: './src/OrdersApp.jsx',
    MgtUser: './src/MgtUser.jsx',
    Messaging: './src/Messaging.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist'),
    // clean: true
  },
};

module.exports = config

// var fooConfig = Object.assign({}, config, {
//   //name: "a",
//   entry: './src/App.jsx',
//   output: {
//     filename: 'App.js',
//     path: path.resolve(__dirname, 'public/dist'),
//   },
// });


// var barConfig = Object.assign({}, config,{
//   entry: './src/OrdersApp.jsx',
//   output: {
//     filename: 'OrdersApp.js',
//     path: path.resolve(__dirname, 'public/dist'),
//   },
// });
// var zooConfig = Object.assign({}, config,{
//   entry: './src/MgtUser.jsx',
//   output: {
//     filename: 'MgtUser.js',
//     path: path.resolve(__dirname, 'public/dist'),
//     // clean: true
//   },
// });
// var looConfig = Object.assign({}, config,{
//   entry: './src/Messaging.jsx',
//   output: {
//     filename: 'Messaging.js',
//     path: path.resolve(__dirname, 'public/dist'),
//     // clean: true
//   },
// });

// Return Array of Configurations
// module.exports = [
//   fooConfig, barConfig, zooConfig, looConfig
// ];
