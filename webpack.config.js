const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'OAUTH_CLIENT_ID': '"711651127971-t90e5r7504tvdgf2mh17bp7a9a46dnff.apps.googleusercontent.com"',
        'OAUTH_CLIENT_SECRET': '"WzLT55w81lYs4v9hvVZWCru8"'
      }
    })
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, './client'),
    proxy: {
      '/': 'http://localhost:3000',
    },
    publicPath: 'http://localhost:8080/build/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: [path.resolve(__dirname, 'client')],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /(css|scss)$/,
        include: [path.resolve(__dirname, 'client/assets/styles')],
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|svg|ico)$/,
      //   use: [
      //     {
      //       // loads files as base64 encoded data url if image file is less than set limit
      //       loader: "url-loader",
      //       options: {
      //         // if file is greater than the limit (bytes), file-loader is used as fallback
      //         limit: 90000
      //       },
      //     },
      //   ],
      // },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
