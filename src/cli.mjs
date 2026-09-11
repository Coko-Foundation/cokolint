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

const runESLint = (isSubprocess, targetPath) => {
  const target = targetPath ?? process.cwd()
  const command = `npx eslint ${target}`
  runCommand(ESLINT, command, isSubprocess)
}

const runStylelint = (isSubprocess, targetPath) => {
  const target = targetPath
    ? `"${targetPath}/**/*.{js,jsx,ts,tsx,css}"`
    : `"${process.cwd()}/**/*.{js,jsx,ts,tsx,css}"`
  const command = `npx stylelint ${target}`
  runCommand(STYLELINT, command, isSubprocess)
}

const runPrettier = (isSubprocess, targetPath) => {
  const target = targetPath ?? process.cwd()
  const command = `npx prettier --check ${target}`
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
      '*.{js,mjs,ts,mts,jsx,tsx}': jsArray,
      '*.{js,ts,mjs,mts,jsx,tsx,graphql,json,yml,md,html}': [
        'prettier --check',
      ],
    },
  })

  logger.newLine()
  if (!success) throw new Error('Lint staged failed!')
  logger.info('Lint staged successfully completed')
}

const commit = async options => {
  execSync('git status', { stdio: 'inherit' })

  await lintStaged(options)
  logger.newLine()

  // filter out
  // - the 'commit' command
  // - the --skip-stylelint flag
  // if we don't do this, cz will pass them onto git (which will throw)
  process.argv = process.argv.slice(0, 2)

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
  .command('eslint [path]')
  .description('Run eslint command')
  .action(targetPath => {
    printVersion()
    runESLint(false, targetPath)
  })

program
  .command('stylelint [path]')
  .description('Run stylelint command')
  .action(targetPath => {
    printVersion()
    runStylelint(false, targetPath)
  })

program
  .command('prettier [path]')
  .description('Run prettier command')
  .action(targetPath => {
    printVersion()
    runPrettier(false, targetPath)
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
