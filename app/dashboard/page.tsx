import { Metadata } from "next";
import DateRangeToggle from "@/components/DateRangeToggle";
import { getDateRangeObj } from "@/helpers/getDateRangeObj";
import { getActivities } from "@/helpers/prisma/getActivities";
import { sortActivities } from "@/helpers/sortActivities";

export const metadata: Metadata = {
    title: "Dashboard | Our Budget",
    description: "View reports and othe stats for your current budget portal."
}

export default async function Dashboard({ searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const dateRangeObj = getDateRangeObj(searchParams);
    const activities = await getActivities(-1, dateRangeObj);

    const sortedActivities = sortActivities(activities);

    return (
        <main className="container mx-auto pb-48">
            <h1 className="text-white">Dashboard</h1>
            <DateRangeToggle dateRangeObj={dateRangeObj} />
            <pre>{JSON.stringify(sortedActivities, null, 2)}</pre>
        </main>
    );
}