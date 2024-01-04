import PaymentMethodsListing from "./PaymentMethodsListing";
import { getPaymentMethods } from "@/helpers/prisma/getPaymentMethods";
import { sortPaymentMethods } from "./paymentMethodHelpers";
import { getGlobalActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Manage Payment Methods | Our Budget',
    description: 'Add and remove payment methods to your budget portal',
}


export default async function ManagePaymentMethods() {
    const paymentMethods = await getPaymentMethods();
    const activityTypes = await getGlobalActivityTypes();
    const paymentMethodsSorted = sortPaymentMethods(paymentMethods);

    return (
        <main className="container mx-auto">
            <PaymentMethodsListing paymentMethodsSorted={paymentMethodsSorted} activityTypes={activityTypes} />
        </main>
    );

}