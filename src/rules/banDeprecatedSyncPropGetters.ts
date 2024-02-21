import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { addAsyncCallFix, createPluginRule, getTypeName, matchAncestorTypes } from '../util'

// Calls to createPluginRule() cause typechecker errors without this import.
// This is a TypeScript bug; cf https://github.com/microsoft/TypeScript/issues/47663
import type { TSESLint as _ } from '@typescript-eslint/utils'

interface DeprecatedSyncPropGetter {
  property: string
  replacement: string
  receiverTypes: string[]
}

const deprecatedSyncPropGetters: DeprecatedSyncPropGetter[] = [
  {
    property: 'instances',
    replacement: 'getInstancesAsync',
    receiverTypes: ['ComponentNode'],
  },
  {
    property: 'consumers',
    replacement: 'getConsumersAsync',
    receiverTypes: ['BaseStyle'],
  },
  {
    property: 'mainComponent',
    replacement: 'getMainComponentAsync',
    receiverTypes: ['InstanceNode'],
  },
]

export const banDeprecatedSyncPropGetters = createPluginRule({
  name: 'ban-deprecated-sync-prop-getters',
  meta: {
    docs: {
      description: 'Ban use of deprecated synchronous property getters',
    },
    fixable: 'code',
    messages: {
      useReplacement:
        'Reading from {{receiverType}}.{{property}} is deprecated. Please use {{replacement}} instead.',
    },
    schema: [],
    type: 'problem',
  },
  defaultOptions: [],
  create(context) {
    return {
      MemberExpression(node: TSESTree.MemberExpression) {
        // allow the expression to be used in an assignment
        const parent = node.parent
        if (parent && parent.type === AST_NODE_TYPES.AssignmentExpression && parent.left === node) {
          return
        }

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
            receiverType: getTypeName(match.nodeType, match.matchedAncestorType),
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
