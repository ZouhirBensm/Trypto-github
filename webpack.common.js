const path = require('path')
const { EnvironmentPlugin, ProvidePlugin, DefinePlugin } = require("webpack")
const Dotenv = require('dotenv-webpack');


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
      // "buffer": require.resolve("buffer"),
      "buffer": require.resolve("buffer/")
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
    Settings: './src/root-spas/Settings.jsx',
  },
  output: {
    // Deletable libraryTarget: 'commonjs2',
    // libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist'),
    // clean: true,
  },
  plugins: [
    // First access env variables from .env
    new Dotenv(),
    // Drawback to get environment variables for the front end, currently used in staging
    // If issues with environment variables, would require to comment out!
    // new DefinePlugin({
    //   'process.env': {
    //     NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    //     PAYPAL_API_ROOT: JSON.stringify(process.env.PAYPAL_API_ROOT),
    //     CONSOLE_CLOUD_GOOGLE_API_KEY: JSON.stringify(process.env.CONSOLE_CLOUD_GOOGLE_API_KEY),
    //     PAYPAL_PLAN_ID: JSON.stringify(process.env.PAYPAL_PLAN_ID),
    //     PAYPAL_PRODUCT_ID: JSON.stringify(process.env.PAYPAL_PRODUCT_ID),
    //     PAYPAL_CLIENT_ID: JSON.stringify(process.env.PAYPAL_CLIENT_ID),
    //     DOMAIN_WITHOUT_PROTOCOL: JSON.stringify(process.env.DOMAIN_WITHOUT_PROTOCOL),
    //     BIDBLOCK_EMAIL: JSON.stringify(process.env.BIDBLOCK_EMAIL),
    //     ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
    //   }
    // }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};

module.exports = config

