import { dynamicPageBanIdParams } from '../src/rules/dynamicPageBanIdParams'
import { ruleTester } from './testUtil'

const types = `
interface BaseNode {}

interface VariablesAPI {
  createVariable(name: string, collectionId: string, resolvedType: string): void
}
`

ruleTester().run('dynamicPageBanIdParams', dynamicPageBanIdParams, {
  valid: [
    {
      code: `
${types}
function func(notVariables: NotVariablesAPI) {
  notVariables.createVariable('name', '123')
}
`,
    },
    {
      code: `
${types}
function func(variables: VariablesAPI) {
  variables.nonDeprecatedMethod('123')
}
`,
    },
  ],
  invalid: [
    {
      code: `
${types}
function func(variables: VariablesAPI) {
  variables.createVariable('name', '123', 'type')
}
`,
      output: `
${types}
function func(variables: VariablesAPI) {
  variables.createVariable('name', await figma.variables.getVariableCollectionByIdAsync('123'), 'type')
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
    {
      code: `
${types}
function func(variables: VariablesAPI, getID: () => string) {
  variables.createVariable('name', getID(), 'type')
}
`,
      output: `
${types}
function func(variables: VariablesAPI, getID: () => string) {
  variables.createVariable('name', await figma.variables.getVariableCollectionByIdAsync(getID()), 'type')
}
`,
      errors: [{ messageId: 'useReplacement' }],
    },
  ],
})
