# Ban synchronous property getters that are not compatible with `dynamic-page` (`@figma/figma-plugins/dynamic-page-ban-sync-prop-setters`)

💼 This rule is enabled in the following configs: ⚡ `dynamic-page`, 💥 `dynamic-page-problems-only`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Under the `dynamic-page` manifest option, some object properties cannot be assigned synchronously. For each of these, the API contains an `async` setter method that should be used instead. This rule provides a fix that automatically converts writes to these properties into their `async` equivalents.
