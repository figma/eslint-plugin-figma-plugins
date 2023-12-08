"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deprecateSyncMethods = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
const ruleData_1 = require("../ruleData");
exports.deprecateSyncMethods = (0, util_1.createPluginRule)({
    name: 'deprecate-sync-methods',
    meta: {
        docs: {
            description: 'Deprecated synchronous method',
        },
        fixable: 'code',
        messages: {
            useReplacement: '{{receiverType}}.{{method}} is deprecated. Please use {{replacement}} instead.',
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
                const deprecation = ruleData_1.deprecatedSyncMethods.find((m) => m.method === calleeProp.name);
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
