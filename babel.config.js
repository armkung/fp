module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  ignore: ['node_modules'].concat(process.env.NODE_ENV === 'test' ? [] : ['**/*.test.js']),
  sourceMap: 'inline',
  retainLines: true,
}
