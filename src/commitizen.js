const conventionalCommitTypes = require('conventional-commit-types')

const { types } = conventionalCommitTypes
const maxLength = Math.max(Object.keys(types).map(key => key.length)) + 1

const choices = Object.keys(types).map(key => {
  const type = types[key]
  const name = `${`${key}:`.padEnd(maxLength)} ${type.description}`

  return {
    name,
    value: key,
  }
})

// Check https://github.com/leonardoanalista/cz-customizable#options for more options
module.exports = {
  scopes: ['*'],
  skipQuestions: ['body', 'breaking', 'footer'],
  types: choices,
}
