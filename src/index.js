const commitizenConfig = require('./commitizen')
const eslintConfig = require('./eslint')
const prettierConfig = require('./prettier')
const stylelintConfig = require('./stylelint')

module.exports = {
  commitizen: commitizenConfig,
  eslint: eslintConfig,
  prettier: prettierConfig,
  stylelint: stylelintConfig,
}
