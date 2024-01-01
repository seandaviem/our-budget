export interface PaymentMethodObj {
    id: number;
    name: string;
    activityType: { id: number; name: string; };
}

export interface SortedPaymentMethodsObj {
    activityTypeId: number;
    activityTypeName: string;
    items: PaymentMethodObj[];
}

export interface PaymentMethodsSorted {
    [key: number]: SortedPaymentMethodsObj; // key is activityType ID; 
}

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