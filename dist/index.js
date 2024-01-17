"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = void 0;
const awaitRequiresAsync_1 = require("./rules/awaitRequiresAsync");
const dynamicPageDocumentchangeEventAdvice_1 = require("./rules/dynamicPageDocumentchangeEventAdvice");
const dynamicPageBanIdParams_1 = require("./rules/dynamicPageBanIdParams");
const dynamicPageBanStyleSettersTemp_1 = require("./rules/dynamicPageBanStyleSettersTemp");
const dynamicPageBanSyncMethods_1 = require("./rules/dynamicPageBanSyncMethods");
const dynamicPageBanSyncPropGetters_1 = require("./rules/dynamicPageBanSyncPropGetters");
const dynamicPageBanSyncPropSetters_1 = require("./rules/dynamicPageBanSyncPropSetters");
const dynamicPageFindMethodAdvice_1 = require("./rules/dynamicPageFindMethodAdvice");
function rulesetWithSeverity(severity, rules) {
    return Object.keys(rules).reduce((acc, name) => {
        acc[`@figma/figma-plugins/${name}`] = severity;
        return acc;
    }, {});
}
const dynamicPageErrs = {
    'await-requires-async': awaitRequiresAsync_1.awaitRequiresAsync,
    'dynamic-page-ban-id-params': dynamicPageBanIdParams_1.dynamicPageBanIdParams,
    'dynamic-page-ban-style-setters-temp': dynamicPageBanStyleSettersTemp_1.dynamicPageBanStyleSettersTemp,
    'dynamic-page-ban-sync-methods': dynamicPageBanSyncMethods_1.dynamicPageBanSyncMethods,
    'dynamic-page-ban-sync-prop-getters': dynamicPageBanSyncPropGetters_1.dynamicPageBanSyncPropGetters,
    'dynamic-page-ban-sync-prop-setters': dynamicPageBanSyncPropSetters_1.dynamicPageBanSyncPropSetters,
};
const dynamicePageAdvice = {
    'dynamic-page-documentchange-event-advice': dynamicPageDocumentchangeEventAdvice_1.dynamicPageDocumentchangeEventAdvice,
    'dynamic-page-find-method-advice': dynamicPageFindMethodAdvice_1.dynamicPageFindMethodAdvice,
};
// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.
exports.rules = Object.assign(Object.assign({}, dynamicPageErrs), dynamicePageAdvice);
exports.configs = {
    'dynamic-page': {
        plugins: ['@figma/figma-plugins'],
        rules: Object.assign(Object.assign({}, rulesetWithSeverity('error', dynamicPageErrs)), rulesetWithSeverity('warn', dynamicePageAdvice)),
    },
    'dynamic-page-problems-only': {
        plugins: ['@figma/figma-plugins'],
        rules: Object.assign({}, rulesetWithSeverity('error', dynamicPageErrs)),
    },
};
