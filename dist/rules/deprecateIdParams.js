"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deprecateIdParams = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
const ruleData_1 = require("../ruleData");
exports.deprecateIdParams = (0, util_1.createPluginRule)({
    name: 'deprecate-id-params',
    meta: {
        docs: {
            description: 'Deprecated ID parameters',
        },
        fixable: 'code',
        messages: {
            useReplacement: 'Passing a string ID for parameter {{humanReadableParamIndex}} to {{receiverType}}.{{method}} is deprecated. Please pass a {{wantParamType}} instead.',
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
                const deprecation = ruleData_1.deprecatedIdParams.find((p) => p.method === calleeProp.name);
                if (!deprecation) {
                    return;
                }
                const receiver = callee.object;
                const match = (0, util_1.matchAncestorTypes)(context, receiver, [deprecation.receiverType]);
                if (!match) {
                    return;
                }
                const arg = node.arguments[deprecation.paramIndex];
                if (!arg) {
                    return;
                }
                if (!(0, util_1.isStringNode)(context, arg)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'useReplacement',
                    data: {
                        humanReadableParamIndex: deprecation.paramIndex + 1,
                        receiverType: (0, util_1.getTypeName)(match.nodeType, match.matchedAncestorType),
                        method: deprecation.method,
                        wantParamType: deprecation.wantParamType,
                    },
                    fix(fixer) {
                        const argText = context.sourceCode.getText(arg);
                        return fixer.replaceText(arg, `await ${deprecation.asyncObjectFetch}(${argText})`);
                    },
                });
            },
        };
    },
});
