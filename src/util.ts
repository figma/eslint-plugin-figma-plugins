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

export function matchAncestorTypes<TMessageIds extends string, TOptions extends readonly unknown[]>(
  context: TSESLint.RuleContext<TMessageIds, TOptions>,
  node: TSESTree.Node,
  ancestorTypes: string[],
):
  | {
      nodeType: ts.Type
      matchedAncestorType: string
    }
  | undefined {
  const type = ESLintUtils.getParserServices(context).getTypeAtLocation(node)
  const match = ancestorTypes.find((name) => composedOfTypeWithName(type, name))
  return match ? { nodeType: type, matchedAncestorType: match } : undefined
}

export enum TraverseTreeResult {
  Continue,
  SkipChildren,
  Done,
}

/**
 * Traverse a TSESTree.Node tree in depth-first order. The visitor function can
 * indicate whether to continue traversing the node's children, skip the node's
 * children, or stop traversing altogether.
 */
export function traverseTree(
  root: TSESTree.Node,
  visitor: (node: TSESTree.Node) => TraverseTreeResult,
): void {
  traverseTreeRecursive(root, visitor)
}

export function traverseTreeRecursive(
  node: unknown,
  visitor: (node: TSESTree.Node) => TraverseTreeResult,
): TraverseTreeResult.Done | undefined {
  // This algorithm is provided by:
  // github.com/typescript-eslint/typescript-eslint/blob/705370ac0d9c54081657b8855b398e57d6ea4ddb/packages/typescript-estree/src/simple-traverse.ts

  if (!isValidNode(node)) {
    return
  }

  const result = visitor(node)
  if (result === TraverseTreeResult.Done) {
    return TraverseTreeResult.Done
  }
  if (result === TraverseTreeResult.SkipChildren) {
    return
  }

  for (const [k, childOrChildren] of Object.entries(node)) {
    // Avoid cycles. Ideally, we could restrict this to an even narrower set of
    // keys, but it's a lot of work to inventory all possible keys containing
    // child nodes, and it wouldn't be future-proof.
    if (k === 'parent') {
      continue
    }

    if (Array.isArray(childOrChildren)) {
      for (const child of childOrChildren) {
        if (traverseTreeRecursive(child, visitor) === TraverseTreeResult.Done) {
          return TraverseTreeResult.Done
        }
      }
      continue
    }

    if (traverseTreeRecursive(childOrChildren, visitor) === TraverseTreeResult.Done) {
      return TraverseTreeResult.Done
    }
  }
}

/**
 * This is a duck-type test to determine whether a value is a TSESTree.Node. It
 * is not particularly bulletproof, and I'd suggest not using it unless you can
 * guarantee that the input value is either a node or comes from a node.
 */
function isValidNode(x: unknown): x is TSESTree.Node {
  return typeof x === 'object' && x != null && 'type' in x && typeof x.type === 'string'
}
