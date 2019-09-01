const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  // BUILD settings gonna be here
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',

  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
    // historyApiFallback: true,
    // noInfo: true,
    overlay: {
      warnings: true,
      errors: true
    },
    port: 8081,
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map"
    }),
  ]
});

// export buildWebpackConfig
module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig)
})