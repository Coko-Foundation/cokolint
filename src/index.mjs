/* eslint-disable-next-line import/extensions */
import commitizen from './commitizen.js'

import {
  defineEslintConfig,
  serverEslintConfig,
  clientEslintConfig,
  rootEslintConfig,
} from './eslint.mjs'

import prettier from './prettier.mjs'
import stylelint from './stylelint.mjs'
import lintstaged from './lintstaged.mjs'

export {
  defineEslintConfig,
  serverEslintConfig,
  clientEslintConfig,
  rootEslintConfig,
  stylelint,
  prettier,
  commitizen,
  lintstaged,
}
