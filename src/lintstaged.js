module.exports = {
  '*.js': ['eslint', 'stylelint'],
  '*.{js,graphql,json,yml,md,html}': ['prettier --check'],
}
