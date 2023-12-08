"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deprecateDocumentChangeEvent = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
exports.deprecateDocumentChangeEvent = (0, util_1.createPluginRule)({
    name: 'deprecate-document-change-event',
    meta: {
        docs: {
            description: 'Deprecated documentchange event',
        },
        messages: {
            onReplacement: `The 'documentchange' event is deprecated. Please use PageNode.on('nodechange') or figma.on('stylechange') instead.`,
            onceReplacement: `The 'documentchange' event is deprecated. Please use PageNode.once('nodechange') or figma.once('stylechange') instead.`,
            offReplacement: `The 'documentchange' event is deprecated. Please use the 'nodechange' event on any PageNode, or the 'stylechange' event on the figma object.`,
        },
        schema: [],
        type: 'problem',
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                // Check that we're calling one of on(), once(), or off()
                const callee = node.callee;
                if (callee.type !== typescript_estree_1.AST_NODE_TYPES.MemberExpression) {
                    return;
                }
                const calleeProp = callee.property;
                if (calleeProp.type !== typescript_estree_1.AST_NODE_TYPES.Identifier) {
                    return;
                }
                if (calleeProp.name !== 'on' && calleeProp.name !== 'once' && calleeProp.name !== 'off') {
                    return;
                }
                // Check that the first argument is 'documentchange'
                const args = node.arguments;
                if (args.length < 1) {
                    return;
                }
                const eventName = args[0];
                if (eventName.type !== typescript_estree_1.AST_NODE_TYPES.Literal) {
                    return;
                }
                if (eventName.value !== 'documentchange') {
                    return;
                }
                // Ensure that we're calling the event handler method on a PluginAPI instance
                if (!(0, util_1.matchAncestorTypes)(context, callee.object, ['PluginAPI'])) {
                    return;
                }
                let messageId = 'onReplacement';
                if (calleeProp.name === 'once') {
                    messageId = 'onceReplacement';
                }
                else if (calleeProp.name === 'off') {
                    messageId = 'offReplacement';
                }
                context.report({ node, messageId });
            },
        };
    },
});
