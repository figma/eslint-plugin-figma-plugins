import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/typescript-estree'
import { createPluginRule, getTypeName, isStringNode, matchAncestorTypes } from '../util'

// Calls to createPluginRule() cause typechecker errors without this import.
// This is a TypeScript bug; cf https://github.com/microsoft/TypeScript/issues/47663
import type { TSESLint as _ } from '@typescript-eslint/utils'

interface DeprectedIdParam {
  receiverType: string
  method: string
  paramIndex: number
  wantParamType: string
  asyncObjectFetch: string
}

const deprecatedIdParams: DeprectedIdParam[] = [
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
  {
    receiverType: 'SceneNodeMixin',
    method: 'setBoundVariable',
    paramIndex: 1,
    wantParamType: 'Variable',
    asyncObjectFetch: 'figma.variables.getVariableByIdAsync',
  },
]

export const banDeprecatedIdParams = createPluginRule({
  name: 'ban-deprecated-id-params',
  meta: {
    docs: {
      description: 'Ban use of deprecated string ID parameters',
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

        const deprecation = deprecatedIdParams.find((p) => p.method === calleeProp.name)
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
