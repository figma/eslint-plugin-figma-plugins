import { deprecateSyncPropGetters } from './rules/deprecateSyncPropGetters'
import { deprecateSyncMethods } from './rules/deprecateSyncMethods'
import { deprecateSyncPropSetters } from './rules/deprecateSyncPropSetters'
import { awaitRequiresAsync } from './rules/awaitRequiresAsync'
import { deprecateDocumentChangeEvent } from './rules/deprecateDocumentChangeEvent'
import { deprecateIdParams } from './rules/deprecateIdParams'

function ruleset(type: string, rules: Record<string, unknown>): Record<string, string> {
  return Object.keys(rules).reduce((acc, name) => {
    acc[`@figma/figma-plugins/${name}`] = type
    return acc
  }, {} as Record<string, string>)
}

const errorRules: Record<string, unknown> = {
  'await-requires-async': awaitRequiresAsync,
  'deprecate-document-change-event': deprecateDocumentChangeEvent,
  'deprecate-id-params': deprecateIdParams,
  'deprecate-sync-methods': deprecateSyncMethods,
  'deprecate-sync-prop-getters': deprecateSyncPropGetters,
  'deprecate-sync-prop-setters': deprecateSyncPropSetters,
}

// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.

export const rules: unknown = { ...errorRules }

export const configs: unknown = {
  recommended: {
    plugins: ['@figma/figma-plugins'],
    rules: { ...ruleset('error', errorRules) },
  },
}
