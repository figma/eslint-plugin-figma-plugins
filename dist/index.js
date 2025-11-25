"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flatConfigs = exports.configs = exports.rules = void 0;
const awaitRequiresAsync_1 = require("./rules/awaitRequiresAsync");
const dynamicPageDocumentchangeEventAdvice_1 = require("./rules/dynamicPageDocumentchangeEventAdvice");
const banDeprecatedIdParams_1 = require("./rules/banDeprecatedIdParams");
const banDeprecatedSyncMethods_1 = require("./rules/banDeprecatedSyncMethods");
const banDeprecatedSyncPropGetters_1 = require("./rules/banDeprecatedSyncPropGetters");
const banDeprecatedSyncPropSetters_1 = require("./rules/banDeprecatedSyncPropSetters");
const dynamicPageFindMethodAdvice_1 = require("./rules/dynamicPageFindMethodAdvice");
const constrainProportionsReplacedByTargetAspectRatioAdvice_1 = require("./rules/constrainProportionsReplacedByTargetAspectRatioAdvice");
function rulesetWithSeverity(severity, rules) {
    return Object.keys(rules).reduce((acc, name) => {
        acc[`@figma/figma-plugins/${name}`] = severity;
        return acc;
    }, {});
}
const errRules = {
    'await-requires-async': awaitRequiresAsync_1.awaitRequiresAsync,
    'ban-deprecated-id-params': banDeprecatedIdParams_1.banDeprecatedIdParams,
    'ban-deprecated-sync-methods': banDeprecatedSyncMethods_1.banDeprecatedSyncMethods,
    'ban-deprecated-sync-prop-getters': banDeprecatedSyncPropGetters_1.banDeprecatedSyncPropGetters,
    'ban-deprecated-sync-prop-setters': banDeprecatedSyncPropSetters_1.banDeprecatedSyncPropSetters,
};
const dynamicePageAdvice = {
    'dynamic-page-documentchange-event-advice': dynamicPageDocumentchangeEventAdvice_1.dynamicPageDocumentchangeEventAdvice,
    'dynamic-page-find-method-advice': dynamicPageFindMethodAdvice_1.dynamicPageFindMethodAdvice,
};
const warnRules = Object.assign(Object.assign({}, dynamicePageAdvice), { 'constrain-proportions-replaced-by-target-aspect-ratio-advice': constrainProportionsReplacedByTargetAspectRatioAdvice_1.constrainProportionsReplacedByTargetAspectRatioAdvice });
// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.
exports.rules = Object.assign(Object.assign({}, errRules), warnRules);
const recommendedRules = Object.assign(Object.assign({}, rulesetWithSeverity('error', errRules)), rulesetWithSeverity('warn', warnRules));
const recommendedProblemsOnlyRules = Object.assign({}, rulesetWithSeverity('error', errRules));
// Legacy config format (for backwards compatibility)
exports.configs = {
    recommended: {
        plugins: ['@figma/figma-plugins'],
        rules: recommendedRules,
    },
    'recommended-problems-only': {
        plugins: ['@figma/figma-plugins'],
        rules: recommendedProblemsOnlyRules,
    },
};
// Flat config format
const plugin = {
    meta: {
        name: '@figma/eslint-plugin-figma-plugins',
        version: '1.0.0',
    },
    rules: Object.assign(Object.assign({}, errRules), warnRules),
};
// Flat config presets
exports.flatConfigs = {
    recommended: {
        name: '@figma/eslint-plugin-figma-plugins/recommended',
        plugins: {
            '@figma/figma-plugins': plugin,
        },
        rules: recommendedRules,
    },
    'recommended-problems-only': {
        name: '@figma/eslint-plugin-figma-plugins/recommended-problems-only',
        plugins: {
            '@figma/figma-plugins': plugin,
        },
        rules: recommendedProblemsOnlyRules,
    },
};
