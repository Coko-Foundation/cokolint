/* eslint-disable no-console */

import chalk from 'chalk'

const pre = chalk.cyan.underline('[coko lint]')
const primary = chalk.cyan
const error = chalk.red

const logger = {
  error: str => {
    console.log(error(`${pre} ${str}`))
  },
  info: str => {
    console.log(primary(`${pre} ${str}`))
  },
  newLine: () => {
    console.log('')
  },
}

export default logger
