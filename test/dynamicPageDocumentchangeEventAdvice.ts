import { dynamicPageDocumentchangeEventAdvice } from '../src/rules/dynamicPageDocumentchangeEventAdvice'
import { ruleTester } from './testUtil'

const types = `
interface PluginAPI {
  on(event: string): void
  once(event: string): void
  off(event: string): void
}
`

ruleTester().run('ban-deprecated-documentchange-event', dynamicPageDocumentchangeEventAdvice, {
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
      errors: [{ messageId: 'advice' }],
    },
    {
      code: `
${types}
function func(figma: PluginAPI)  {
  figma.once('documentchange')
}
`,
      errors: [{ messageId: 'advice' }],
    },
    {
      code: `
${types}
function func(figma: PluginAPI)  {
  figma.off('documentchange')
}
`,
      errors: [{ messageId: 'advice' }],
    },
  ],
})
