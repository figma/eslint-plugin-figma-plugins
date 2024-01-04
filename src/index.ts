import { awaitRequiresAsync } from './rules/awaitRequiresAsync'
import { dynamicPageBanDocumentchangeEvent } from './rules/dynamicPageBanDocumentchangeEvent'
import { dynamicPageBanIdParams } from './rules/dynamicPageBanIdParams'
import { dynamicPageBanStyleSettersTemp } from './rules/dynamicPageBanStyleSettersTemp'
import { dynamicPageBanSyncMethods } from './rules/dynamicPageBanSyncMethods'
import { dynamicPageBanSyncPropGetters } from './rules/dynamicPageBanSyncPropGetters'
import { dynamicPageBanSyncPropSetters } from './rules/dynamicPageBanSyncPropSetters'
import { dynamicPageFindMethodReminder } from './rules/dynamicPageFindMethodReminder'

function rulesetWithSeverity(
  severity: 'error' | 'warn',
  rules: Record<string, unknown>,
): Record<string, string> {
  return Object.keys(rules).reduce((acc, name) => {
    acc[`@figma/figma-plugins/${name}`] = severity
    return acc
  }, {} as Record<string, string>)
}

const dynamicPageErrs: Record<string, unknown> = {
  'await-requires-async': awaitRequiresAsync,
  'dynamic-page-ban-documentchange-event': dynamicPageBanDocumentchangeEvent,
  'dynamic-page-ban-id-params': dynamicPageBanIdParams,
  // TODO: release this rule to beta audience once we've officially announced the deprecation
  // 'dynamic-page-ban-style-setters-temp': dynamicPageBanStyleSettersTemp,
  'dynamic-page-ban-sync-methods': dynamicPageBanSyncMethods,
  'dynamic-page-ban-sync-prop-getters': dynamicPageBanSyncPropGetters,
  'dynamic-page-ban-sync-prop-setters': dynamicPageBanSyncPropSetters,
}

const dynamicePageWarnings: Record<string, unknown> = {
  'dynamic-page-find-method-reminder': dynamicPageFindMethodReminder,
}

// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.

export const rules: unknown = {
  ...dynamicPageErrs,
  ...dynamicePageWarnings,
}

export const configs: unknown = {
  'dynamic-page': {
    plugins: ['@figma/figma-plugins'],
    rules: {
      ...rulesetWithSeverity('error', dynamicPageErrs),
      ...rulesetWithSeverity('warn', dynamicePageWarnings),
    },
  },
}
