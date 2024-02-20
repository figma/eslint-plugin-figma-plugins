# Ban use of deprecated synchronous property getters (`@figma/figma-plugins/ban-deprecated-sync-prop-setters`)

💼 This rule is enabled in the following configs: 👍 `recommended`, 🔦 `recommended-problems-only`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Assigning to certain object properties synchronously has been deprecated. For
each of these, the API contains an `async` setter method that should be used
instead. This rule provides a fix that automatically converts writes to these
properties into their `async` equivalents.
