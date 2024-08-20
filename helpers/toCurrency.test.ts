import { expect, test } from 'vitest'
import { toCurrency } from '../toCurrency'

test('toCurrency', () => {
  expect(toCurrency(1234)).toBe('$1,234.00')
  expect(toCurrency(1234.56)).toBe('$1,234.56')
  expect(toCurrency(1234.567)).toBe('$1,234.57')
});