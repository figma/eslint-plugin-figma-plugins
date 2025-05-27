import { ESLintUtils, TSESLint, TSESTree } from '@typescript-eslint/utils';
import ts from 'typescript';
export declare const createPluginRule: <Options extends readonly unknown[], MessageIds extends string>({ meta, name, ...rule }: Readonly<ESLintUtils.RuleWithMetaAndName<Options, MessageIds, unknown>>) => ESLintUtils.RuleModule<MessageIds, Options, unknown, ESLintUtils.RuleListener>;
export declare function addAsyncCallFix<TMessageIds extends string, TOptions extends readonly unknown[]>({ context, fixer, expression, receiver, asyncIdentifier, args, argsPostProcessor, }: {
    context: TSESLint.RuleContext<TMessageIds, TOptions>;
    fixer: TSESLint.RuleFixer;
    expression: TSESTree.Node;
    receiver: TSESTree.Node;
    asyncIdentifier: string;
    args: TSESTree.Node[];
    argsPostProcessor?: (s: string, index: number) => string;
}): TSESLint.RuleFix;
export interface MatchAncestorTypeResult {
    nodeType: ts.Type;
    matchedAncestorType: string;
}
export declare function matchAncestorTypes<TMessageIds extends string, TOptions extends readonly unknown[]>(context: TSESLint.RuleContext<TMessageIds, TOptions>, node: TSESTree.Node, ancestorTypes: string[]): MatchAncestorTypeResult | undefined;
export declare enum TraverseTreeResult {
    Continue = 0,
    SkipChildren = 1,
    Done = 2
}
/**
 * Traverse a TSESTree.Node tree in depth-first order. The visitor function can
 * indicate whether to continue traversing the node's children, skip the node's
 * children, or stop traversing altogether.
 */
export declare function traverseTree(root: TSESTree.Node, visitor: (node: TSESTree.Node) => TraverseTreeResult): void;
/**
 * When running these rules from tests, sometimes a TypeScript Type object's
 * symbol property is undefined, contrary to the type declaration. This seems to
 * happen when an expression has a named type, but the type does not to resolve
 * to anything that the typechecker knows about.
 *
 * The discrepancy between the compiler API and its type definitions may be due
 * to this bug: https://github.com/microsoft/TypeScript/issues/13165
 *
 * As a workaround, we use two fallbacks, in order of priority:
 * - aliasSymbol.escapedName
 * - the fallback argument, which should be the type we searched for in
 *   matchAncestorTypes()
 */
export declare function getTypeName(t: ts.Type, fallback: string): string;
export declare function isStringNode<TMessageIds extends string, TOptions extends readonly unknown[]>(context: TSESLint.RuleContext<TMessageIds, TOptions>, node: TSESTree.Node): boolean;
