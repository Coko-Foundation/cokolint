import { defineConfig, globalIgnores } from 'eslint/config'
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import importPlugin from 'eslint-plugin-import'
import workspaces from 'eslint-plugin-workspaces'
import pluginPromise from 'eslint-plugin-promise'
import nodePlugin from 'eslint-plugin-n'
import pluginCypress from 'eslint-plugin-cypress'
import vitest from '@vitest/eslint-plugin'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import confusingBrowserGlobals from 'confusing-browser-globals'

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
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
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
        '**/stories/**/*',

        // tests
        'cypress/**',
        '**/*.spec.js',
        '**/*.spec.ts',
        '**/*.test.js',
        '**/*.test.ts',
        '**/__tests__/**/*',
        '**/vitest.config.*',

        // configs
        '.cz-config.js',
        '.cz-config.ts',
        '.cz-config.mjs',
        '.cz-config.cjs',
        '.lintstagedrc.js',
        '.lintstagedrc.ts',
        '.lintstagedrc.mjs',
        '.prettierrc.js',
        '.prettierrc.ts',
        '.prettierrc.mjs',
        '.stylelintrc.js',
        '.stylelintrc.ts',
        '.stylelintrc.mjs',
        'eslint.config.js',
        'eslint.config.ts',
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

const workspacesConfig = {
  plugins: { workspaces },
  rules: {
    'workspaces/no-relative-imports': 'error',
    'workspaces/require-dependency': 'warn',
  },
}

const typescriptConfig = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: tseslint.parser,
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
  },
  rules: {
    ...tseslint.configs.recommended.rules,
    '@typescript-eslint/explicit-function-return-type': 'error',

    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',

    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
  },
}

const viteConfig = {
  files: ['**/__tests__/**/*.test.ts'],
  plugins: {
    vitest,
  },
  // settings: {
  //   vitest: {
  //     typecheck: true,
  //   },
  // },
  rules: {
    ...vitest.configs.recommended.rules,
    'vitest/no-focused-tests': ['error', { fixable: false }],
  },
}

const globalIgnoreList = [
  '**/_build',
  '**/dist',
  '**/docs',
  '!**/.storybook',
  '!**/.cz-config.js',
  '!**/.cz-config.cjs',
  '!**/.lintstagedrc.js',
  '!**/.prettierrc.js',
  '!**/.stylelintrc.js',
  '**/node_modules',
]

const serverFiles = {
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
    // 'n/no-process-exit': 'off',
    'import/no-unresolved': ['error', { commonjs: true }],
  },
}

const serverCommonjs = {
  files: ['**/*.js'],
  languageOptions: {
    sourceType: 'commonjs',
  },
  rules: {
    ...nodePlugin.configs['flat/recommended-script'].rules,
  },
}

const serverMjs = {
  files: ['**/*.mjs'],
  rules: {
    ...nodePlugin.configs['flat/recommended-module'].rules,
  },
}

const clientFiles = {
  files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  languageOptions: {
    globals: {
      ...globals.browser,
      process: 'readonly',
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
    react: {
      version: 'detect',
    },
  },
  rules: {
    ...commonRules,
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'import/no-unresolved': 'error',
    'react/jsx-sort-props': [1, { ignoreCase: true }],
    'no-restricted-globals': ['error'].concat(confusingBrowserGlobals),
  },
}

const clientCommonjs = {
  files: ['**/*.cjs'],
  languageOptions: { sourceType: 'commonjs' },
}

const server = [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  workspacesConfig,

  serverFiles,
  serverCommonjs,
  serverMjs,

  typescriptConfig,
  viteConfig,
  globalIgnores(globalIgnoreList),
]

const client = [
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  workspacesConfig,

  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,

  clientFiles,
  clientCommonjs,

  typescriptConfig,
  viteConfig,
  globalIgnores(globalIgnoreList),
]

const root = [
  /**
   * COMMON 1
   */
  js.configs.recommended,
  importPlugin.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  workspacesConfig,

  /**
   * SERVER
   */
  {
    ...serverFiles,
    ignores: ['packages/client/**', 'cypress'],
  },

  {
    ...serverCommonjs,
    ignores: ['packages/client/**', 'cypress'],
  },

  {
    ...serverMjs,
    ignores: ['packages/client/**', 'cypress'],
  },

  /**
   * CYPRESS
   */

  {
    files: ['cypress/**/*.{js,mjs,ts}'],
    extends: [pluginCypress.configs.recommended],
    languageOptions: {
      sourceType: 'module',
    },
  },

  /**
   * CLIENT
   */

  {
    ...react.configs.flat.recommended,
    files: ['packages/client/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  },

  {
    ...react.configs.flat['jsx-runtime'],
    files: ['packages/client/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  },

  {
    ...reactHooks.configs.flat.recommended,
    files: ['packages/client/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  },

  {
    ...jsxA11y.flatConfigs.recommended,
    files: ['packages/client/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  },

  {
    ...clientFiles,
    files: ['packages/client/**/*.{js,jsx,mjs,cjs,ts,tsx}'],
  },

  {
    ...clientCommonjs,
    files: ['packages/client/**/*.cjs'],
  },

  /**
   * COMMON 2
   */

  typescriptConfig,
  viteConfig,
  globalIgnores(globalIgnoreList),
]

export {
  defineConfig as defineEslintConfig,
  server as serverEslintConfig,
  client as clientEslintConfig,
  root as rootEslintConfig,
}
