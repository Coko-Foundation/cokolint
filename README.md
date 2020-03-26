This package will provide the following linting features:

# Eslint

# Stylelint

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

In your root directory, create a `commitlint.config.js` file, with the following content:

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
}
```

Also in your root directory, create a `.cz-config.js` file, and add the following content:

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

Finally, edit your `.eslintignore` file to make sure the last file you added gets linted as well.

```
!.cz-config.js
```
