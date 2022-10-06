const path = require('path')

var config = {
  // Deletable externals:
  // externals: {
  //   react: "commonjs react",
  //   "react-dom": "commonjs react-dom",
  // },
  resolve: {
    // Deletable alias:
    // alias: {
    //   // Needed when library is linked via `npm link` to app
    //   react: path.resolve("./node_modules/react")
    // },
    // alias: {
    //   'react': path.resolve(__dirname, './node_modules/react'),
    //   'react-dom': path.resolve(__dirname, './node_modules/react-dom')
    // },
    extensions: ['.js', '.jsx'],
    fallback: {
      "buffer": require.resolve("buffer")
    },
  },
  stats: { errorDetails: true },
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
  devtool: 'inline-source-map',
  entry: {
    App: './src/root-spas/App.jsx',
    BTClayerexchange: './src/root-spas/BTClayerexchange.jsx',
    MarketPlace: './src/root-spas/MarketPlace.jsx',
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
    // Deletable libraryTarget: 'commonjs2',
    // libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist'),
    // clean: true,
  }
};

module.exports = config

