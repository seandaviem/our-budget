import { PaymentMethodObj, PaymentMethodsSorted } from '@/budget-types';

export function sortPaymentMethods(paymentMethods: PaymentMethodObj[]): PaymentMethodsSorted {

    const paymentMethodsSorted: PaymentMethodsSorted = {};

    for (let i = 0; i < paymentMethods.length; i++) {
        const activityTypeId = paymentMethods[i].activityType.id;

        if (paymentMethodsSorted[activityTypeId] === undefined) {
            paymentMethodsSorted[activityTypeId] = {
                activityTypeId: paymentMethods[i].activityType.id,
                activityTypeName: paymentMethods[i].activityType.name,
                items: [] 
            };
        }

        paymentMethodsSorted[activityTypeId].items.push(paymentMethods[i]);
    }

    return paymentMethodsSorted;
}