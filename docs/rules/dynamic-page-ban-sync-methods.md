# Ban synchronous methods that are not compatible with `dynamic-page` (`@figma/figma-plugins/dynamic-page-ban-sync-methods`)

💼 This rule is enabled in the ⚡ `dynamic-page` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

This rule bans synchronous methods that are not compatible with the
`dynamic-page` manifest option. `async` alternatives are available for these
methods. This rule provides a fix to automatically convert callsites into their
`async` equivalents.
