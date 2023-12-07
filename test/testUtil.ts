import { RuleTester } from '@typescript-eslint/utils/ts-eslint'

export function ruleTester(): RuleTester {
  return new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
  })
}
