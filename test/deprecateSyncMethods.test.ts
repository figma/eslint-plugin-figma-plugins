import { deprecateSyncMethods } from '../src/rules/deprecateSyncMethods'
import { ruleTester } from './testUtil'

const types = `
interface BaseNode {}

interface PluginAPI {
  getNodeById(id: string): BaseNode | null
}
`

ruleTester().run('deprecate-sync-methods', deprecateSyncMethods, {
  valid: [
    {
      code: `
${types}
function func(notFigma: NotPluginAPI) {
  notFigma.getNodeById('123')
}
    `,
    },
    {
      code: `
${types}
function func(figma: PluginApi) {
  figma.nonDeprecatedMethod('123')
}
    `,
    },
  ],
  invalid: [
    {
      code: `
${types}
function func(figma: PluginAPI) {
  figma.getNodeById('123')
}
    `,
      output: `
${types}
function func(figma: PluginAPI) {
  await figma.getNodeByIdAsync('123')
}
    `,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(getFigma: () => PluginAPI) {
  getFigma().getNodeById('123')
}
    `,
      output: `
${types}
function func(getFigma: () => PluginAPI) {
  await getFigma().getNodeByIdAsync('123')
}
    `,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(figma: PluginAPI) {
  (figma).getNodeById('123')
}
`,
      output: `
${types}
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
${types}
function func(a: PluginAPI, b: PluginAPI) {
  ;(true ? a : b).getNodeById('123')
}
    `,
      output: `
${types}
function func(a: PluginAPI, b: PluginAPI) {
  ;await (true ? a : b).getNodeByIdAsync('123')
}
    `,
      errors: [{ messageId: 'useReplacement' }],
    },
  ],
})
