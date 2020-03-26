const longest = require('longest')
const rightPad = require('right-pad')
const conventionalCommitTypes = require('conventional-commit-types')

// Borrowed from cz-conventional-changelog
const { types } = conventionalCommitTypes
const length = longest(Object.keys(types)).length + 1

const choices = Object.keys(types).map(key => {
  const type = types[key]
  return {
    name: `${rightPad(`${key}:`, length)} ${type.description}`,
    value: key,
  }
})

// Check https://github.com/leonardoanalista/cz-customizable#options for more options
module.exports = {
  scopes: ['*'],
  skipQuestions: ['body', 'breaking', 'footer'],
  types: choices,
}
