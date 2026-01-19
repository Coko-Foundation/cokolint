export default {
  extends: [
    'stylelint-config-standard-scss',
    'stylelint-config-styled-components',
  ],
  customSyntax: 'postcss-scss',
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

    'value-keyword-case': null,
    'comment-empty-line-before': null,
    'declaration-colon-newline-after': null,
    'keyframes-name-pattern': null,
    'declaration-empty-line-before': null,
    'selector-class-pattern': null,
  },
}
