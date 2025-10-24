// import path from 'path'

import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
// import { FlatCompat } from '@eslint/eslintrc'

import globals from 'globals'
import tseslint from 'typescript-eslint'
// import babelParser from '@babel/eslint-parser'

import nodePlugin from 'eslint-plugin-n'
import importPlugin from 'eslint-plugin-import'
// import jest from 'eslint-plugin-jest'
// import cypressPlugin from 'eslint-plugin-cypress'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

// const compat = new FlatCompat({
//   // baseDirectory: __dirname,
//   resolvePluginsRelativeTo: import.meta.url,
//   // recommendedConfig: js.configs.recommended,
//   // allConfig: js.configs.all,
// })

/**
 * TO DO
 *
 * explicit rules from old config
 * jest
 * cypress
 *
 * => client
 * no console
 * jsx a11y
 * airbnb react
 * react recommended
 * react hooks
 * confusing-browser-globals
 *
 * => drop dependencies
 * airbnb
 * @eslint/eslintrc (if not using flat compat)
 * babel eslint parser
 *
 */

const commonRules = {
  'array-callback-return': 'error',
  'block-scoped-var': 'error',
  camelcase: ['error', { properties: 'never' }],
  'class-methods-use-this': 'error',
  'consistent-return': 'error',
  'default-case-last': 'error',
  'default-param-last': 'error',
  'dot-notation': 'error',
  eqeqeq: ['error', 'always', { null: 'ignore' }],
  'new-cap': 'error',
  'no-alert': 'error',
  'no-await-in-loop': 'error',
  'no-bitwise': 'error',
  'no-caller': 'error',
  'no-constructor-return': 'error',
  'no-else-return': ['error', { allowElseIf: false }],
  'no-eval': 'error',
  'no-extend-native': 'error',
  'no-extra-bind': 'error',
  'no-extra-label': 'error',
  'no-implied-eval': 'error',
  'no-labels': 'error',
  'no-lone-blocks': 'error',
  'no-loop-func': 'error',
  'no-multi-assign': 'error',
  'no-multi-str': 'error',
  'no-nested-ternary': 'error',
  'no-new': 'error',
  'no-new-func': 'error',
  'no-new-wrappers': 'error',
  'no-plusplus': 'error',
  'no-promise-executor-return': 'error',
  'no-proto': 'error',
  'no-return-assign': ['error', 'always'],
  'no-script-url': 'error',
  'no-self-compare': 'error',
  'no-sequences': 'error',
  'no-shadow': 'error',
  'no-template-curly-in-string': 'warn',
  'no-throw-literal': 'error',
  'no-undef-init': 'warn',
  'no-undefined': 'error',
  'no-unneeded-ternary': ['error', { defaultAssignment: false }],
  'no-unused-expressions': 'error',
  'no-useless-computed-key': 'error',
  'no-useless-constructor': 'error',
  'no-useless-return': 'error',
  'no-var': 'error',
  'no-void': 'error',
  'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
  'prefer-promise-reject-errors': ['error', { allowEmptyReject: true }],
  'prefer-template': 'error',
  radix: 'error',
  semi: 'off',
  yoda: 'error',

  // import
  'import/first': 'error',
  'import/extensions': [
    'error',
    'ignorePackages',
    {
      js: 'never',
      ts: 'never',
    },
  ],
  'import/no-absolute-path': 'error',
  'import/no-cycle': ['error', { maxDepth: '∞' }],
  'import/no-extraneous-dependencies': [
    'error',
    {
      devDependencies: [
        // storybook
        '.storybook/*',
        '**/stories/**/*.js',

        // tests
        'cypress/**',
        '**/*.spec.js',
        '**/*.test.js',
        '**/__tests__/**/*',

        // webpack
        'webpack/**',

        // configs
        '.commitlintrc.js',
        '.cz-config.js',
        '.jest.config.js',
        '.lintstagedrc.js',
        '.prettierrc.js',
        '.stylelintrc.js',
        'eslint.config.js',
        'eslint.config.mjs',

        // other
        'dev/**',
      ],
    },
  ],
  'import/no-import-module-exports': 'error',
  'import/no-useless-path-segments': ['error', { commonjs: true }],
  'import/order': ['error', { groups: [['builtin', 'external', 'internal']] }],
}

const server = [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,

  {
    files: ['**/*.{js,mjs,ts}'],
    languageOptions: {
      globals: { ...globals.node },
      ecmaVersion: 'latest',
    },
    plugins: {
      n: nodePlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      n: { tryExtensions: ['.js', '.ts'] },
    },
    rules: {
      ...commonRules,
      'no-console': 'error',
      'import/no-unresolved': ['error', { commonjs: true }],
    },
  },

  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'commonjs',
    },
    rules: {
      ...nodePlugin.configs['flat/recommended-script'].rules,
    },
  },

  {
    files: ['**/*.mjs', '**/*.ts'],
    languageOptions: {
      sourceType: 'module',
    },
    rules: {
      'no-restricted-globals': [
        'error',
        {
          name: '__dirname',
          message:
            'Do not use __dirname; use import.meta.url or process.cwd().',
        },
        {
          name: '__filename',
          message:
            'Do not use __filename in ES modules or TypeScript; use import.meta.url or path.resolve() instead.',
        },
      ],
    },
  },

  {
    files: ['**/*.mjs'],
    rules: {
      ...nodePlugin.configs['flat/recommended-module'].rules,
    },
  },

  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'error',
    },
  },

  globalIgnores([
    '**/_build',
    '**/dist',
    '**/docs',
    '!**/.storybook',
    '!**/.commitlintrc.js',
    '!**/.cz-config.js',
    '!**/.jest.config.js',
    '!**/.lintstagedrc.js',
    '!**/.prettierrc.js',
    '!**/.stylelintrc.js',
    '**/node_modules',
  ]),
]

export { defineConfig as defineEslintConfig, server as serverEslintConfig }
