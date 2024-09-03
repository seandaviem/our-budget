import { SortedActivitiesObj } from "./sortActivities";
import { ActivityTypeEnum } from "@/budget-types";

// TODO: Implement ActivityTypeEnum when refactoring this later
// returns the keys of the sortedActivities["2"]["categories"] object sorted by the total expense
export function sortExpenseCategories(sortedActivities: SortedActivitiesObj, numResults = -1, order: 'asc' | 'desc' = 'desc') {
    const sortedExpenseCategories = Object.keys(sortedActivities[ActivityTypeEnum.Expense]["categories"]).sort((a: string, b: string): number => {
        
        const reimbursementA = sortedActivities[ActivityTypeEnum.Expense]["categories"][parseInt(a)].reimbursementTotal;
        const expenseA = sortedActivities[ActivityTypeEnum.Expense]["categories"][parseInt(a)].total - reimbursementA;

        const reimbursementB = sortedActivities[ActivityTypeEnum.Expense]["categories"][parseInt(b)].reimbursementTotal;
        const expenseB = sortedActivities[ActivityTypeEnum.Expense]["categories"][parseInt(b)].total - reimbursementB;

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