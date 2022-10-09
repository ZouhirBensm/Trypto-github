const path = require('path')
const { EnvironmentPlugin, ProvidePlugin, DefinePlugin } = require("webpack")

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
  },
  plugins: [
    // TODO real way to use:
    // env info: GIVES ACCESS TO REACT CODE TO BACKEND process.env variables
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        PAYPAL_API_ROOT: JSON.stringify(process.env.PAYPAL_API_ROOT),
        CONSOLE_CLOUD_GOOGLE_API_KEY: JSON.stringify(process.env.CONSOLE_CLOUD_GOOGLE_API_KEY),
        PAYPAL_PLAN_ID: JSON.stringify(process.env.PAYPAL_PLAN_ID),
        PAYPAL_PRODUCT_ID: JSON.stringify(process.env.PAYPAL_PRODUCT_ID),
      }
    }),
    // new EnvironmentPlugin(['ROOT', 'PAYPAL_PLAN_ID', 'PAYPAL_PRODUCT_ID','PAYPAL_API_ROOT', 'CONSOLE_CLOUD_GOOGLE_API_KEY']),
    // new EnvironmentPlugin({
    //   ROOT: "bidblock.ca",
    //   paypal_plan_id: "P-8K2448559P9609535MMAPYHA", // Product linked to sb-mzq9r20359069@business.example.com, throught to the BidBlock Development Staging created app, requires a product ID
    //   paypal_product_id: "PROD-6NP19803R0467982A", // Product linked to sb-mzq9r20359069@business.example.com, throught to the BidBlock Development Staging created app
    //   paypal_api_root: "https://api-m.sandbox.paypal.com/v1",
    //   console_cloud_google_api_key: "AIzaSyDllB4lbeiJVZeI2VGW_p21-Hj7FrC1idM",
    // }),
    new ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};

module.exports = config

