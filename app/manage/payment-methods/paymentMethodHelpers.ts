import { PaymentMethodObj, PaymentMethodsSorted } from '@/budget-types';

export function sortPaymentMethods(paymentMethods: PaymentMethodObj[]): PaymentMethodsSorted {

    const paymentMethodsSorted: PaymentMethodsSorted = {};

    for (let i = 0; i < paymentMethods.length; i++) {
        if ("activityType" in paymentMethods[i] === false) {
            continue;
        }

        const activityTypeId = paymentMethods[i].activityType!.id;

        if (paymentMethodsSorted[activityTypeId] === undefined) {
            paymentMethodsSorted[activityTypeId] = {
                id: paymentMethods[i].activityType!.id,
                name: paymentMethods[i].activityType!.name,
                items: [] 
            };
        }

        paymentMethodsSorted[activityTypeId].items.push(paymentMethods[i]);
    }

    return paymentMethodsSorted;
}