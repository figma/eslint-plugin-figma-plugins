import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { addAsyncCallFix, createPluginRule, getTypeName, matchAncestorTypes } from '../util'

// Calls to createPluginRule() cause typechecker errors without this import.
// This is a TypeScript bug; cf https://github.com/microsoft/TypeScript/issues/47663
import type { TSESLint as _ } from '@typescript-eslint/utils'

interface DynamicPageBannedStyleSetter {
  method: string
  replacement: string
  receiverType: string
}

const dynamicPageBannedStyleSetters: DynamicPageBannedStyleSetter[] = [
  {
    method: 'setEffectStyle',
    replacement: 'setEffectStyleIdAsync',
    receiverType: 'BlendMixin',
  },
  {
    method: 'setFillStyle',
    replacement: 'setFillStyleIdAsync',
    receiverType: 'MinimalFillsMixin',
  },
  {
    method: 'setGridStyle',
    replacement: 'setGridStyleIdAsync',
    receiverType: 'BaseFrameMixin',
  },
  {
    method: 'setStrokeStyle',
    replacement: 'setStrokeStyleIdAsync',
    receiverType: 'MinimalStrokesMixin',
  },
  {
    method: 'setTextStyle',
    replacement: 'setTextStyleIdAsync',
    receiverType: 'TextNode',
  },
]

/**
 * This rule bans and autofixes calls to "setStyle()" methods that take style
 * objects as parameters. These methods were introduced during the dynamic-page
 * Plugin API beta, but we decided to return to ID-assigning async setters to
 * stay consistent with pre-existing ID properties.
 *
 * Importantly, this rule should only apply to code written early in the beta
 * period; the number of developers affected should be small. We should remove
 * this rule after we've confirmed that everyone has transitioned away from
 * those methods.
 */
export const dynamicPageBanStyleSettersTemp = createPluginRule({
  name: 'dynamic-page-ban-style-setters-temp',
  meta: {
    docs: {
      description:
        'Ban "setStyle()" async methods that were introduced in the early part of the dynamic-page Plugin API beta.',
    },
    fixable: 'code',
    messages: {
      useReplacement:
        '{{receiverType}}.{{method}} is no longer supported. Please use {{replacement}} instead.',
    },
    schema: [],
    type: 'problem',
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

        const banned = dynamicPageBannedStyleSetters.find((p) => p.method === calleeProp.name)
        if (!banned) {
          return
        }

        const receiver = callee.object
        const match = matchAncestorTypes(context, receiver, [banned.receiverType])
        if (!match) {
          return
        }

        context.report({
          node,
          messageId: 'useReplacement',
          data: {
            receiverType: getTypeName(match.nodeType, match.matchedAncestorType),
            method: banned.method,
            replacement: banned.replacement,
          },
          fix(fixer) {
            return addAsyncCallFix({
              context,
              fixer,
              expression: node,
              receiver,
              asyncIdentifier: banned.replacement,
              args: node.arguments,
              argsPostProcessor: (s) => `(${s}).id`,
            })
          },
        })
      },
    }
  },
})
