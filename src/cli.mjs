#!/usr/bin/env node

/* eslint-disable n/no-process-exit */

import { execSync } from 'node:child_process'
import path from 'node:path'
import { createRequire } from 'node:module'

import { program } from 'commander'
import lintStagedLib from 'lint-staged'

import pkg from '../package.json' with { type: 'json' }
import logger from './logger.mjs'

const require = createRequire(import.meta.url)
const cz = require('commitizen/dist/cli/git-cz')
const czPath = require.resolve('commitizen')

const ESLINT = 'ESLint'
const STYLELINT = 'Stylelint'
const PRETTIER = 'Prettier'
const filler = '>>>> '

// #region actions
const printVersion = () => {
  logger.info(`Coko lint version: ${program.version()}\n`)
}

const runCommand = (name, command, isSubprocess) => {
  logger.info(`\n${filler}Running ${name}...`)

  try {
    execSync(command, { stdio: 'inherit' })
  } catch (error) {
    logger.error(`Error running ${name}: ${error.message}`)

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
      logger.info(`\n${filler}Skipping ${name}...`)
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
    logger.error('\nError: Linting checks did not pass!')
    process.exit(1)
  }

  logger.info(`\nLinting checks successfully passed`)
}

const lintStaged = async options => {
  const jsArray = ['eslint']
  if (!options.skipStylelint) jsArray.push('stylelint')

  const success = await lintStagedLib({
    cwd: process.cwd(),
    config: {
      '*.{js,mjs}': jsArray,
      '*.{js,graphql,json,yml,md,html}': ['prettier --check'],
    },
  })

  logger.newLine()
  if (!success) throw new Error('Lint staged failed!')
  logger.info('Lint staged successfully completed')
}

const commit = async options => {
  execSync('git add -A', { stdio: 'inherit' })
  execSync('git status', { stdio: 'inherit' })

  await lintStaged(options)
  logger.newLine()

  cz.bootstrap({
    cliPath: path.join(czPath, '..', '..'),
  })
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

program
  .command('lint-staged')
  .description('Lint staged files')
  .option('--skip-stylelint', 'Skip stylelint')
  .action(async options => {
    try {
      printVersion()
      await lintStaged(options)
    } catch (e) {
      throw new Error(e)
    }
  })

program
  .command('commit')
  .description('Launch interactive commit builder')
  .option('--skip-stylelint', 'Skip stylelint')
  .action(async options => {
    try {
      printVersion()
      await commit(options)
    } catch (e) {
      throw new Error(e)
    }
  })

program.parse(process.argv)
