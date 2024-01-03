"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicPageBanSyncMethods = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
const dynamicPageBannedSyncMethods = [
    {
        method: 'getNodeById',
        replacement: 'getNodeByIdAsync',
        receiverTypes: ['PluginAPI'],
    },
    {
        method: 'getStyleById',
        replacement: 'getStyleByIdAsync',
        receiverTypes: ['PluginAPI'],
    },
    {
        method: 'getFileThumbnailNode',
        replacement: 'getFileThumbnailNodeAsync',
        receiverTypes: ['PluginAPI'],
    },
    {
        method: 'getLocalTextStyles',
        replacement: 'getLocalTextStylesAsync',
        receiverTypes: ['PluginAPI'],
    },
    {
        method: 'getLocalPaintStyles',
        replacement: 'getLocalPaintStylesAsync',
        receiverTypes: ['PluginAPI'],
    },
    {
        method: 'getLocalEffectStyles',
        replacement: 'getLocalEffectStylesAsync',
        receiverTypes: ['PluginAPI'],
    },
    {
        method: 'getLocalGridStyles',
        replacement: 'getLocalGridStylesAsync',
        receiverTypes: ['PluginAPI'],
    },
    {
        method: 'getVariableById',
        replacement: 'getVariableByIdAsync',
        receiverTypes: ['VariablesAPI'],
    },
    {
        method: 'getVariableCollectionById',
        replacement: 'getVariableCollectionByIdAsync',
        receiverTypes: ['VariablesAPI'],
    },
    {
        method: 'getLocalVariableCollections',
        replacement: 'getLocalVariableCollectionsAsync',
        receiverTypes: ['VariablesAPI'],
    },
    {
        method: 'getLocalVariables',
        replacement: 'getLocalVariablesAsync',
        receiverTypes: ['VariablesAPI'],
    },
    {
        method: 'setRangeTextStyle',
        replacement: 'setRangeTextStyleIdAsync',
        receiverTypes: ['NonResizableTextMixin'],
    },
    {
        method: 'setRangeFillStyle',
        replacement: 'setRangeFillStyleIdAsync',
        receiverTypes: ['NonResizableTextMixin'],
    },
];
exports.dynamicPageBanSyncMethods = (0, util_1.createPluginRule)({
    name: 'dynamic-page-ban-sync-methods',
    meta: {
        docs: {
            description: 'Ban synchronous methods that are not compatible with `dynamic-page`',
        },
        fixable: 'code',
        messages: {
            useReplacement: '{{receiverType}}.{{method}} is not compatible with the dynamic-page manifest option. Please use {{replacement}} instead.',
        },
        schema: [],
        type: 'problem',
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                const callee = node.callee;
                if (callee.type !== typescript_estree_1.AST_NODE_TYPES.MemberExpression) {
                    return;
                }
                const calleeProp = callee.property;
                if (calleeProp.type !== typescript_estree_1.AST_NODE_TYPES.Identifier) {
                    return;
                }
                const deprecation = dynamicPageBannedSyncMethods.find((m) => m.method === calleeProp.name);
                if (!deprecation) {
                    return;
                }
                const receiver = callee.object;
                const match = (0, util_1.matchAncestorTypes)(context, receiver, deprecation.receiverTypes);
                if (!match) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'useReplacement',
                    data: {
                        receiverType: (0, util_1.getTypeName)(match.nodeType, match.matchedAncestorType),
                        method: deprecation.method,
                        replacement: deprecation.replacement,
                    },
                    fix(fixer) {
                        return (0, util_1.addAsyncCallFix)({
                            context,
                            fixer,
                            expression: node,
                            receiver: receiver,
                            asyncIdentifier: deprecation.replacement,
                            args: node.arguments,
                        });
                    },
                });
            },
        };
    },
});
