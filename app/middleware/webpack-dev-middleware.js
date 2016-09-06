'use strict';

const webpack = require('webpack')
const webpackMiddleware = require('../../lib/webpack-middleware')

module.exports = function(options, app) {
  // 获取配置文件路径
  const configPath = options.config

  // 读取配置文件
  const webpackConfig = require(configPath)

  // 构造中间件generator
  return webpackMiddleware(webpack(webpackConfig), {
    noInfo: options.noInfo,
    quiet: options.quiet,
    lazy: options.lazy,
    watchOptions: options.watchOptions,
    publicPath: options.publicPath || webpackConfig.output.publicPath,
    headers: options.headers,
    stats: options.stats
  }, {
    waitUntilValid: function() {
      app.logger.info('[plugin:webpackDevMiddleware] webpack dev server ready')
    }
  })
}
