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

Jest has an issue with printing errors emitted from eslint rules [due to a bug](https://github.com/jestjs/jest/issues/10577). If you are seeing errors like `TypeError: Converting circular structure to JSON`, then run this instead:

```
npm run test-workaround
```

This enables the `--detect-open-handles` Jest option. Tests will run slower, but you'll see the real cause of the errors.

# TODO

- automated eslint rule doc generation
