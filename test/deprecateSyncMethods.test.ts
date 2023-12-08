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
    // FIXME: this test doesn't work because the ternary resolves to the 'any' type.
    // For some reason, this only happens in tests.
    //     {
    //       code: `
    // function func(a: PluginAPI, b: PluginAPI) {
    //   ;(check() ? a : b).getNodeById('123')
    // }
    // `,
    //       output: `
    // function func(a: PluginAPI, b: PluginAPI) {
    //   ;await (check() ? a : b).getNodeByIdAsync('123')
    // }
    // `,
    //       errors: [{ messageId: 'useReplacement' }],
    //     },
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
  ],
})
