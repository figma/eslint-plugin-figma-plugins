# Ban synchronous property getters that are not compatible with `dynamic-page` (`@figma/figma-plugins/dynamic-page-ban-sync-prop-getters`)

💼 This rule is enabled in the ⚡ `dynamic-page` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Under the `dynamic-page` manifest option, some object properties are not available for synchronous reading. For each of these, the API contains an `async` getter method that should be used instead. This rule provides a fix that automatically converts read accesses of these properties into their `async` equivalents.
