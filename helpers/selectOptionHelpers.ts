import { CategoriesSorted } from "@/app/manage/categories/categoryHelpers";
import { PaymentMethodObj } from "@/app/manage/payment-methods/paymentMethodHelpers";
import { ComboboxData } from "@mantine/core";
import { ActivityTypes } from "./prisma/getGlobalActivityTypes";

export function getActivitySelectOptions(activityOptions: ActivityTypes[]): ComboboxData {
    if (activityOptions.length === 0) return ([{value: "", label: "No Activity Options Available", disabled: true}]);

    return activityOptions.map(option => ({value: option.id.toString(), label: option.name}));
}

export function getCategorySelectOptions(categoryOptions: CategoriesSorted): ComboboxData {
    return Object.keys(categoryOptions).filter((key) => categoryOptions[parseInt(key)].children.length > 0).map((key: string) => {
        const catId = parseInt(key);
        const items = categoryOptions[catId].children.map(option => ({ value: option.id.toString(), label: option.name }));
        return {
            group: categoryOptions[catId].name,
            items: items
        }
    });
}

export function getPaymentMethodSelectOptions(paymentMethodOptions: PaymentMethodObj[], activityTypeId: number): ComboboxData {
    
    if (paymentMethodOptions.length === 0) return ([{value: "", label: "No Payment Methods Available", disabled: true}]);

    return paymentMethodOptions.filter(option => option.activityType.id === activityTypeId)
            .map((option) => ({ value: option.id.toString(), label: option.name }));
}