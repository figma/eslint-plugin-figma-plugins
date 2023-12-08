import { deprecateSyncMethods } from '../src/rules/deprecateSyncMethods'
import { ruleTester } from './testUtil'

ruleTester().run('deprecate-sync-methods', deprecateSyncMethods, {
  valid: [
    {
      code: `
function func(notFigma: NotPluginAPI) {
  notFigma.getNodeById('123')
}
    `,
    },
    {
      code: `
function func(figma: PluginApi) {
  figma.nonDeprecatedMethod('123')
}
    `,
    },
  ],
  invalid: [
    {
      code: `
function func(figma: PluginAPI) {
  figma.getNodeById('123')
}
    `,
      output: `
function func(figma: PluginAPI) {
  await figma.getNodeByIdAsync('123')
}
    `,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
function func(getFigma: () => PluginAPI) {
  getFigma().getNodeById('123')
}
    `,
      output: `
function func(getFigma: () => PluginAPI) {
  await getFigma().getNodeByIdAsync('123')
}
    `,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
function func(figma: PluginAPI) {
  (figma).getNodeById('123')
}
`,
      output: `
function func(figma: PluginAPI) {
  await figma.getNodeByIdAsync('123')
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      // For some reason, the ternary expressions below will evaluate to `any`
      // unless the `PluginAPI` type is defined explicitly.
      code: `
interface PluginAPI {}
function func(a: PluginAPI, b: PluginAPI) {
  ;(true ? a : b).getNodeById('123')
}
    `,
      output: `
interface PluginAPI {}
function func(a: PluginAPI, b: PluginAPI) {
  ;await (true ? a : b).getNodeByIdAsync('123')
}
    `,
      errors: [{ messageId: 'useReplacement' }],
    },
  ],
})
