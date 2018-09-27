const path = require('path')
const { version } = require('./package.json')

process.env.VUE_APP_VERSION = version

module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.entry('app').clear()
    config.entry('app').add(path.resolve(__dirname, 'example/main.js'))

    config.resolve.alias
      .set('#lib', path.resolve(__dirname, './lib'))
      .set('#app', path.resolve(__dirname, './example'))

    if (process.env.V_APP_ANALYZE) {
      const Analyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
      config.plugin('bundleAnalyzer').use(Analyzer, [
        {
          analyzerMode: 'static',
        },
      ])
    }
  },
}
