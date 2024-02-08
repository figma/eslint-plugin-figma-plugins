# Require functions that contain `await` to be `async` (`@figma/figma-plugins/await-requires-async`)

💼 This rule is enabled in the following configs: 👍 `recommended`, 🔦 `recommended-problems-only`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

This rule requires that functions containing the `await` keyword be marked
`async`. It's quite a bit more generic than we want for this rule package, and
overlaps with a feature already present in the VSCode TypeScript extension.
Nevertheless, we offer it so that we can add `async` modifiers to functions via
a full-file autofix (e.g. eslint --fix).

Note that this rule covers all cases where `await` is present without `async`.
Ideally, the fix in this rule would be restricted to cases where another fix in
this package creates an `await` inside of a function that is not async. However,
these two fixes cannot co-exist in the same eslint report; adding an `async`
modifier applies to the entire function, and is considered "overlapping" with
the fix that adds `await`. eslint reports do not permit overlapping fixes.
