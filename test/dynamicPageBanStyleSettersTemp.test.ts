import { dynamicPageBanStyleSettersTemp } from '../src/rules/dynamicPageBanStyleSettersTemp'
import { ruleTester } from './testUtil'

const types = `
interface BlendMixin {}

interface DefaultShapeMixin extends BlendMixin {}

interface LineNode extends DefaultShapeMixin {}
`

ruleTester().run('dynamic-page-ban-style-setters-temp', dynamicPageBanStyleSettersTemp, {
  valid: [
    {
      code: `
${types}
function func(notLineNode: NotLineNode) {
  notLineNode.setStyle({})
}
`,
    },
    {
      code: `
${types}      
function func(lineNode: LineNode) {
  lineNode.someOtherSetter({})
}
`,
    },
  ],
  invalid: [
    {
      code: `
${types}
function func(lineNode: LineNode) {
  lineNode.setEffectStyle({})
}
`,
      output: `
${types}
function func(lineNode: LineNode) {
  await lineNode.setEffectStyleIdAsync(({}).id)
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(getLineNode: () => LineNode) {
  getLineNode().setEffectStyle({})
}
`,
      output: `
${types}
function func(getLineNode: () => LineNode) {
  await getLineNode().setEffectStyleIdAsync(({}).id)
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(lineNode: LineNode) {
  lineNode.setEffectStyle(await getStyle())
}
`,
      output: `
${types}
function func(lineNode: LineNode) {
  await lineNode.setEffectStyleIdAsync((await getStyle()).id)
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
  ],
})
