import { awaitRequiresAsync } from './rules/awaitRequiresAsync'
import { dynamicPageDocumentchangeEventAdvice } from './rules/dynamicPageDocumentchangeEventAdvice'
import { banDeprecatedIdParams } from './rules/banDeprecatedIdParams'
import { banDeprecatedSyncMethods } from './rules/banDeprecatedSyncMethods'
import { banDeprecatedSyncPropGetters } from './rules/banDeprecatedSyncPropGetters'
import { banDeprecatedSyncPropSetters } from './rules/banDeprecatedSyncPropSetters'
import { dynamicPageFindMethodAdvice } from './rules/dynamicPageFindMethodAdvice'

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

// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.

export const rules: unknown = {
  ...errRules,
  ...dynamicePageAdvice,
}

export const configs: unknown = {
  recommended: {
    plugins: ['@figma/figma-plugins'],
    rules: {
      ...rulesetWithSeverity('error', errRules),
      ...rulesetWithSeverity('warn', dynamicePageAdvice),
    },
  },
  'recommended-problems-only': {
    plugins: ['@figma/figma-plugins'],
    rules: {
      ...rulesetWithSeverity('error', errRules),
    },
  },
}
