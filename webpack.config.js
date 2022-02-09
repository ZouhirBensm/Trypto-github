const path = require('path')

// module.exports = {
//   entry: './public/App.js',

//   output: {
//     filename: 'App.js',
//     path: path.resolve(__dirname, 'dist'),
//   },
//   watch: true,
//   mode: 'development',
  
// }

var config = {
  // watch: true,
  mode: 'none',
  resolve: {
    extensions: ['.js', '.jsx']
  },
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
};

var fooConfig = Object.assign({}, config, {
  //name: "a",
  entry: './src/App.jsx',
  output: {
    filename: 'App.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
});
var barConfig = Object.assign({}, config,{
  entry: './src/Databases.jsx',
  output: {
    filename: 'Databases.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
});
var booConfig = Object.assign({}, config,{
  entry: './src/Matches.jsx',
  output: {
    filename: 'Matches.js',
    path: path.resolve(__dirname, 'public/dist'),
  },
});
var Config1 = Object.assign({}, config,{
  entry: './src/AppDep/BuyOrders.jsx',
  output: {
    filename: 'BuyOrders.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});
var Config2 = Object.assign({}, config,{
  entry: './src/AppDep/Edit.jsx',
  output: {
    filename: 'Edit.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});
var Config3 = Object.assign({}, config,{
  entry: './src/AppDep/MakeBuy.jsx',
  output: {
    filename: 'MakeBuy.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});
var Config4 = Object.assign({}, config,{
  entry: './src/AppDep/MakeSell.jsx',
  output: {
    filename: 'MakeSell.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});
var Config5 = Object.assign({}, config,{
  entry: './src/AppDep/MyOrders.jsx',
  output: {
    filename: 'MyOrders.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});
var Config6 = Object.assign({}, config,{
  entry: './src/AppDep/Order.jsx',
  output: {
    filename: 'Order.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});
var Config7 = Object.assign({}, config,{
  entry: './src/AppDep/Prices.jsx',
  output: {
    filename: 'Prices.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});
var Config8 = Object.assign({}, config,{
  entry: './src/AppDep/PricesComponent.jsx',
  output: {
    filename: 'PricesComponent.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});
var Config9 = Object.assign({}, config,{
  entry: './src/AppDep/SellOrders.jsx',
  output: {
    filename: 'SellOrders.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});
var Config10 = Object.assign({}, config,{
  entry: './src/AppDep/Navigation.jsx',
  output: {
    filename: 'Navigation.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});
var Config11 = Object.assign({}, config,{
  entry: './src/AppDep/MatcheRow.jsx',
  output: {
    filename: 'MatcheRow.js',
    path: path.resolve(__dirname, 'public/dist/AppDep'),
  },
});


// Return Array of Configurations
module.exports = [
  fooConfig, barConfig, booConfig, Config1, Config2, Config3, Config4, Config5, Config6, Config7, Config8, Config9, Config10, Config11
];