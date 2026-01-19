#!/usr/bin/env node

/* eslint-disable no-console, n/no-process-exit */

import { execSync } from 'child_process'
import { program } from 'commander'

const pkg = require('../package.json')

const ESLINT = 'ESLint'
const STYLELINT = 'Stylelint'
const PRETTIER = 'Prettier'
const filler = '>>>> '

// #region actions
const printVersion = () => {
  console.log(`Coko lint version: ${program.version()}`)
}

const runCommand = (name, command, isSubprocess) => {
  console.log(`\n${filler}Running ${name}...`)

  try {
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    console.error(`Error running ${name}: ${error.message}`)

    if (isSubprocess) {
      throw new Error()
    } else {
      process.exit(1)
    }
  }
}

const runSubprocess = (fn, name, skip) => {
  try {
    if (skip) {
      console.log(`\n${filler}Skipping ${name}...`)
      return
    }

    fn(true)
  } catch {
    throw new Error()
  }
}

const runESLint = isSubprocess => {
  const command = `npx eslint ${process.cwd()}`
  runCommand(ESLINT, command, isSubprocess)
}

const runStylelint = isSubprocess => {
  const command = `npx stylelint "${process.cwd()}/**/*.js"`
  runCommand(STYLELINT, command, isSubprocess)
}

const runPrettier = isSubprocess => {
  const command = `npx prettier --check ${process.cwd()}`
  runCommand(PRETTIER, command, isSubprocess)
}

const runAll = (options = {}) => {
  let hasErrors = false

  const processes = [
    [runESLint, ESLINT, options.skipEslint],
    [runStylelint, STYLELINT, options.skipStylelint],
    [runPrettier, PRETTIER, options.skipPrettier],
  ]

  for (const process of processes) {
    try {
      runSubprocess(...process)
    } catch {
      hasErrors = true
    }
  }

  if (hasErrors) {
    console.error('\nError: Linting checks did not pass!')
    process.exit(1)
  }

  console.log(`\nLinting checks successfully passed`)
}
// #endregion actions

program
  .name('coko-lint')
  .version(pkg.version)
  .description("Coko's cli tool for running linters")

program
  .command('eslint')
  .description('Run eslint command')
  .action(() => {
    printVersion()
    runESLint()
  })

program
  .command('stylelint')
  .description('Run stylelint command')
  .action(() => {
    printVersion()
    runStylelint()
  })

program
  .command('prettier')
  .description('Run prettier command')
  .action(() => {
    printVersion()
    runPrettier()
  })

program
  .command('run')
  .description('Run all commands (eslint, stylelint, prettier)')
  .option('--skip-eslint', 'Skip eslint')
  .option('--skip-stylelint', 'Skip stylelint')
  .option('--skip-prettier', 'Skip prettier')
  .action(options => {
    printVersion()
    runAll(options)
  })

program.parse(process.argv)
