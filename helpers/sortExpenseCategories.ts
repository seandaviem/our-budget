import { SortedActivitiesObj } from "./sortActivities";

// returns the keys of the sortedActivities["2"]["categories"] object sorted by the total expense
export function sortExpenseCategories(sortedActivities: SortedActivitiesObj, numResults = -1, order: 'asc' | 'desc' = 'desc') {
    const sortedExpenseCategories = Object.keys(sortedActivities["2"]["categories"]).sort((a: string, b: string): number => {
        const reimbursementA = sortedActivities["3"].categories[parseInt(a)] ? sortedActivities["3"].categories[parseInt(a)].total : 0;
        const expenseA = sortedActivities["2"]["categories"][parseInt(a)].total - reimbursementA;

        const reimbursementB = sortedActivities["3"].categories[parseInt(b)] ? sortedActivities["3"].categories[parseInt(b)].total : 0;
        const expenseB = sortedActivities["2"]["categories"][parseInt(b)].total - reimbursementB;

        if (order === 'asc') {
            return expenseA - expenseB;
        }

        return expenseB - expenseA;
    });

    if (numResults > 0) {
        return sortedExpenseCategories.slice(0, numResults);
    }

    return sortedExpenseCategories;
} 