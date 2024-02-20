# Ban use of deprecated synchronous property getters (`@figma/figma-plugins/ban-deprecated-sync-prop-getters`)

💼 This rule is enabled in the following configs: 👍 `recommended`, 🔦 `recommended-problems-only`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Reading certain object properties synchronously has been deprecated. For each of
these, the API contains an `async` getter method that should be used instead.
This rule provides a fix that automatically converts read accesses of these
properties into their `async` equivalents.
