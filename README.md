This package provides everything that is needed to lint applications built by the Coko team.

To install:

```
yarn add --dev @coko/lint
```

You shouldn't need to install any other dependency.  
Just follow the instructions below.

All files below should be added to the root folder of your project, unless otherwise specified, or if you have a specific reason not to.

# Eslint

Add an `.eslintrc.js` in your root folder:

```js
const { eslint } = require('@coko/lint')

/**
 * You can edit the eslint config file here.
 *
 * eg.
 * eslint.rules['no-console'] = ['warn', { allow: ['error', 'warn'] }],
 *
 */

module.exports = eslint
```

Add an `.eslintignore` file:

```js
!.eslintrc.js
```

# Prettier

Add a `.prettierrc.js` file:

```js
const { prettier } = require('@coko/lint')

/**
 * You can edit the config here:
 *
 * eg.
 * prettier.semi = true
 *
 */

module.exports = prettier
```

Add the following line to your `.eslintignore` file:

```
!.prettierrc.js
```

# Stylelint

coming soon

# Commitlint & Commitizen

This lints your commits to make sure it follows the conventional commits specification.  
It also adds an interactive cli tool to build valid commits (run it with `yarn cz`).

You don't need to install anything else.

Add the following lines to your `package.json`:

```json
"scripts": {
  "cz": "git-cz"
},
"config": {
  "commitizen": {
    "path": "cz-customizable"
  }
},
"husky": {
  "hooks": {
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

Create a `commitlint.config.js` file:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

Create a `.cz-config.js` file:

```js
const { commitizen } = require('@coko/lint')

/**
 * You can edit the config before you export it to suit your needs.
 *
 * eg.
 * commitizen.scopes = [
 *    'dashboard',
 *    'team manager',
 *    'api',
 *    'models',
 *    '*'
 * ]
 */

module.exports = commitizen
```

Finally, add the following line to your `.eslintignore` file to make sure the last file you added gets linted as well.

```
!.cz-config.js
```
