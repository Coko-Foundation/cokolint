const commitizenConfig = require('./src/commitizen')

module.exports = {
  ...commitizenConfig,
  scopes: ['eslint', 'prettier', 'stylelint', 'commitlint', 'lintstaged', '*'],
}
