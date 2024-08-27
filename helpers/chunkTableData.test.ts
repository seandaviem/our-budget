import { expect, test } from 'vitest'
import { chunkTableData } from './chunkTableData';

test.for([
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9], itemsPerPage: 3, expected: [[1, 2, 3], [4, 5, 6], [7, 8, 9]] },
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9], itemsPerPage: 4, expected: [[1, 2, 3, 4], [5, 6, 7, 8], [9]] },
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9], itemsPerPage: 1, expected: [[1], [2], [3], [4], [5], [6], [7], [8], [9]] },
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9], itemsPerPage: 9, expected: [[1, 2, 3, 4, 5, 6, 7, 8, 9]] },
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9], itemsPerPage: 10, expected: [[1, 2, 3, 4, 5, 6, 7, 8, 9]] },
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9], itemsPerPage: 0, expected: [] },
    { data: [1, 2, 3, 4, 5, 6, 7, 8, 9], itemsPerPage: -1, expected: [] },
    { data: [], itemsPerPage: 3, expected: [] },
    { data: [], itemsPerPage: 0, expected: [] },
    { data: [], itemsPerPage: -1, expected: [] },
])('chunkTableData', ({ data, itemsPerPage, expected }) => {
    expect(chunkTableData(data, itemsPerPage)).toEqual(expected);
});
