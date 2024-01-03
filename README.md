# eslint-plugin-figma-plugins

This repository defines [typescript-eslint](https://typescript-eslint.io/) rules for [Figma plugin development](https://www.figma.com/plugin-docs/).

### Why the weird, repetitive name?

ESLint package names must start with `eslint-plugin-`. Under this convention, the shortest name we could use is probably `@figma/eslint-plugin-plugins`, but that's pretty confusing! So the current name is a compromise between clarity and brevity.

## Usage

### Installation

#### Dependencies

This linter requires TypeScript, ESLint, typescript-eslint, and the Figma Plugin API type definitions. To install all of these, run:

```
npm install -D typescript eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin @figma/plugin-typings
```

#### Install the ESLint plugin package

This package has not yet been published to NPM. You can get it in two ways:

##### Directly via git

Add the following to your Figma plugin's `package.json`:

```
{
  ...
  "devDependencies": {
    "@figma/eslint-plugin-figma-plugins": "git://github.com/figma/eslint-plugin-figma-plugins",
    ...
  }
}
```

##### From local disk

Clone this repo. Then add the following to your Figma plugin's `package.json`:

```
{
  ...
  "devDependencies": {
    "@figma/eslint-plugin-figma-plugins": "file:/Users/!!YOUR_USERNAME_HERE!!/figma/eslint-plugin-figma-plugins",
    ...
  }
}
```

#### Update node_modules

Once you've updated your `package.json`, run `npm install` to pull down the latest changes.

#### Configure eslint

If you haven't already, install ESLint. We recommend installing it alongside typescript-eslint using [these instructions](https://typescript-eslint.io/getting-started#step-1-installation).

Update your ESLint config's `extends` array to include the `plugin:@figma/figma-plugins/dynamic-page-recommended` ruleset. We also recommend the following rulesets:

- `eslint:recommended`,
- `plugin:@typescript-eslint/recommended-type-checked`
- `plugin:@typescript-eslint/stylistic-type-checked`

To work with TypeScript code, ESLint also requires the following parser settings:

```
{
  ...
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  ...
}
```

Here's a full example of `.eslintrc.js`:

```
/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:@figma/figma-plugins/dynamic-page-recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  root: true
}
```

#### Restart the ESLint server

If you've run `npm install` and updated to a newer version of this package, remember to restart your IDE. In VSCode, you can restart the ESLint server independently by opening the command palette and choosing "Restart ESLint Server".

### Linting and autofixing

You can lint your project using these rules by running

```
eslint ./path/to/source
```

Some rules provide autofixes, which you can run using `--fix`.

```
eslint --fix ./path/to/source
```

Autofixes are also available via some IDEs.

### VSCode

To use ESLint with VSCode, see the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). This extension will show rule violations inline, as well as provide opportunities to run autofixes directly in the IDE.

## Developing

### Building the package

To compile the rules into a consumable ESLint plugin, run:

```
npm run watch
```

Any consuming repo will need to re-install the package using the process described [above](#install-the-package).

### Tests

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

### Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md)

## Rule documentation

Documentation for individual rules is still WIP.
