import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { createPluginRule, matchAncestorTypes } from '../util'

// Calls to createPluginRule() cause typechecker errors without this import.
// This is a TypeScript bug; cf https://github.com/microsoft/TypeScript/issues/47663
import type { TSESLint as _ } from '@typescript-eslint/utils'

export const dynamicPageDocumentchangeEventAdvice = createPluginRule({
  name: 'dynamic-page-documentchange-event-advice',
  meta: {
    docs: {
      description: 'Advice on using the `documentchange` event',
    },
    messages: {
      advice: `When using the dynamic-page manifest field, remember to call figma.loadAllPagesAsync() before using DocumentNode.{{method}}(). loadAllPagesAsync() only needs to be called once.`,
    },
    schema: [],
    type: 'suggestion',
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node: TSESTree.CallExpression) {
        // Check that we're calling one of on(), once(), or off()
        const callee = node.callee
        if (callee.type !== AST_NODE_TYPES.MemberExpression) {
          return
        }

        const calleeProp = callee.property
        if (calleeProp.type !== AST_NODE_TYPES.Identifier) {
          return
        }

        if (calleeProp.name !== 'on' && calleeProp.name !== 'once' && calleeProp.name !== 'off') {
          return
        }

        // Check that the first argument is 'documentchange'
        const args = node.arguments
        if (args.length < 1) {
          return
        }

        const eventName = args[0]
        if (eventName.type !== AST_NODE_TYPES.Literal) {
          return
        }

        if (eventName.value !== 'documentchange') {
          return
        }

        // Ensure that we're calling the event handler method on a PluginAPI instance
        if (!matchAncestorTypes(context, callee.object, ['PluginAPI'])) {
          return
        }

        context.report({ node, messageId: 'advice' })
      },
    }
  },
})
