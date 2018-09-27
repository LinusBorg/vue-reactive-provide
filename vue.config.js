const path = require('path')
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.alias.set('#lib', path.resolve(__dirname, '/lib'))
    config.alias.set('#app', path.resolve(__dirname, '/example'))
  },
}
