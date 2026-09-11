export default {
  extends: ['stylelint-config-standard'],
  overrides: [
    {
      files: ['**/*.{js,jsx,mjs,mts,ts,tsx}'],
      customSyntax: 'postcss-styled-syntax',
    },
  ],
  rules: {
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,
    'declaration-block-no-duplicate-properties': true,
    'declaration-no-important': true,
    'no-descending-specificity': null,
    'no-empty-source': null,
  },
}
