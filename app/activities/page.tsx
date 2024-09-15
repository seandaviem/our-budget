import { getActivities } from "@/helpers/prisma/getActivities";
import ActivityTable from "@/components/ActivityTable";
import { Metadata } from "next"
import Link from "next/link";
import { getCategories } from "@/helpers/prisma/getCategories";
import { getPaymentMethods } from "@/helpers/prisma/getPaymentMethods";
import { sortCategories } from "../manage/categories/categoryHelpers";
import DateRangeToggle from "@/components/DateRangeToggle";
import { getDateRangeObj } from "@/helpers/getDateRangeObj";
import { Toaster } from "react-hot-toast";


export const metadata: Metadata = {
    title: 'Activities | Our Budget',
    description: 'View activities in your current portal.',
}

export default async function Activities({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {

    const dateRangeObj = getDateRangeObj(searchParams);

    const categoryOptions = await getCategories();
    const sortedCategoryOptions = sortCategories(categoryOptions);
    const paymentMethodOptions = await getPaymentMethods();
    const activities = await getActivities(-1, dateRangeObj);


    return (
        <>
            <main className="container mx-auto pb-48 max-sm:px-5">
                <div className="text-white mt-10">
                    <Link href="/activities/add-activity" className="btn btn-primary mb-3">
                        Add Activity
                        <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                    <div className="my-5"><DateRangeToggle dateRangeObj={dateRangeObj} /></div>
                    <p className="mb-3">Activity:</p>
                    {activities.length > 0 ? (
                        <ActivityTable
                            activities={activities}
                            categoryOptions={sortedCategoryOptions}
                            paymentMethodOptions={paymentMethodOptions}
                            showPagintion={false}
                        />
                    ) : (
                        <p className="text-sm">No activities found.</p>
                    )}
                </div>
            </main>
            <Toaster position="top-center" />
        </>
    );
}
