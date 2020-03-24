module.exports = {
  env: {
    'jest/globals': true,
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
  rules: {
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['to', 'hrefLeft', 'hrefRight'],
        aspects: ['noHref', 'invalidHref', 'preferButton'],
      },
    ],
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    // 'react/sort-comp': [
    //   1,
    //   {
    //     order: [
    //       'constructor',
    //       'lifecycle',
    //       'everything-else',
    //       '/^on.+$/',
    //       'rendering',
    //     ],
    //     groups: {
    //       rendering: ['/^render.+$/', 'render'],
    //     },
    //   },
    // ],
    'react/jsx-sort-props': [1, { ignoreCase: true }],
    // 'sort-keys': [1, 'asc', { caseSensitive: false }],
  },
}
