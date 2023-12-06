import { AST_NODE_TYPES, ESLintUtils, TSESLint, TSESTree } from '@typescript-eslint/utils'
import ts from 'typescript'

export function composedOfTypeWithName(t: ts.Type, typeName: string): boolean {
  if (t.symbol && t.symbol.name === typeName) {
    return true
  }

  if (t.aliasSymbol && t.aliasSymbol.name === typeName) {
    return true
  }

  if (t.isUnion()) {
    return t.types.some((t) => composedOfTypeWithName(t, typeName))
  }

  if (t.isIntersection()) {
    return t.types.some((t) => composedOfTypeWithName(t, typeName))
  }

  const baseTypes = t.getBaseTypes()
  if (baseTypes) {
    return baseTypes.some((t) => composedOfTypeWithName(t, typeName))
  }

  return false
}

export const createPluginRule = ESLintUtils.RuleCreator(
  (name) => `https://github.com/figma/eslint-plugin-figma-plugins/src/rules/${name}.ts`,
)

export function addAsyncCallFix<TMessageIds extends string, TOptions extends readonly unknown[]>({
  context,
  fixer,
  expression,
  receiver,
  asyncIdentifier,
  args,
}: {
  context: TSESLint.RuleContext<TMessageIds, TOptions>
  fixer: TSESLint.RuleFixer
  expression: TSESTree.Node
  receiver: TSESTree.Node
  asyncIdentifier: string
  args: TSESTree.Node[]
}): TSESLint.RuleFix {
  const doParens =
    receiver.type !== AST_NODE_TYPES.Identifier &&
    receiver.type !== AST_NODE_TYPES.MemberExpression &&
    receiver.type !== AST_NODE_TYPES.CallExpression
  let rcvSrc = context.sourceCode.getText(receiver)
  rcvSrc = doParens ? `(${rcvSrc})` : rcvSrc
  const paramsSrc = args.map((a) => context.sourceCode.getText(a)).join(', ')
  return fixer.replaceText(expression, `await ${rcvSrc}.${asyncIdentifier}(${paramsSrc})`)
}

export function matchParentTypes<TMessageIds extends string, TOptions extends readonly unknown[]>(
  context: TSESLint.RuleContext<TMessageIds, TOptions>,
  node: TSESTree.Node,
  parentTypes: string[],
):
  | {
      nodeType: ts.Type
      matchedParentType: string
    }
  | undefined {
  const type = ESLintUtils.getParserServices(context).getTypeAtLocation(node)
  const match = parentTypes.find((name) => composedOfTypeWithName(type, name))
  return match ? { nodeType: type, matchedParentType: match } : undefined
}
