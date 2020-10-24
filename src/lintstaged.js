module.exports = {
  '*.js': ['eslint --fix', 'stylelint'],
  '*.{js,graphql,json,yml,md,html}': ['prettier --write'],
}
