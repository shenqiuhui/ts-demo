const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const devConfig = require('./webpack.dev.conf')
const prodConfig = require('./webpack.prod.conf')

module.exports = (env, argv) => {
  const config = argv.mode === 'development' ? devConfig : prodConfig
  return merge(baseConfig, config)
}
