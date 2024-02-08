# eslint-plugin-figma-plugins

This repository defines [typescript-eslint](https://typescript-eslint.io/) rules for [Figma plugin development](https://www.figma.com/plugin-docs/).

This linter is still in beta, and may include lint warnings about features that aren't generally available. Please avoid using it unless you've been advised to do so. We appreciate your patience!

## Installation

### Dependencies

This linter requires TypeScript, ESLint, typescript-eslint, and the Figma Plugin API type definitions. To install all of these, run:

```
npm install -D typescript eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin @figma/plugin-typings
```

### Install the ESLint plugin package

```
npm install -D @figma/eslint-plugin-figma-plugins
```

### Configure eslint

If you haven't already, install ESLint. We recommend installing it alongside typescript-eslint using [these instructions](https://typescript-eslint.io/getting-started#step-1-installation).

Update your ESLint config's `extends` array to include the `plugin:@figma/figma-plugins/recommended` ruleset. We also recommend the following rulesets:

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
    'plugin:@figma/figma-plugins/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  root: true
}
```

### Restart the ESLint server

If you've run `npm install` and updated to a newer version of this package, remember to restart your IDE. In VSCode, you can restart the ESLint server independently by opening the command palette and choosing "Restart ESLint Server".

## Usage

### Linting and autofixing

You can lint your project using these rules by running

```
npx eslint ./path/to/source
```

Some rules provide autofixes, which you can run using `--fix`.

```
npx eslint --fix ./path/to/source
```

Autofixes are also available via some IDEs.

### VSCode

To use ESLint with VSCode, see the [ESLint VSCode extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint). This extension will show rule violations inline, as well as provide opportunities to run autofixes directly in the IDE.

## Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
⚠️ Configurations set to warn in.\
👍 Set in the `recommended` configuration.\
🔦 Set in the `recommended-problems-only` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                               | Description                                                                  | 💼    | ⚠️ | 🔧 |
| :------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------- | :---- | :- | :- |
| [await-requires-async](docs/rules/await-requires-async.md)                                         | Require functions that contain `await` to be `async`                         | 👍 🔦 |    | 🔧 |
| [dynamic-page-ban-id-params](docs/rules/dynamic-page-ban-id-params.md)                             | Ban string ID parameters that are not compatible with `dynamic-page`         | 👍 🔦 |    | 🔧 |
| [dynamic-page-ban-style-setters-temp](docs/rules/dynamic-page-ban-style-setters-temp.md)           | Ban `async` style-assignment methods from the `dynamic-page` beta            | 👍 🔦 |    | 🔧 |
| [dynamic-page-ban-sync-methods](docs/rules/dynamic-page-ban-sync-methods.md)                       | Ban synchronous methods that are not compatible with `dynamic-page`          | 👍 🔦 |    | 🔧 |
| [dynamic-page-ban-sync-prop-getters](docs/rules/dynamic-page-ban-sync-prop-getters.md)             | Ban synchronous property getters that are not compatible with `dynamic-page` | 👍 🔦 |    | 🔧 |
| [dynamic-page-ban-sync-prop-setters](docs/rules/dynamic-page-ban-sync-prop-setters.md)             | Ban synchronous property getters that are not compatible with `dynamic-page` | 👍 🔦 |    | 🔧 |
| [dynamic-page-documentchange-event-advice](docs/rules/dynamic-page-documentchange-event-advice.md) | Advice on using the `documentchange` event                                   |       | 👍 |    |
| [dynamic-page-find-method-advice](docs/rules/dynamic-page-find-method-advice.md)                   | Advice on using the find*() family of methods                                |       | 👍 |    |

<!-- end auto-generated rules list -->

### Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md)