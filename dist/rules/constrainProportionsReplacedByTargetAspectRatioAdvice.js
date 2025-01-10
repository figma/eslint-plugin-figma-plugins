"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constrainProportionsReplacedByTargetAspectRatioAdvice = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
exports.constrainProportionsReplacedByTargetAspectRatioAdvice = (0, util_1.createPluginRule)({
    name: 'constrain-proportions-replaced-by-target-aspect-ratio-advice',
    meta: {
        docs: {
            description: 'Warns against using constrainProportions in favor of targetAspectRatio',
        },
        messages: {
            readAdvice: 'Please use targetAspectRatio instead of constrainProportions for determining if a node will resize proportinally.',
            writeAdvice: 'Please use lockAspectRatio() or unlockAspectRatio() instead of setting constrainProportions.',
        },
        schema: [],
        type: 'suggestion',
    },
    defaultOptions: [],
    create(context) {
        return {
            MemberExpression(node) {
                const property = node.property;
                if (property.type === typescript_estree_1.AST_NODE_TYPES.Identifier &&
                    property.name === 'constrainProportions') {
                    // Check if the receiver is a LayoutMixin, since that's what constrainProportions lives on 
                    const match = (0, util_1.matchAncestorTypes)(context, node.object, ['LayoutMixin']);
                    if (!match) {
                        return;
                    }
                    // Check if it's being read or written to
                    const parent = node.parent;
                    if ((parent === null || parent === void 0 ? void 0 : parent.type) === typescript_estree_1.AST_NODE_TYPES.AssignmentExpression &&
                        parent.left === node) {
                        // It's being written to
                        context.report({
                            node,
                            messageId: 'writeAdvice',
                        });
                    }
                    else {
                        // It's being read
                        context.report({
                            node,
                            messageId: 'readAdvice',
                        });
                    }
                }
            },
        };
    },
});
