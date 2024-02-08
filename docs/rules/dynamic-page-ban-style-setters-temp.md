# Ban `async` style-assignment methods from the `dynamic-page` beta (`@figma/figma-plugins/dynamic-page-ban-style-setters-temp`)

💼 This rule is enabled in the following configs: 👍 `recommended`, 🔦 `recommended-problems-only`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

This rule bans and autofixes calls to "setStyle()" methods that take style
objects as parameters. These methods were introduced during the dynamic-page
Plugin API beta, but we decided to return to ID-assigning async setters to
stay consistent with pre-existing ID properties.

Importantly, this rule should only apply to code written early in the beta
period; the number of developers affected should be small. We should remove
this rule after we've confirmed that everyone has transitioned away from
those methods.
