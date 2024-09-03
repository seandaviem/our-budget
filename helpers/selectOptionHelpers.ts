import { CategoriesSorted, PaymentMethodObj, ActivityTypes } from "@/budget-types";
import { ComboboxData, ComboboxItem } from "@mantine/core";

export function getActivitySelectOptions(activityOptions: ActivityTypes[]): ComboboxData {
    if (activityOptions.length === 0) return ([{value: "", label: "No Activity Options Available", disabled: true}]);

    return activityOptions.map(option => ({value: option.id.toString(), label: option.name}));
}

export function getCategorySelectOptions(categoryOptions: CategoriesSorted): ComboboxData {
    return Object.keys(categoryOptions).filter((key) => categoryOptions[parseInt(key)].items.length > 0).map((key: string) => {
        const catId = parseInt(key);
        const items = categoryOptions[catId].items.map(option => ({ value: option.id.toString(), label: option.name }));
        return {
            group: categoryOptions[catId].name,
            items: items
        }
    });
}

export function getPaymentMethodSelectOptions(paymentMethodOptions: PaymentMethodObj[], activityTypeId: number): ComboboxData {
    
    if (paymentMethodOptions.length === 0) return ([{value: "", label: "No Payment Methods Available", disabled: true}]);

    return paymentMethodOptions.filter(option => option.activityType && option.activityType.id === activityTypeId)
            .map((option) => ({ value: option.id.toString(), label: option.name }));
}

export function getAllPaymentMethodSelectOptions(paymentMethodOptions: PaymentMethodObj[]): { [key: string]: ComboboxItem[] } {
    const paymentMethodSelectOptions: { [key: string]: ComboboxItem[] } = {};

    for (let i = 0; i < paymentMethodOptions.length; i++) {
        const activityTypeId = paymentMethodOptions[i].activityType?.id || -1;

        if (!(activityTypeId in paymentMethodSelectOptions)) {
            paymentMethodSelectOptions[activityTypeId.toString()] = [{ value: paymentMethodOptions[i].id.toString(), label: paymentMethodOptions[i].name }];
        } else {
            paymentMethodSelectOptions[activityTypeId.toString()].push({ value: paymentMethodOptions[i].id.toString(), label: paymentMethodOptions[i].name });
        }
    }

    return paymentMethodSelectOptions;
}