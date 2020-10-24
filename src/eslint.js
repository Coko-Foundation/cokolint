module.exports = {
  parser: 'babel-eslint',
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
    'prettier',
    'prettier/react',
    'prettier/standard',
  ],
  plugins: ['jest', 'prettier'],
  ignorePatterns: [
    '_build',
    '!.storybook',
    '!.cz-config.js',
    '!.eslintrc.js',
    '!.prettierrc.js',
    '!.stylelintrc.js',
  ],
  rules: {
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
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [2, { extensions: ['.js'] }], // disallows .jsx files
    'react/jsx-sort-props': [1, { ignoreCase: true }],
    // 'sort-keys': [1, 'asc', { caseSensitive: false }],
  },
}
