module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-styled-components',
  ],
  ignoreFiles: ['_build'],
  plugins: ['stylelint-order'],
  processors: ['stylelint-processor-styled-components'],
  rules: {
    'declaration-no-important': true,
    // 'order/order': ['declarations', 'rules', 'at-rules'],
    'order/order': null,
    'order/properties-alphabetical-order': true,
    'rule-empty-line-before': [
      'always',
      { ignore: ['first-nested', 'after-comment'] },
    ],
  },
}
