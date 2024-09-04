import { getGlobalActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import { getCategories } from "@/helpers/prisma/getCategories";
import { getPaymentMethods } from "@/helpers/prisma/getPaymentMethods";
import { getActivities } from "@/helpers/prisma/getActivities";
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
            <main className="container mx-auto pb-48 max-sm:px-5">
                <div className="mt-10">
                    <AddActivityForm 
                        activityOptions={activityTypeOptions} 
                        categoryOptions={sortedCategoryOptions} 
                        paymentMethodOptions={paymentMethodOptions} 
                    />
                </div>
                <div className="text-white mt-10">
                    <p>Most Recent Activity:</p>
                    <ActivityTable activities={activities} categoryOptions={sortedCategoryOptions} paymentMethodOptions={paymentMethodOptions} />
                    <div className="mt-5">
                        <Link href="/activities" className="btn btn-primary">View All Activities</Link>
                    </div>
                </div>
            </main>
            <Toaster position="top-center" />
        </>
    );
}