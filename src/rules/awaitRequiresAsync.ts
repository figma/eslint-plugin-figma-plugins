import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { TraverseTreeResult, createPluginRule, traverseTree } from '../util'

// Calls to createPluginRule() cause typechecker errors without this import.
// This is a TypeScript bug; cf https://github.com/microsoft/TypeScript/issues/47663
import type { TSESLint, TSESLint as _ } from '@typescript-eslint/utils'

/**
 * This rule requires that functions containing the `await` keyword be marked
 * `async`. It's quite a bit more generic than we want for this rule package,
 * and overlaps with a feature already present in the VSCode TypeScript
 * extension. Nevertheless, we offer it so that we can add `async` modifiers to
 * functions via a full-file autofix (e.g. eslint --fix).
 *
 * Note that this rule covers all cases where `await` is present without
 * `async`. Ideally, the fix in this rule would be restricted to cases where
 * another fix in this package creates an `await` inside of a function that is
 * not async. However, these two fixes cannot co-exist in the same eslint report;
 * adding an `async` modifier applies to the entire function, and is considered
 * "overlapping" with the fix that adds `await`. eslint reports do not permit
 * overlapping fixes.
 */
export const awaitRequiresAsync = createPluginRule({
  name: 'await-requires-async',
  meta: {
    docs: {
      description: 'Require functions that contain `await` to be `async`',
    },
    fixable: 'code',
    messages: {
      requiresAsync: 'Functions containing the await keyword should be marked async.',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    return {
      ArrowFunctionExpression(node: TSESTree.ArrowFunctionExpression) {
        runRule(context, node)
      },
      FunctionDeclaration(node: TSESTree.FunctionDeclaration) {
        runRule(context, node)
      },
      FunctionExpression(node: TSESTree.FunctionExpression) {
        runRule(context, node)
      },
    }
  },
})

function containsAwait(containingNode: TSESTree.Node): boolean {
  let found = false

  traverseTree(containingNode, (node: TSESTree.Node) => {
    if (node.type === AST_NODE_TYPES.AwaitExpression) {
      found = true
      return TraverseTreeResult.Done
    }

    // Ignore `await` in nested functions
    if (
      node.type === AST_NODE_TYPES.ArrowFunctionExpression ||
      node.type === AST_NODE_TYPES.FunctionDeclaration ||
      node.type === AST_NODE_TYPES.FunctionExpression
    ) {
      return TraverseTreeResult.SkipChildren
    }

    return TraverseTreeResult.Continue
  })

  return found
}

function runRule<TOptions extends readonly unknown[]>(
  context: TSESLint.RuleContext<'requiresAsync', TOptions>,
  funcNode:
    | TSESTree.ArrowFunctionExpression
    | TSESTree.FunctionDeclaration
    | TSESTree.FunctionExpression,
): void {
  if (funcNode.async) {
    return
  }

  if (!containsAwait(funcNode.body)) {
    return
  }

  context.report({
    node: funcNode,
    messageId: 'requiresAsync',
    fix(fixer) {
      const src = context.sourceCode.getText(funcNode)
      return fixer.replaceText(funcNode, `async ${src}`)
    },
  })
}
