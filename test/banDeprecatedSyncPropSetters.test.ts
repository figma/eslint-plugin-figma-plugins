import { banDeprecatedSyncPropSetters } from '../src/rules/banDeprecatedSyncPropSetters'
import { ruleTester } from './testUtil'

const types = `
interface BlendMixin {
  effectStyleId: string
}

interface DefaultShapeMixin extends BlendMixin {}

interface LineNode extends DefaultShapeMixin {}
`

ruleTester().run('ban-deprecated-sync-prop-setters', banDeprecatedSyncPropSetters, {
  valid: [
    {
      code: `
${types}
function func(notLineNode: NotLineNode) {
  notLineNode.effectStyleId = '1'
}
`,
    },
    {
      code: `
${types}      
function func(lineNode: LineNode) {
  lineNode.someOtherProp = '1'
}
`,
    },
  ],
  invalid: [
    {
      code: `
${types}
function func(lineNode: LineNode) {
  lineNode.effectStyleId = '1'
}
`,
      output: `
${types}
function func(lineNode: LineNode) {
  await lineNode.setEffectStyleIdAsync('1')
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(getLineNode: () => LineNode) {
  getLineNode().effectStyleId = '1'
}
`,
      output: `
${types}
function func(getLineNode: () => LineNode) {
  await getLineNode().setEffectStyleIdAsync('1')
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(lineNode: LineNode) {
  (lineNode).effectStyleId = '1'
}
`,
      output: `
${types}
function func(lineNode: LineNode) {
  await lineNode.setEffectStyleIdAsync('1')
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(a: LineNode, b: LineNode) {
  ;(true ? a : b).effectStyleId = '1'
}
`,
      output: `
${types}
function func(a: LineNode, b: LineNode) {
  ;await (true ? a : b).setEffectStyleIdAsync('1')
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
  ],
})
