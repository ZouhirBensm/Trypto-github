const path = require('path');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      buffer: require.resolve('buffer/'),
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
      vm: require.resolve('vm-browserify'),
      stream: require.resolve('stream-browserify')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Process both JS and JSX files
        exclude: /node_modules/, // Ignore node_modules
        use: {
          loader: 'babel-loader', // Use Babel to transpile
          options: {
            configFile: path.resolve(__dirname, '.babelrc') // Ensure .babelrc is loaded
          }
        }
      },
      {
        test: /\.css$/, // Process CSS files
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  entry: {
    App: './src/root-spas/App.jsx'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/dist')
  },
  devtool: 'inline-source-map'
};