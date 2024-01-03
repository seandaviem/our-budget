import { getGlobalActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import { getCategories } from "@/helpers/prisma/getCategories";
import { getPaymentMethods } from "@/helpers/prisma/getPaymentMethods";
import { ActivitiesObj, getActivities } from "@/helpers/prisma/getActivities";
import AddActivityForm from "./AddActivityForm";
import { sortCategories } from "@/app/manage/categories/categoryHelpers";
import { Toaster } from "react-hot-toast";
import ActivityTable from "@/components/ActivityTable";

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
                    <ActivityTable activities={activities} />
                </div>
            </main>
            <Toaster position="top-center" />
        </>
    );
}