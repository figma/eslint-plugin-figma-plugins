import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { addAsyncCallFix, createPluginRule, matchAncestorTypes } from '../util'
import { deprecatedSyncPropGetters } from '../ruleData'

// Calls to createPluginRule() cause typechecker errors without this import.
// This is a TypeScript bug; cf https://github.com/microsoft/TypeScript/issues/47663
import type { TSESLint as _ } from '@typescript-eslint/utils'

export const deprecateSyncPropGetters = createPluginRule({
  name: 'deprecate-sync-prop-getters',
  meta: {
    docs: {
      description: 'Deprecated synchronous property getter',
    },
    fixable: 'code',
    messages: {
      useReplacement:
        '{{receiverType}}.{{property}} is deprecated. Please use {{replacement}} instead.',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    return {
      MemberExpression(node: TSESTree.MemberExpression) {
        const prop = node.property
        if (prop.type !== AST_NODE_TYPES.Identifier) {
          return
        }

        const deprecation = deprecatedSyncPropGetters.find((g) => g.property === prop.name)
        if (!deprecation) {
          return
        }

        const receiver = node.object
        const match = matchAncestorTypes(context, receiver, deprecation.receiverTypes)
        if (!match) {
          return
        }

        context.report({
          node,
          messageId: 'useReplacement',
          data: {
            receiverType: match.nodeType.symbol.name,
            property: deprecation.property,
            replacement: deprecation.replacement,
          },
          fix(fixer) {
            return addAsyncCallFix({
              context,
              fixer,
              expression: node,
              receiver,
              asyncIdentifier: deprecation.replacement,
              args: [],
            })
          },
        })
      },
    }
  },
})
