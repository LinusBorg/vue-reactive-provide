module.exports = {
  //presets: ['@vue/app'],
  presets: [
    process.env.NODE_ENV !== 'production'
      ? '@vue/app'
      : [
          '@babel/env',
          {
            useBuiltIns: false,
            modules: false,
            targets: '> 1 %, not dead, last 2 versions, no ie <= 11',
          },
        ],
  ],
}
