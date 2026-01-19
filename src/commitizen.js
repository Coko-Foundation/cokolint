import conventionalCommitTypes from 'conventional-commit-types' with {type: 'json'}

const { types } = conventionalCommitTypes
const maxLength = Math.max(Object.keys(types).map(key => key.length)) + 1

const choices = Object.keys(types).map(key => {
  const type = types[key]
  const name = `${(`${key  }:`).padEnd(maxLength)} ${type.description}`

  return {
    name,
    value: key,
  }
})

// Check https://github.com/leonardoanalista/cz-customizable#options for more options
export default {
  scopes: ['*'],
  skipQuestions: ['body', 'breaking', 'footer'],
  types: choices,
}
