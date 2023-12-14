import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { addAsyncCallFix, createPluginRule, getTypeName, matchAncestorTypes } from '../util'

// Calls to createPluginRule() cause typechecker errors without this import.
// This is a TypeScript bug; cf https://github.com/microsoft/TypeScript/issues/47663
import type { TSESLint as _ } from '@typescript-eslint/utils'

interface DynamicPageBannedSyncPropGetter {
  property: string
  replacement: string
  receiverTypes: string[]
}

const dynamicPageBannedSyncPropGetters: DynamicPageBannedSyncPropGetter[] = [
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

export const dynamicPageBanSyncPropGetters = createPluginRule({
  name: 'dynamic-page-ban-sync-prop-getters',
  meta: {
    docs: {
      description:
        'Ban synchronous property getters that are not compatible with the dynamic-page manifest option.',
    },
    fixable: 'code',
    messages: {
      useReplacement:
        '{{receiverType}}.{{property}} is not compatible with the dynamic-page manifest option. Please use {{replacement}} instead.',
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

        const deprecation = dynamicPageBannedSyncPropGetters.find((g) => g.property === prop.name)
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
