import { RowData } from '@/budget-types';

interface SortPayload {
    sortBy: keyof RowData | null;
    reversed: boolean;
}

export function sortRowData(data: RowData[], payload: SortPayload) {
    const { sortBy, reversed } = payload;

    if (!sortBy) {
        return data;
    }

    return [...data].sort((a, b) => {
        if (typeof a[sortBy] === 'string') {
            return reversed ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
        }

        return reversed ? (b[sortBy] as any) - (a[sortBy] as any) : (a[sortBy] as any) - (b[sortBy] as any)
    });
  }