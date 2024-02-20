import { dynamicPageFindMethodAdvice } from '../src/rules/dynamicPageFindMethodAdvice'
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

ruleTester().run('ban-deprecated-sync-methods', dynamicPageFindMethodAdvice, {
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
      errors: [{ messageId: 'advice' }],
    },
    {
      code: `
${types}
function func(doc: DocumentNode) {
  doc.findOne()
}
`,
      errors: [{ messageId: 'advice' }],
    },
  ],
})
