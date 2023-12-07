import { awaitRequiresAsync } from '../src/rules/awaitRequiresAsync'
import { ruleTester } from './testUtil'

ruleTester().run('await-requires-async', awaitRequiresAsync, {
  valid: [
    {
      code: `
function foo() {
  async function bar() {
    await baz()
  }

  qux(async () => {
    await baz()
  })

  qux(async function() {
    await baz()
  })
}
`,
    },
  ],
  invalid: [
    {
      code: `
function foo() {
  await bar()
}
`,
      output: `
async function foo() {
  await bar()
}
`,
      errors: [{ messageId: 'requiresAsync' }],
    },
    {
      // multple awaits
      code: `
function foo() {
  await bar()
  await baz()
}
`,
      output: `
async function foo() {
  await bar()
  await baz()
}
`,
      errors: [{ messageId: 'requiresAsync' }],
    },
    {
      // nested awaits
      code: `
function foo() {
  function bar() {
    await baz()
  }

  qux(() => {
    await baz()
  })

  qux(function() {
    await baz()
  })
}
`,
      output: `
function foo() {
  async function bar() {
    await baz()
  }

  qux(async () => {
    await baz()
  })

  qux(async function() {
    await baz()
  })
}
`,
      errors: [
        { messageId: 'requiresAsync' },
        { messageId: 'requiresAsync' },
        { messageId: 'requiresAsync' },
      ],
    },
  ],
})
