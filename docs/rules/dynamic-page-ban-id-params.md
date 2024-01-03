# Ban string ID parameters that are not compatible with `dynamic-page` (`@figma/figma-plugins/dynamic-page-ban-id-params`)

💼 This rule is enabled in the ⚡ `dynamic-page` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Some methods that take a string object identifier are not compatible with the
`dynamic-page` manifest option. In these cases, you can pass an instance of the
relevant object instead.

This rule provides a fix that fetches the relevant object by ID using an async
fetch function.
