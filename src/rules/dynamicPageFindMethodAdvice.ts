import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { createPluginRule, matchAncestorTypes } from '../util'

// Calls to createPluginRule() cause typechecker errors without this import.
// This is a TypeScript bug; cf https://github.com/microsoft/TypeScript/issues/47663
import type { TSESLint as _ } from '@typescript-eslint/utils'

const findMethods = ['findAll', 'findAllWithCriteria', 'findOne']

export const dynamicPageFindMethodAdvice = createPluginRule({
  name: 'dynamic-page-find-method-advice',
  meta: {
    docs: {
      description: 'Advice on using the find*() family of methods',
    },
    messages: {
      advice:
        'When using the dynamic-page manifest field, remember to call figma.loadAllPagesAsync() before using DocumentNode.{{method}}(). loadAllPagesAsync() only needs to be called once.',
    },
    schema: [],
    type: 'suggestion',
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        const callee = node.callee
        if (callee.type !== AST_NODE_TYPES.MemberExpression) {
          return
        }

        const calleeProp = callee.property
        if (calleeProp.type !== AST_NODE_TYPES.Identifier) {
          return
        }

        if (!findMethods.includes(calleeProp.name)) {
          return
        }

        const receiver = callee.object
        const match = matchAncestorTypes(context, receiver, ['DocumentNode'])
        if (!match) {
          return
        }

        context.report({
          node,
          messageId: 'advice',
          data: { method: calleeProp.name },
        })
      },
    }
  },
})
