"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = void 0;
const awaitRequiresAsync_1 = require("./rules/awaitRequiresAsync");
const dynamicPageBanDocumentchangeEvent_1 = require("./rules/dynamicPageBanDocumentchangeEvent");
const dynamicPageBanIdParams_1 = require("./rules/dynamicPageBanIdParams");
const dynamicPageBanSyncMethods_1 = require("./rules/dynamicPageBanSyncMethods");
const dynamicPageBanSyncPropGetters_1 = require("./rules/dynamicPageBanSyncPropGetters");
const dynamicPageBanSyncPropSetters_1 = require("./rules/dynamicPageBanSyncPropSetters");
const dynamicPageFindMethodReminder_1 = require("./rules/dynamicPageFindMethodReminder");
function rulesetWithSeverity(severity, rules) {
    return Object.keys(rules).reduce((acc, name) => {
        acc[`@figma/figma-plugins/${name}`] = severity;
        return acc;
    }, {});
}
const dynamicPageErrs = {
    'await-requires-async': awaitRequiresAsync_1.awaitRequiresAsync,
    'dynamic-page-ban-documentchange-event': dynamicPageBanDocumentchangeEvent_1.dynamicPageBanDocumentchangeEvent,
    'dynamic-page-ban-id-params': dynamicPageBanIdParams_1.dynamicPageBanIdParams,
    'dynamic-page-ban-sync-methods': dynamicPageBanSyncMethods_1.dynamicPageBanSyncMethods,
    'dynamic-page-ban-sync-prop-getters': dynamicPageBanSyncPropGetters_1.dynamicPageBanSyncPropGetters,
    'dynamic-page-ban-sync-prop-setters': dynamicPageBanSyncPropSetters_1.dynamicPageBanSyncPropSetters,
};
const dynamicePageWarnings = {
    'dynamic-page-find-method-reminder': dynamicPageFindMethodReminder_1.dynamicPageFindMethodReminder,
};
// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.
exports.rules = Object.assign(Object.assign({}, dynamicPageErrs), dynamicePageWarnings);
exports.configs = {
    'dynamic-page': {
        plugins: ['@figma/figma-plugins'],
        rules: Object.assign(Object.assign({}, rulesetWithSeverity('error', dynamicPageErrs)), rulesetWithSeverity('warn', dynamicePageWarnings)),
    },
};
