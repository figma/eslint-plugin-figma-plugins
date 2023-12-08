import { deprecateDocumentChangeEvent } from '../src/rules/deprecateDocumentChangeEvent'
import { ruleTester } from './testUtil'

ruleTester().run('deprecate-document-change-event', deprecateDocumentChangeEvent, {
  valid: [
    {
      code: `
function func(figma: PluginAPI)  {
  figma.on('selectionchange')
}
`,
    },
    {
      code: `
function func(figma: PluginAPI)  {
  figma.once('selectionchange')
}
`,
    },
    {
      code: `
function func(figma: PluginAPI)  {
  figma.off('selectionchange')
}
`,
    },
    {
      code: `
function func(notFigma: NotPluginAPI) {
  notFigma.on('documentchange')
}
`,
    },
  ],
  invalid: [
    {
      code: `
function func(figma: PluginAPI)  {
  figma.on('documentchange')
}
`,
      errors: [{ messageId: 'onReplacement' }],
    },
    {
      code: `
function func(figma: PluginAPI)  {
  figma.once('documentchange')
}
`,
      errors: [{ messageId: 'onceReplacement' }],
    },
    {
      code: `
function func(figma: PluginAPI)  {
  figma.off('documentchange')
}
`,
      errors: [{ messageId: 'offReplacement' }],
    },
  ],
})
