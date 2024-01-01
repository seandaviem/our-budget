import PaymentMethodsListing from "./PaymentMethodsListing";
import { getPaymentMethods } from "@/app/helpers/prisma/getPaymentMethods";
import { sortPaymentMethods } from "./paymentMethodHelpers";
import { getGlobalActivityTypes } from "@/app/helpers/prisma/getGlobalActivityTypes";


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