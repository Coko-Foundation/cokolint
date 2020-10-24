const commitizenConfig = require('./src/commitizen')

commitizenConfig.scopes = [
  'eslint',
  'prettier',
  'stylelint',
  'commitlint',
  'lintstaged',
  '*',
]

module.exports = commitizenConfig
