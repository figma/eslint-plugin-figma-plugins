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

## Restart eslint server

If you've run `npm install` and updated to a newer version of this package, remember to restart your IDE or the IDE's eslint server.

## Autofixing

Some rules provide autofixes. You can run these from the command line:

```
eslint --fix ./path/to/source
```

Alternately, you can use your IDE's eslint extension to trigger the fixes on a per-line or whole-file basis.

# Developing

## Building the package

To compile the rules into a consumable eslint plugin, run:

```
npm run watch
```

Any consuming repo will need to re-install the package using the process described [above](#install-the-package).

## Tests

Tests are implemented in the [test/](./test) directory using [@typescript-eslint/RuleTester](https://typescript-eslint.io/packages/rule-tester/). The test harness is [ts-jest]().

To run tests, run:

```
npm run tests
```

To run an invidual test, you can run Jest with the `-t` parameter, followed by the string handle for the test. The handle is declared in each test file. Example:

```
npx jest -t 'await-requires-async'
```

Note: there is a bug where type-aware parsing in the tests currently exhibits different behavior than when the rules are actually run as a plugin. Here are some known issues with TypeScript parsing in the tests:

- The `symbol` property is sometimes not defined on `ts.Type`. This could be related to a [TypeScript bug](https://github.com/microsoft/TypeScript/issues/13165), but it's unclear why it only occurs in tests. As a result, our rules use a custom `getTypeName()` utility function that returns symbol names using fallback sources of data.
- Ternary expressions parse into `any` types if the result expressions contain types that are not explicitly defined. For example, if `a` and `b` are function parameters with the `PluginAPI` type, the ternary `(true ? a : b)` will carry an `any` type unless the code also includes an explicit definition of the `PluginAPI` type.

# TODO

- automated eslint rule doc generation
