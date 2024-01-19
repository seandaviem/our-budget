import { getGlobalActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import { getCategories } from "@/helpers/prisma/getCategories";
import { getPaymentMethods } from "@/helpers/prisma/getPaymentMethods";
import { ActivitiesObj, getActivities } from "@/helpers/prisma/getActivities";
import AddActivityForm from "./AddActivityForm";
import { sortCategories } from "@/app/manage/categories/categoryHelpers";
import { Toaster } from "react-hot-toast";
import ActivityTable from "@/components/ActivityTable";
import { Metadata } from "next"
import Link from "next/link";

export const metadata: Metadata = {
    title: 'Add Activity | Our Budget',
    description: 'Add an activity to your list.',
}

export default async function AddActivity() {

    const activityTypeOptions = await getGlobalActivityTypes();
    const categoryOptions = await getCategories();
    const sortedCategoryOptions = sortCategories(categoryOptions);
    const paymentMethodOptions = await getPaymentMethods();
    const activities = await getActivities(10);


    return (
        <>
            <main className="container mx-auto pb-48">
                <AddActivityForm activityOptions={activityTypeOptions} categoryOptions={sortedCategoryOptions} paymentMethodOptions={paymentMethodOptions} />
                <div className="text-white mt-10">
                    <p>Most Recent Activity:</p>
                    <ActivityTable activities={activities} categoryOptions={sortedCategoryOptions} paymentMethodOptions={paymentMethodOptions} />
                    <div className="mt-5">
                        <Link href="/activities" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">View All Activities</Link>
                    </div>
                </div>
            </main>
            <Toaster position="top-center" />
        </>
    );
}