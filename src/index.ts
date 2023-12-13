import { dynamicPageBanSyncPropGetters } from './rules/dynamicPageBanSyncPropGetters'
import { dynamicPageBanSyncMethods } from './rules/dynamicPageBanSyncMethods'
import { dynamicPageBanSyncPropSetters } from './rules/dynamicPageBanSyncPropSetters'
import { awaitRequiresAsync } from './rules/awaitRequiresAsync'
import { dynamicPageBanDocumentchangeEvent } from './rules/dynamicPageBanDocumentchangeEvent'
import { dynamicPageBanIdParams } from './rules/dynamicPageBanIdParams'

function ruleset(type: string, rules: Record<string, unknown>): Record<string, string> {
  return Object.keys(rules).reduce((acc, name) => {
    acc[`@figma/figma-plugins/${name}`] = type
    return acc
  }, {} as Record<string, string>)
}

const dynamicPageRules: Record<string, unknown> = {
  'await-requires-async': awaitRequiresAsync,
  'dynamic-page-ban-documentchange-event': dynamicPageBanDocumentchangeEvent,
  'dynamic-page-ban-id-params': dynamicPageBanIdParams,
  'dynamic-page-ban-sync-methods': dynamicPageBanSyncMethods,
  'dynamic-page-ban-sync-prop-getters': dynamicPageBanSyncPropGetters,
  'dynamic-page-ban-sync-prop-setters': dynamicPageBanSyncPropSetters,
}

// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.

export const rules: unknown = { ...dynamicPageRules }

export const configs: unknown = {
  'dynamic-page': {
    plugins: ['@figma/figma-plugins'],
    rules: { ...ruleset('error', dynamicPageRules) },
  },
}
