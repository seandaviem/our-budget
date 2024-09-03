import { Metadata } from "next";
import DateRangeToggle from "@/components/DateRangeToggle";
import { getDateRangeObj } from "@/helpers/getDateRangeObj";
import { getActivities } from "@/helpers/prisma/getActivities";
import { sortActivities } from "@/helpers/sortActivities";
import SpendingCategories from "@/components/SpendingCategories/SpendingCategories";
import { sortExpenseCategories } from "@/helpers/sortExpenseCategories";
import { getGlobalActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import SpendingStatSummary from "@/components/SpendingStatSummary/SpendingStatSummary";

export const metadata: Metadata = {
    title: "Dashboard | Our Budget",
    description: "View reports and othe stats for your current budget portal."
}

export default async function Dashboard({ searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const dateRangeObj = getDateRangeObj(searchParams);
    const activities = await getActivities(-1, dateRangeObj);
    const globalActivityTypes = await getGlobalActivityTypes();
    
    const sortedActivities = sortActivities(activities, globalActivityTypes);

    const sortedExpenseCategories = sortExpenseCategories(sortedActivities);

    // for (let i = 0; i < sortedExpenseCategories.length; i++) {
    //     const key = sortedExpenseCategories[i];
    //     const category = sortedActivities["2"]["categories"][parseInt(key)];

    //     console.log(`${category.name}: ${toCurrency(category.total)}`);
    // }


    return (
        <main className="container mx-auto pb-16 px-8">
            <h1 className="text-white">Dashboard</h1>
            <DateRangeToggle dateRangeObj={dateRangeObj} />
            <SpendingStatSummary sortedActivities={sortedActivities} />
            { /* TODO: MOVE TO SEPARATE COMPONENT */ }
            <h2 className="text-white mb-3">Top Spending Categories:</h2>
            <SpendingCategories 
                sortedExpenseCategories={sortedExpenseCategories} 
                sortedActivities={sortedActivities} 
            />
        </main>
    );
}