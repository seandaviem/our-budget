import { getPaymentMethods } from "@/helpers/prisma/getPaymentMethods";
import { sortPaymentMethods } from "./paymentMethodHelpers";
import { Metadata } from "next"
import CategoryListingPage from "@/components/CategoryListingPage/CategoryListingPage";
import { getAllPaymentMethodSelectOptions } from "@/helpers/selectOptionHelpers";
import { addPaymentMethod } from "@/app/actions/addPaymentMethod";
import { updatePaymentMethod } from "@/app/actions/updatePaymentMethod";
import { deletePaymentMethod } from "@/app/actions/deletePaymentMethod";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
    title: 'Manage Payment Methods | Our Budget',
    description: 'Add and remove payment methods to your budget portal',
}


export default async function ManagePaymentMethods() {
    const paymentMethods = await getPaymentMethods();
    const paymentMethodsSorted = sortPaymentMethods(paymentMethods);
    const paymentMethodSelectOptions = getAllPaymentMethodSelectOptions(paymentMethods);

    return (
        <>
            <main className="container mx-auto max-sm:px-5">
                {/* <PaymentMethodsListing paymentMethodsSorted={paymentMethodsSorted} activityTypes={activityTypes} /> */}
                <div className="my-10">
                    <CategoryListingPage 
                        type="Payment Method"
                        data={paymentMethodsSorted} 
                        onAddCategory={addPaymentMethod}
                        onEditCategory={updatePaymentMethod}
                        onDeleteCategory={deletePaymentMethod}
                        reassignOptions={paymentMethodSelectOptions}
                        parentIsEditable={false}
                    />
                </div>
            </main>
            <Toaster />
        </>
    );

}