# eslint-plugin-figma-plugins

This repository defines [typescript-eslint](https://typescript-eslint.io/) rules for [Figma plugin development](https://www.figma.com/plugin-docs/).

### Why the weird, repetitive name?

It turns out that eslint has an enforced convention for plugin package names. You have to prefix the leaf package with `eslint-plugin-`. The shortest name we could use is probably `@figma/eslint-plugin-plugins`, but that's pretty confusing and looks like a typo. So the current name is the least-bad option.

# Usage

## Install the package

This package has not yet been published to NPM. Instead, you should clone this repo, and then add the following to your plugin's `package.json`:

```
{
  ...
  "devDependencies": {
    "@figma/eslint-plugin-figma-plugins": "file:/Users/!!YOUR_USERNAME_HERE!!/figma/eslint-plugin-figma-plugins",
    ...
  }
}
```

Then run `npm install`.

## Configure eslint

If you haven't already, install eslint. I recommend installing it alongside typescript-eslint using [these instructions](https://typescript-eslint.io/getting-started#step-1-installation).

Next, ensure that the `extends` array in your eslint config contains `plugin:@figma/figma-plugins/recommended`. Here's an example `.eslintrc.js`:

```
/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:@figma/figma-plugins/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  root: true,
  rules: {
    // allow underscore-prefixing of unused variables
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
```

The rules from this package should now be active any time you run eslint, including via the [eslint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
