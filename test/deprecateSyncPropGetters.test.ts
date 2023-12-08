import { deprecateSyncPropGetters } from '../src/rules/deprecateSyncPropGetters'
import { ruleTester } from './testUtil'

const types = `
interface InstanceNode {}

interface ComponentNode {
  instances: InstanceNode[]
}
`

ruleTester().run('deprecate-sync-prop-getters', deprecateSyncPropGetters, {
  valid: [
    {
      code: `
${types}
function func(notComponentNode: NotComponentNode) {
  notComponentNode.instances
}
`,
    },
    {
      code: `
${types}
function func(componentNode: ComponentNode) {
  componentNode.someOtherProp
}
`,
    },
  ],
  invalid: [
    {
      code: `
${types}
function func(componentNode: ComponentNode) {
  componentNode.instances
}
`,
      output: `
${types}
function func(componentNode: ComponentNode) {
  await componentNode.getInstancesAsync()
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(getComponentNode: () => ComponentNode) {
  getComponentNode().instances
}
    `,
      output: `
${types}
function func(getComponentNode: () => ComponentNode) {
  await getComponentNode().getInstancesAsync()
}
    `,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(componentNode: ComponentNode) {
  (componentNode).instances
}
`,
      output: `
${types}
function func(componentNode: ComponentNode) {
  await componentNode.getInstancesAsync()
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(a: ComponentNode, b: ComponentNode) {
  ;(true ? a : b).instances
}
    `,
      output: `
${types}
function func(a: ComponentNode, b: ComponentNode) {
  ;await (true ? a : b).getInstancesAsync()
}
    `,
      errors: [{ messageId: 'useReplacement' }],
    },
  ],
})
