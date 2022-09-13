const path = require('path')

var config = {
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      "buffer": require.resolve("buffer")
    },
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
    App: './src/root-spas/App.jsx',
    OrdersApp: './src/root-spas/OrdersApp.jsx',
    MgtUser: './src/root-spas/MgtUser.jsx',
    Messaging: './src/root-spas/Messaging.jsx',
    Subscription: './src/root-spas/Subscription.jsx',
    Operations: './src/root-spas/Operations.jsx',
    // TODO merge these SPA into one SPA if possible
    CreateArticle: './src/root-spas/CreateArticle.jsx',
    ArticleSelector: './src/root-spas/ArticleSelector.jsx',
    ArticlesCategorySelector: './src/root-spas/ArticlesCategorySelector.jsx',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist'),
    // clean: true,
  }
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
