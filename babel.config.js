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
  ignore: ['node_modules', '**/*.test.js'],
  sourceMap: 'inline',
  retainLines: true,
}
