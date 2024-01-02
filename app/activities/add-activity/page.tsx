import { getGlobalActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import { getCategories } from "@/helpers/prisma/getCategories";
import { getPaymentMethods } from "@/helpers/prisma/getPaymentMethods";
import AddActivityForm from "./AddActivityForm";
import { sortCategories } from "@/app/manage/categories/categoryHelpers";

export default async function AddActivity() {

    const activityTypeOptions = await getGlobalActivityTypes();
    const categoryOptions = await getCategories();
    const sortedCategoryOptions = sortCategories(categoryOptions);
    const paymentMethodOptions = await getPaymentMethods();


    return (
        <main className="container mx-auto">
            <AddActivityForm activityOptions={activityTypeOptions} categoryOptions={sortedCategoryOptions} paymentMethodOptions={paymentMethodOptions} />
        </main>
    );
}