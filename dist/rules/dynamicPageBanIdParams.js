"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicPageBanIdParams = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
const dynamicPageBannedIdParams = [
    {
        receiverType: 'VariablesAPI',
        method: 'createVariable',
        paramIndex: 1,
        wantParamType: 'VariableCollection',
        asyncObjectFetch: 'figma.variables.getVariableCollectionByIdAsync',
    },
];
exports.dynamicPageBanIdParams = (0, util_1.createPluginRule)({
    name: 'dynamic-page-ban-id-params',
    meta: {
        docs: {
            description: 'Ban string ID parameters that are not compatible with `dynamic-page`',
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
                const deprecation = dynamicPageBannedIdParams.find((p) => p.method === calleeProp.name);
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
