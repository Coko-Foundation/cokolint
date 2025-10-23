/* eslint-disable-next-line import/no-unresolved */
const { defineConfig, globalIgnores } = require('eslint/config')

const babelParser = require('@babel/eslint-parser')
const globals = require('globals')
const jest = require('eslint-plugin-jest')
const js = require('@eslint/js')

const { FlatCompat } = require('@eslint/eslintrc')

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

module.exports = defineConfig([
  {
    languageOptions: {
      parser: babelParser,

      parserOptions: {
        requireConfigFile: false,

        babelOptions: {
          presets: ['@babel/preset-react'],
        },
      },

      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.node,
      },
    },

    extends: compat.extends(
      'airbnb',
      'standard',
      'standard-react',
      'plugin:jest/recommended',
      'plugin:cypress/recommended',
      'prettier',
      'plugin:import/typescript',
    ),

    plugins: {
      jest,
    },

    rules: {
      'arrow-body-style': 0,

      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: [
            '.storybook/*',
            '**/stories/**/*.js',
            'cypress/**',
            '**/*.spec.js',
            '**/*.test.js',
            'webpack/**',
            '.commitlintrc.js',
            '.cz-config.js',
            '.eslintrc.js',
            '.jest.config.js',
            '.lintstagedrc.js',
            '.prettierrc.js',
            '.stylelintrc.js',
            'dev/**',
          ],
        },
      ],

      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['to', 'hrefLeft', 'hrefRight'],
          aspects: ['noHref', 'invalidHref', 'preferButton'],
        },
      ],

      'no-console': [
        'error',
        {
          allow: ['warn', 'error'],
        },
      ],

      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'block',
        },
        {
          blankLine: 'always',
          prev: 'block',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'block-like',
        },
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'multiline-const',
        },
        {
          blankLine: 'always',
          prev: 'multiline-const',
          next: '*',
        },
      ],

      'react/function-component-definition': [
        2,
        {
          namedComponents: 'arrow-function',
        },
      ],

      'react/jsx-filename-extension': [
        2,
        {
          extensions: ['.js'],
        },
      ],

      'react/jsx-props-no-spreading': 0,

      'react/jsx-sort-props': [
        1,
        {
          ignoreCase: true,
        },
      ],

      'react/prop-types': [
        2,
        {
          ignore: ['children', 'className', 'onClick', 'theme'],
        },
      ],
    },

    settings: {
      'import/resolver': {
        node: true,
        typescript: {
          alwaysTryTypes: true,
          project: 'node_modules/@coko/server/src/cli/tsconfig.json',
        },
      },
      jest: {
        version: 30,
      },
    },
  },
  {
    files: ['**/*.jsx'],
  },
  globalIgnores([
    '**/_build',
    '**/dist',
    '!**/.storybook',
    '!**/.commitlintrc.js',
    '!**/.cz-config.js',
    '!**/.jest.config.js',
    '!**/.lintstagedrc.js',
    '!**/.prettierrc.js',
    '!**/.stylelintrc.js',
    '**/node_modules',
  ]),
])
