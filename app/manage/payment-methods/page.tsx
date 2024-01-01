import PaymentMethodsListing from "./PaymentMethodsListing";
import { getPaymentMethods } from "@/app/api/payment-methods/route";
import { sortPaymentMethods } from "./paymentMethodHelpers";
import prisma from "@/app/lib/db";
import { getGlobalActivityTypes } from "@/app/helpers/getGlobalActivityTypes";


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