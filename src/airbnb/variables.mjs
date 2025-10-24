// const confusingBrowserGlobals = require('confusing-browser-globals')

export default {
  rules: {
    // disallow specific globals
    'no-restricted-globals': [
      'error',
      {
        name: 'isFinite',
        message:
          'Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite',
      },
      {
        name: 'isNaN',
        message:
          'Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan',
      },
    ]
      .concat
      // confusingBrowserGlobals.map(g => ({
      //   name: g,
      //   message: `Use window.${g} instead. https://github.com/facebook/create-react-app/blob/HEAD/packages/confusing-browser-globals/README.md`,
      // })),
      (),
  },
}
