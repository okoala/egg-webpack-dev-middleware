'use strict';

/**
 * 默认配置
 */
exports.webpackDevMiddleware = {
  // config: 'path/to/webpack/config/file',
  // publicPath: 'webpack/dev/server/public/path'
  noInfo: false,
  quiet: false,
  lazy: false,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true
  },
  headers: { 'X-Custom-Header': 'yes' },
  stats: {
    colors: true,
    chunks: false
  }
}
