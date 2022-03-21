module.exports = {
  parser: '@babel/eslint-parser',
  parserOptions: {
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  extends: [
    'airbnb',
    'standard',
    'standard-react',
    'plugin:jest/recommended',
    'plugin:cypress/recommended',
    'prettier',
  ],
  plugins: ['jest'],
  ignorePatterns: [
    '_build',
    'dist',
    '!.storybook',
    '!.commitlintrc.js',
    '!.cz-config.js',
    '!.eslintrc.js',
    '!.jest.config.js',
    '!.lintstagedrc.js',
    '!.prettierrc.js',
    '!.stylelintrc.js',
    '**/node_modules',
  ],
  rules: {
    'arrow-body-style': 0,
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

          // webpack
          'webpack/**',

          // configs
          '.commitlintrc.js',
          '.cz-config.js',
          '.eslintrc.js',
          '.jest.config.js',
          '.lintstagedrc.js',
          '.prettierrc.js',
          '.stylelintrc.js',

          // other
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
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: '*', next: 'block' },
      { blankLine: 'always', prev: 'block', next: '*' },
      { blankLine: 'always', prev: '*', next: 'block-like' },
      { blankLine: 'always', prev: 'block-like', next: '*' },
      { blankLine: 'always', prev: '*', next: 'multiline-const' },
      { blankLine: 'always', prev: 'multiline-const', next: '*' },
    ],
    // 'prettier/prettier': 'error',
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'react/jsx-filename-extension': [2, { extensions: ['.js'] }], // disallows .jsx files
    'react/jsx-props-no-spreading': 0,
    'react/jsx-sort-props': [1, { ignoreCase: true }],
    'react/prop-types': [
      2,
      { ignore: ['children', 'className', 'onClick', 'theme'] },
    ],
    // 'sort-keys': [1, 'asc', { caseSensitive: false }],
  },
}
