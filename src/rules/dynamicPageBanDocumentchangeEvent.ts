import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { createPluginRule, matchAncestorTypes } from '../util'

// Calls to createPluginRule() cause typechecker errors without this import.
// This is a TypeScript bug; cf https://github.com/microsoft/TypeScript/issues/47663
import type { TSESLint as _ } from '@typescript-eslint/utils'

export const dynamicPageBanDocumentchangeEvent = createPluginRule({
  name: 'dynamic-page-ban-documentchange-event',
  meta: {
    docs: {
      description: 'Ban `documentchange` event',
    },
    messages: {
      onReplacement: `The 'documentchange' event is deprecated. Please use PageNode.on('nodechange') or figma.on('stylechange') instead.`,
      onceReplacement: `The 'documentchange' event is deprecated. Please use PageNode.once('nodechange') or figma.once('stylechange') instead.`,
      offReplacement: `The 'documentchange' event is deprecated. Please use the 'nodechange' event on any PageNode, or the 'stylechange' event on the figma object.`,
    },
    schema: [],
    type: 'problem',
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

        let messageId: 'onReplacement' | 'onceReplacement' | 'offReplacement' = 'onReplacement'
        if (calleeProp.name === 'once') {
          messageId = 'onceReplacement'
        } else if (calleeProp.name === 'off') {
          messageId = 'offReplacement'
        }

        context.report({ node, messageId })
      },
    }
  },
})
