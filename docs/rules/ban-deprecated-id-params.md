# Ban use of deprecated string ID parameters (`@figma/figma-plugins/ban-deprecated-id-params`)

💼 This rule is enabled in the following configs: 👍 `recommended`, 🔦 `recommended-problems-only`.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

For some methods, passing a string object identifier as an argument has been
deprecated. In these cases, you can pass an instance of the relevant object
instead.

This rule provides a fix that fetches the relevant object by ID using an async
fetch function.

Note that the fix may produce an expression that doesn't fully satisfy the
typechecker. For example, the fix will transform this:

```
node.clearExplicitVariableModeForCollection("foo");
```

into this:

```
node.clearExplicitVariableModeForCollection(
  await figma.variables.getVariableCollectionByIdAsync("foo")
);
```

The type of the argument for `clearExplicitVariableModeForCollection` is
`VariableCollection`, whereas the type of the `await` expression is
`VariableCollection | null`. In other words, `getVariableCollectionByIdAsync`
can return null.

You can handle this situation in one of two ways. Ideally, you should check to
see if the variable collection is null, and handle that case explicitly, such
as:

```
const collection = await figma.variables.getVariableCollectionByIdAsync("foo")
if (collection === null) {
  // log an error, show a message to the user, etc.
  return;
}

node.clearExplicitVariableModeForCollection(collection)
```

A quick-and-dirty workaround is to silence the typechecker using the `!` operator:

```
node.clearExplicitVariableModeForCollection(
  (await figma.variables.getVariableCollectionByIdAsync("foo"))!
);
```
