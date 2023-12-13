import { dynamicPageFindMethodReminder } from '../src/rules/dynamicPageFindMethodReminder'
import { ruleTester } from './testUtil'

const types = `
interface BaseNode {}

interface DocumentNode {
  findAll()
  findAllWithCriteria()
  findChild()
  findChildren()
  findOne()
}
`

ruleTester().run('dynamic-page-ban-sync-methods', dynamicPageFindMethodReminder, {
  valid: [
    {
      code: `
${types}
function func(notDoc: NotDocumentNode) {
  notDoc.findAll()
}
`,
    },
    {
      code: `
${types}
function func(doc: DocumentNode) {
  doc.appendChild()
}
`,
    },
  ],
  invalid: [
    {
      code: `
${types}
function func(doc: DocumentNode) {
  doc.findAll()
}
`,
      errors: [{ messageId: 'reminder' }],
    },
    {
      code: `
${types}
function func(doc: DocumentNode) {
  doc.findOne()
}
`,
      errors: [{ messageId: 'reminder' }],
    },
  ],
})
