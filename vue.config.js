const path = require('path')
module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.entry('app').clear()
    config.entry('app').add(path.resolve(__dirname, 'example/main.js'))

    config.resolve.alias
      .set('#lib', path.resolve(__dirname, './lib'))
      .set('#app', path.resolve(__dirname, './example'))
  },
}
