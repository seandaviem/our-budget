import { ActivitiesObj, getActivities } from "@/helpers/prisma/getActivities";
import ActivityTable from "@/components/ActivityTable";
import { Metadata } from "next"
import Link from "next/link";
import { getCategories } from "@/helpers/prisma/getCategories";
import { getGlobalActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import { getPaymentMethods } from "@/helpers/prisma/getPaymentMethods";
import { sortCategories } from "../manage/categories/categoryHelpers";
import DateRangeToggle from "@/components/DateRangeToggle";
import { getDateRangeObj } from "@/helpers/getDateRangeObj";

export const metadata: Metadata = {
    title: 'Activities | Our Budget',
    description: 'View activities in your current portal.',
}

export default async function Activities({ searchParams}: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const dateRangeObj = getDateRangeObj(searchParams);

    const activityTypeOptions = await getGlobalActivityTypes();
    const categoryOptions = await getCategories();
    const sortedCategoryOptions = sortCategories(categoryOptions);
    const paymentMethodOptions = await getPaymentMethods();
    const activities = await getActivities(-1, dateRangeObj);


    return (
        <>
            <main className="container mx-auto pb-48">
                <div className="text-white mt-10">
                    <Link href="/activities/add-activity" className="mb-3 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add Activity
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                    <div className="my-5"><DateRangeToggle dateRangeObj={dateRangeObj} /></div> 
                    <p className="mb-3">Activity:</p> 
                    <ActivityTable activities={activities} categoryOptions={sortedCategoryOptions} paymentMethodOptions={paymentMethodOptions} />
                </div>
            </main>
        </>
    );
}