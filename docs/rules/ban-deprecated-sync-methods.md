# Ban use of deprecated synchronous methods (`@figma/figma-plugins/ban-deprecated-sync-methods`)

💼 This rule is enabled in the following configs: 👍 `recommended`, 🔦 `recommended-problems-only`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Some synchronous methods are deprecated in favor of `async` alternatives. This
rule provides a fix to automatically convert callsites into their `async`
equivalents.
