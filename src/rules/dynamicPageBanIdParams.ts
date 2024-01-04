import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { createPluginRule, getTypeName, isStringNode, matchAncestorTypes } from '../util'

// Calls to createPluginRule() cause typechecker errors without this import.
// This is a TypeScript bug; cf https://github.com/microsoft/TypeScript/issues/47663
import type { TSESLint as _ } from '@typescript-eslint/utils'

interface DynamicPageBannedIdParam {
  receiverType: string
  method: string
  paramIndex: number
  wantParamType: string
  asyncObjectFetch: string
}

const dynamicPageBannedIdParams: DynamicPageBannedIdParam[] = [
  {
    receiverType: 'VariablesAPI',
    method: 'createVariable',
    paramIndex: 1,
    wantParamType: 'VariableCollection',
    asyncObjectFetch: 'figma.variables.getVariableCollectionByIdAsync',
  },
  {
    receiverType: 'ExplicitVariableModesMixin',
    method: 'setExplicitVariableModeForCollection',
    paramIndex: 0,
    wantParamType: 'VariableCollection',
    asyncObjectFetch: 'figma.variables.getVariableCollectionByIdAsync',
  },
  {
    receiverType: 'ExplicitVariableModesMixin',
    method: 'clearExplicitVariableModeForCollection',
    paramIndex: 0,
    wantParamType: 'VariableCollection',
    asyncObjectFetch: 'figma.variables.getVariableCollectionByIdAsync',
  },
]

export const dynamicPageBanIdParams = createPluginRule({
  name: 'dynamic-page-ban-id-params',
  meta: {
    docs: {
      description: 'Ban string ID parameters that are not compatible with `dynamic-page`',
    },
    fixable: 'code',
    messages: {
      useReplacement:
        'Passing a string ID for parameter {{humanReadableParamIndex}} to {{receiverType}}.{{method}} is deprecated. Please pass a {{wantParamType}} instead.',
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

        const deprecation = dynamicPageBannedIdParams.find((p) => p.method === calleeProp.name)
        if (!deprecation) {
          return
        }

        const receiver = callee.object
        const match = matchAncestorTypes(context, receiver, [deprecation.receiverType])
        if (!match) {
          return
        }

        const arg = node.arguments[deprecation.paramIndex]
        if (!arg) {
          return
        }

        if (!isStringNode(context, arg)) {
          return
        }

        context.report({
          node,
          messageId: 'useReplacement',
          data: {
            humanReadableParamIndex: deprecation.paramIndex + 1,
            receiverType: getTypeName(match.nodeType, match.matchedAncestorType),
            method: deprecation.method,
            wantParamType: deprecation.wantParamType,
          },
          fix(fixer) {
            const argText = context.sourceCode.getText(arg)
            return fixer.replaceText(arg, `await ${deprecation.asyncObjectFetch}(${argText})`)
          },
        })
      },
    }
  },
})
