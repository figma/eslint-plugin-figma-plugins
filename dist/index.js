"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = void 0;
const dynamicPageBanSyncPropGetters_1 = require("./rules/dynamicPageBanSyncPropGetters");
const dynamicPageBanSyncMethods_1 = require("./rules/dynamicPageBanSyncMethods");
const dynamicPageBanSyncPropSetters_1 = require("./rules/dynamicPageBanSyncPropSetters");
const awaitRequiresAsync_1 = require("./rules/awaitRequiresAsync");
const dynamicPageBanDocumentchangeEvent_1 = require("./rules/dynamicPageBanDocumentchangeEvent");
const dynamicPageBanIdParams_1 = require("./rules/dynamicPageBanIdParams");
function ruleset(type, rules) {
    return Object.keys(rules).reduce((acc, name) => {
        acc[`@figma/figma-plugins/${name}`] = type;
        return acc;
    }, {});
}
const dynamicPageRules = {
    'await-requires-async': awaitRequiresAsync_1.awaitRequiresAsync,
    'dynamic-page-ban-documentchange-event': dynamicPageBanDocumentchangeEvent_1.dynamicPageBanDocumentchangeEvent,
    'dynamic-page-ban-id-params': dynamicPageBanIdParams_1.dynamicPageBanIdParams,
    'dynamic-page-ban-sync-methods': dynamicPageBanSyncMethods_1.dynamicPageBanSyncMethods,
    'dynamic-page-ban-sync-prop-getters': dynamicPageBanSyncPropGetters_1.dynamicPageBanSyncPropGetters,
    'dynamic-page-ban-sync-prop-setters': dynamicPageBanSyncPropSetters_1.dynamicPageBanSyncPropSetters,
};
// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.
exports.rules = Object.assign({}, dynamicPageRules);
exports.configs = {
    'dynamic-page': {
        plugins: ['@figma/figma-plugins'],
        rules: Object.assign({}, ruleset('error', dynamicPageRules)),
    },
};
