import { dynamicPageBanDocumentchangeEvent } from '../src/rules/dynamicPageBanDocumentchangeEvent'
import { ruleTester } from './testUtil'

const types = `
interface PluginAPI {
  on(event: string): void
  once(event: string): void
  off(event: string): void
}
`

ruleTester().run('dynamic-page-ban-documentchange-event', dynamicPageBanDocumentchangeEvent, {
  valid: [
    {
      code: `
${types}
function func(figma: PluginAPI)  {
  figma.on('selectionchange')
}
`,
    },
    {
      code: `
${types}
function func(figma: PluginAPI)  {
  figma.once('selectionchange')
}
`,
    },
    {
      code: `
${types}
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
${types}
function func(figma: PluginAPI)  {
  figma.on('documentchange')
}
`,
      errors: [{ messageId: 'onReplacement' }],
    },
    {
      code: `
${types}
function func(figma: PluginAPI)  {
  figma.once('documentchange')
}
`,
      errors: [{ messageId: 'onceReplacement' }],
    },
    {
      code: `
${types}
function func(figma: PluginAPI)  {
  figma.off('documentchange')
}
`,
      errors: [{ messageId: 'offReplacement' }],
    },
  ],
})
