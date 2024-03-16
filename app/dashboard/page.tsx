import { Metadata } from "next";
import DateRangeToggle from "@/components/DateRangeToggle";
import { getDateRangeObj } from "@/helpers/getDateRangeObj";
import { getActivities } from "@/helpers/prisma/getActivities";
import { sortActivities } from "@/helpers/sortActivities";
import Card from "@/components/Card";
import SpendingCategories from "@/components/SpendingCategories";
import { toCurrency } from "@/helpers/toCurrency";
import { sortExpenseCategories } from "@/helpers/sortExpenseCategories";
import { getGlobalActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";

export const metadata: Metadata = {
    title: "Dashboard | Our Budget",
    description: "View reports and othe stats for your current budget portal."
}

export default async function Dashboard({ searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const dateRangeObj = getDateRangeObj(searchParams);
    const activities = await getActivities(-1, dateRangeObj);
    const globalActivityTypes = await getGlobalActivityTypes();
    
    const sortedActivities = sortActivities(activities, globalActivityTypes);
    
    const income = sortedActivities["1"].total;
    const expenses = sortedActivities["2"].total - sortedActivities["3"].total;
    const savings = income - expenses;

    const sortedExpenseCategories = sortExpenseCategories(sortedActivities);

    // for (let i = 0; i < sortedExpenseCategories.length; i++) {
    //     const key = sortedExpenseCategories[i];
    //     const category = sortedActivities["2"]["categories"][parseInt(key)];

    //     console.log(`${category.name}: ${toCurrency(category.total)}`);
    // }


    return (
        <main className="container mx-auto pb-48 px-8">
            <h1 className="text-white">Dashboard</h1>
            <DateRangeToggle dateRangeObj={dateRangeObj} />
            <div className="grid auto-rows-fr sm:grid-cols-3 xs:grid-cols-2 justify-center gap-5 my-10">
                <Card>
                    <h2 className="text-white">Total Income</h2>
                    <p className="text-green-500">{toCurrency(income)}</p>
                </Card>
                <Card>
                    <h2 className="text-white">Total Expenses</h2>
                    <p className="text-red-500">{toCurrency(expenses)}</p>
                </Card>
                <Card>
                    <h2 className="text-white">Total Savings</h2>
                    <p className={`${savings <= 0 ? 'text-red-500' : 'text-green-500'}`}>{toCurrency(savings)}</p>
                </Card>
            </div>
            { /* TODO: MOVE TO SEPARATE COMPONENT */ }
            <h2 className="text-white mb-3">Top Spending Categories:</h2>
            <SpendingCategories 
                sortedExpenseCategories={sortedExpenseCategories} 
                sortedActivities={sortedActivities} 
            />
        </main>
    );
}