'use client'

import { ChangeEvent } from "react";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import { ActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import { CategoriesSorted } from "@/app/manage/categories/categoryHelpers";
import { PaymentMethodObj } from "@/app/manage/payment-methods/paymentMethodHelpers";
import { addActivity } from "@/app/actions/addActivity";
import toast from "react-hot-toast";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "@/helpers/hooks/useForm";
import { getActivitySelectOptions, getCategorySelectOptions, getPaymentMethodSelectOptions } from "@/helpers/selectOptionHelpers";
import { Select, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
interface AddActivityFormProps {
    activityOptions: ActivityTypes[];
    categoryOptions: CategoriesSorted;
    paymentMethodOptions: PaymentMethodObj[];
}

export default function AddActivityForm({activityOptions, categoryOptions, paymentMethodOptions}: AddActivityFormProps) {

    const currentDate = new Date(getFormattedDate());

    const defaultFormInputs = {
        activityType: (activityOptions[1].id).toString(),
        category: '',
        name: '',
        amount: '',
        paymentMethod: '',
        date: currentDate,
        description: ''
    }
    const { fields, updateForm, resetForm } = useForm(defaultFormInputs);

    const activitySelectOptions = getActivitySelectOptions(activityOptions);
    const categorySelectOptions = getCategorySelectOptions(categoryOptions);
    const paymentMethodSelectOptions = getPaymentMethodSelectOptions(paymentMethodOptions, parseInt(fields.activityType));

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        updateForm({ key: name, value });
    }

    return (
        <form
            action={async (formData: FormData) => {
                resetForm();

                const result = await addActivity(formData);

                if (result?.error) {
                    toast.error(result.error);
                } else {
                    toast.success("Activity has been added!");
                }
            }}
        >
            <div className="mb-5">
                <Select
                    data={activitySelectOptions}
                    id="activity-type"
                    name="activityType"
                    label="Activity Type"
                    placeholder="Select Activity Type"
                    required
                    value={fields.activityType}
                    onChange={(_value, option) => updateForm({ key: "activityType", value: option.value, })}
                />
            </div>
            <div className="mb-5">
                <Select
                    data={categorySelectOptions}
                    id="category"
                    name="category"
                    label="Category"
                    placeholder="Select Category"
                    required
                    value={fields.category ? fields.category : null}
                    onChange={(_value, option) => updateForm({key: 'category', value: option.value})}
                />
            </div>
            <div className="mb-5">
                <TextInput
                    id="name"
                    name="name"
                    label="Activity Name"
                    placeholder="Activity Name"
                    required
                    value={fields.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-5">
                <TextInput
                    inputMode="decimal"
                    id="amount"
                    name="amount"
                    label="Amount"
                    pattern="[0-9]+(?:\.[0-9]{0,2})?"
                    placeholder="0.00"
                    required
                    value={fields.amount}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-5">
                <Select
                    data={paymentMethodSelectOptions}
                    id="payment-method"
                    name="paymentMethod"
                    label="Payment Method"
                    placeholder="Select Payment Method"
                    required
                    value={fields.paymentMethod ? fields.paymentMethod : null}
                    onChange={(_value, option) => updateForm({key: 'paymentMethod', value: option.value})}
                />
            </div>
            <div className="mb-5">
                <DateInput
                    id="date"
                    name="date"
                    label="Date"
                    valueFormat="M/DD/YYYY"
                    required
                    value={fields.date}
                    onChange={(e) => updateForm({key: "date", value: e})}
                />
            </div>
            <div className="mb-5">
                <Textarea
                    id="description"
                    name="description"
                    label="Description"
                    placeholder="Optional: Write some notes about what this activity was for..."
                    rows={3}
                    value={fields.description}
                    onChange={handleInputChange}
                />
            </div>

            <SubmitButton />
        </form>
    );
}