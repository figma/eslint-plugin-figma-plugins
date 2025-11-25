import { awaitRequiresAsync } from './rules/awaitRequiresAsync'
import { dynamicPageDocumentchangeEventAdvice } from './rules/dynamicPageDocumentchangeEventAdvice'
import { banDeprecatedIdParams } from './rules/banDeprecatedIdParams'
import { banDeprecatedSyncMethods } from './rules/banDeprecatedSyncMethods'
import { banDeprecatedSyncPropGetters } from './rules/banDeprecatedSyncPropGetters'
import { banDeprecatedSyncPropSetters } from './rules/banDeprecatedSyncPropSetters'
import { dynamicPageFindMethodAdvice } from './rules/dynamicPageFindMethodAdvice'
import { constrainProportionsReplacedByTargetAspectRatioAdvice } from './rules/constrainProportionsReplacedByTargetAspectRatioAdvice'

function rulesetWithSeverity(
  severity: 'error' | 'warn',
  rules: Record<string, unknown>,
): Record<string, string> {
  return Object.keys(rules).reduce((acc, name) => {
    acc[`@figma/figma-plugins/${name}`] = severity
    return acc
  }, {} as Record<string, string>)
}

const errRules: Record<string, unknown> = {
  'await-requires-async': awaitRequiresAsync,
  'ban-deprecated-id-params': banDeprecatedIdParams,
  'ban-deprecated-sync-methods': banDeprecatedSyncMethods,
  'ban-deprecated-sync-prop-getters': banDeprecatedSyncPropGetters,
  'ban-deprecated-sync-prop-setters': banDeprecatedSyncPropSetters,
}

const dynamicePageAdvice: Record<string, unknown> = {
  'dynamic-page-documentchange-event-advice': dynamicPageDocumentchangeEventAdvice,
  'dynamic-page-find-method-advice': dynamicPageFindMethodAdvice,
}

const warnRules: Record<string, unknown> = {
  ...dynamicePageAdvice,
  'constrain-proportions-replaced-by-target-aspect-ratio-advice': constrainProportionsReplacedByTargetAspectRatioAdvice
}

// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.

export const rules: unknown = {
  ...errRules,
  ...warnRules
}

const recommendedRules = {
  ...rulesetWithSeverity('error', errRules),
  ...rulesetWithSeverity('warn', warnRules),
}

const recommendedProblemsOnlyRules = {
  ...rulesetWithSeverity('error', errRules),
}

// Legacy config format (for backwards compatibility)
export const configs: unknown = {
  recommended: {
    plugins: ['@figma/figma-plugins'],
    rules: recommendedRules,
  },
  'recommended-problems-only': {
    plugins: ['@figma/figma-plugins'],
    rules: recommendedProblemsOnlyRules,
  },
}

// Flat config format
const plugin = {
  meta: {
    name: '@figma/eslint-plugin-figma-plugins',
    version: '1.0.0',
  },
  rules: {
    ...errRules,
    ...warnRules,
  },
}

// Flat config presets
export const flatConfigs = {
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
}