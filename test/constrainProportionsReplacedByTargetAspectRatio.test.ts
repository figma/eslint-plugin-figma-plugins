import { constrainProportionsReplacedByTargetAspectRatioAdvice } from '../src/rules/constrainProportionsReplacedByTargetAspectRatioAdvice'
import { ruleTester } from './testUtil'

const types = `
interface LayoutMixin {
  constrainProportions: boolean
}

interface DefaultFrameMixin extends LayoutMixin {}

interface FrameNode extends DefaultFrameMixin {}

interface SceneNode extends LayoutMixin {}
`

ruleTester().run('constrain-proportions-replaced-by-target-aspect-ratio', constrainProportionsReplacedByTargetAspectRatioAdvice, {
  valid: [
    {
      code: `
${types}
function func(node: FrameNode) {
  node.someOtherProp = true
}
`,
    },
  ],
  invalid: [
    {
      // Test write case
      code: `
${types}
function func(node: SceneNode) {
  node.constrainProportions = true
}
`,
      errors: [{ messageId: 'writeAdvice' }],
    },
    {
        // Test write case
        code: `
  ${types}
  function func(node: FrameNode) {
    node.constrainProportions = false
  }
  `,
        errors: [{ messageId: 'writeAdvice' }],
      },
    {
      // Test read case
      code: `
${types}
function func(node: SceneNode) {
  const value = node.constrainProportions
}
`,
      errors: [{ messageId: 'readAdvice' }],
    },
  ],
})