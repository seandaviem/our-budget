import { expect, test } from 'vitest';
import { getExcerpt } from './getExcerpt';

test('getExcerpt', () => {
  expect(getExcerpt('This is a sentence.')).toBe('This is a sentence.');
  expect(getExcerpt('Even with limit, this should be the answer.', '', 8)).toBe('Even with limit, this should be the answer.');
  expect(getExcerpt('', 'This should be the answer.', 2)).toBe('This should be the answer.');
  expect(getExcerpt('This is a sentence that will be over the limit of words.', '', 4)).toBe('This is a sentence...');
});