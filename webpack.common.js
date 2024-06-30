const path = require('path')
// const { EnvironmentPlugin, ProvidePlugin, DefinePlugin } = require("webpack")
// const Dotenv = require('dotenv-webpack');

resolve: {
  fallback: {
    "path": require.resolve("path-browserify"),
    "fs": false
  }
},

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
    // fallback: {
    //   // "buffer": require.resolve("buffer"),
    //   "buffer": require.resolve("buffer/")
    // },
    fallback: {
      "buffer": require.resolve("buffer/"),
      "path": require.resolve("path-browserify"),
      "fs": false  // Add fs fallback to false if not already there
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
    MarketPlace: './src/root-spas/MarketPlace.jsx',
    MgtUser: './src/root-spas/MgtUser.jsx',
    Messaging: './src/root-spas/Messaging.jsx',
    Subscription: './src/root-spas/Subscription.jsx',
    Operations: './src/root-spas/Operations.jsx',
    // TODO merge these SPA into one SPA if possible
    CreateArticle: './src/root-spas/CreateArticle.jsx',
    ArticleSelector: './src/root-spas/ArticleSelector.jsx',
    ArticlesCategorySelector: './src/root-spas/ArticlesCategorySelector.jsx',
    Settings: './src/root-spas/Settings.jsx',
    ToDelete: './src/root-spas/ToDelete.jsx',
    FAQPage: './src/root-spas/FAQPage.jsx',
    TermsConditions: './src/root-spas/TermsConditions.jsx',
    AddFAQ: './src/root-spas/AddFAQ.jsx',
    OnPageFooter: './src/generic-components/OnPageFooter.jsx',
    EmailMarketingCollector: './src/home-functionalities/EmailMarketingCollector.jsx',
    Contact: './src/root-spas/Contact.jsx'
  },
  output: {
    // Deletable libraryTarget: 'commonjs2',
    // libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist'),
    // clean: true,
  },
  // plugins: [
  // ],
};

module.exports = config


// old versions: { node: 'v16.14.2', npm: '8.5.0' }