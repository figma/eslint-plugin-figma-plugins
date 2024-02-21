import { banDeprecatedSyncPropGetters } from '../src/rules/banDeprecatedSyncPropGetters'
import { ruleTester } from './testUtil'

const types = `
interface InstanceNode {}

interface ComponentNode {
  instances: InstanceNode[]
}
`

ruleTester().run('ban-deprecated-sync-prop-getters', banDeprecatedSyncPropGetters, {
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
    {
      // assignment expressions should be safe
      code: `
${types}
function func(node: InstanceNode, comp: ComponentNode) {
  node.mainComponent = comp
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
