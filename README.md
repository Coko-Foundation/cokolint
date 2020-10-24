This package provides everything that is needed to lint applications built by the Coko team.

Features / libraries provided, along with their configuration:

- **Eslint**
- **Stylelint**
- **Prettier**
- **Husky** (to provide pre-commit hooks)
- **Lint-staged** (combined with husky, will run linters on staged code before it is commited)
- **Commitlint** (to lint the commit message itself)
- **Commitizen** (to provide the cli helper for the conventional commit standard)

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

# Stylelint

Add a `.stylelintrc.js` file:

```js
const { stylelint } = require('@coko/lint')

/**
 * You can edit the config here:
 *
 * eg.
 * stylelint.rules['your-rule'] = true
 *
 */

module.exports = stylelint
```

# Commitlint, Lint staged & Commitizen

`commitlint` lints your commits to make sure it follows the conventional commits specification. `lint-staged` will run the linters on changes staged in git. These two will be executed every time a commit is made, with the help of `husky`'s `pre-commit` hook.

The following also adds `commitizen`, an interactive cli tool to build valid commits (run it with `yarn cz`).

Create a `.commitlintrc.js` file:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

Add a `.lintstagedrc.js` file:

```js
const { lintstaged } = require('@coko/lint')

/**
 * You can edit the config here:
 *
 * eg.
 * lintstaged.linters['*.js'] = ['my-custom-linter']
 *
 */

module.exports = lintstaged
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

Finally, add the following lines to your `package.json`:

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
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS && lint-staged"
  }
}
```
