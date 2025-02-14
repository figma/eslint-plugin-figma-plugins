import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { createPluginRule, matchAncestorTypes } from '../util'

// Copied from dynamicPageFindMethodAdvice
// Calls to createPluginRule() cause typechecker errors without this import.
// Needed for TypeScript bug
import type { TSESLint as _ } from '@typescript-eslint/utils'

export const constrainProportionsReplacedByTargetAspectRatioAdvice = createPluginRule({
  name: 'constrain-proportions-replaced-by-target-aspect-ratio-advice',
  meta: {
    docs: {
      description: 'Warns against using constrainProportions in favor of targetAspectRatio',
    },
    messages: {
      readAdvice: 'Please use targetAspectRatio instead of constrainProportions for determining if a node will resize proportinally.',
      writeAdvice: 'Please use lockAspectRatio() or unlockAspectRatio() instead of setting constrainProportions.',
    },
    schema: [],
    type: 'suggestion',
  },
  defaultOptions: [],
  create(context) {
    return {
      MemberExpression(node: TSESTree.MemberExpression) {
        const property = node.property
        if (
          property.type === AST_NODE_TYPES.Identifier &&
          property.name === 'constrainProportions'
        ) {
          // Check if the receiver is a LayoutMixin, since that's what constrainProportions lives on 
          const match = matchAncestorTypes(context, node.object, ['LayoutMixin'])
          if (!match) {
            return
          }

          // Check if it's being read or written to
          const parent = node.parent
          if (
            parent?.type === AST_NODE_TYPES.AssignmentExpression &&
            parent.left === node
          ) {
            // It's being written to
            context.report({
              node,
              messageId: 'writeAdvice',
            })
          } else {
            // It's being read
            context.report({
              node,
              messageId: 'readAdvice',
            })
          }
        }
      },
    }
  },
})