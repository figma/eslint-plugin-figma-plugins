import { demoRuleA } from './rules/demo-rule-a'

// The type annotations in this file are arbitrary. We include them because we
// use @figma as a type root, and all packages under a type root must emit a
// type declaration file.

export const rules: unknown = {
  'demo-rule-a': demoRuleA,
}

export const configs: unknown = {
  recommended: {
    plugins: ['@figma/figma-plugins'],
    rules: {
      '@figma/figma-plugins/demo-rule-a': 'error',
    },
  },
}
