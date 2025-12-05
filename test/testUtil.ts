import { RuleTester } from '@typescript-eslint/rule-tester'
import * as parser from '@typescript-eslint/parser'
import * as path from 'path'

export function ruleTester(): RuleTester {
  return new RuleTester({
    languageOptions: {
      parser,
      parserOptions: {
        tsconfigRootDir: path.join(__dirname, 'fixture'),
        project: path.join(__dirname, 'fixture', 'tsconfig.json'),
      },
    },
  })
}
