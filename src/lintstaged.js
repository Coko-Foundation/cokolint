module.exports = {
  linters: {
    '*.js': ['eslint --fix', 'stylelint'],
    '*.{js,graphql,json,yml,md,html}': ['prettier --write'],
  },
  ignore: ['**/CHANGELOG.md'],
}
