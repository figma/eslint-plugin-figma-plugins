"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = void 0;
const deprecateSyncPropGetters_1 = require("./rules/deprecateSyncPropGetters");
const deprecateSyncMethods_1 = require("./rules/deprecateSyncMethods");
const deprecateSyncPropSetters_1 = require("./rules/deprecateSyncPropSetters");
const awaitRequiresAsync_1 = require("./rules/awaitRequiresAsync");
const deprecateDocumentChangeEvent_1 = require("./rules/deprecateDocumentChangeEvent");
const deprecateIdParams_1 = require("./rules/deprecateIdParams");
function ruleset(type, rules) {
    return Object.keys(rules).reduce((acc, name) => {
        acc[`@figma/figma-plugins/${name}`] = type;
        return acc;
    }, {});
}
const errorRules = {
    'await-requires-async': awaitRequiresAsync_1.awaitRequiresAsync,
    'deprecate-document-change-event': deprecateDocumentChangeEvent_1.deprecateDocumentChangeEvent,
    'deprecate-id-params': deprecateIdParams_1.deprecateIdParams,
    'deprecate-sync-methods': deprecateSyncMethods_1.deprecateSyncMethods,
    'deprecate-sync-prop-getters': deprecateSyncPropGetters_1.deprecateSyncPropGetters,
    'deprecate-sync-prop-setters': deprecateSyncPropSetters_1.deprecateSyncPropSetters,
};
// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.
exports.rules = Object.assign({}, errorRules);
exports.configs = {
    recommended: {
        plugins: ['@figma/figma-plugins'],
        rules: Object.assign({}, ruleset('error', errorRules)),
    },
};
