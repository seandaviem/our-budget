'use client'

import { useState } from "react";
import { getFormattedDate } from "@/helpers/getDate";
import { ActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import { CategoriesSorted } from "@/app/manage/categories/categoryHelpers";
import { PaymentMethodObj } from "@/app/manage/payment-methods/paymentMethodHelpers";
import { addActivity } from "@/app/actions/addActivity";
import toast from "react-hot-toast";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "@/helpers/hooks/useForm";
interface AddActivityFormProps {
    activityOptions: ActivityTypes[];
    categoryOptions: CategoriesSorted;
    paymentMethodOptions: PaymentMethodObj[];
}

export default function AddActivityForm({activityOptions, categoryOptions, paymentMethodOptions}: AddActivityFormProps) {

    const currentDate = new Date(getFormattedDate()).toISOString().split('T')[0];

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

    const categorySelectOptions = getCategorySelectOptions(categoryOptions);
    const paymentMethodSelectOptions = getPaymentMethodSelectOptions(paymentMethodOptions, parseInt(fields.activityType));

    return (
        <form action={async (formData: FormData) => {
            resetForm(defaultFormInputs);

            const result = await addActivity(formData);
            
            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Activity has been added!");
            }
        }}
            className="px-4"
        >
            <div className="mb-5">
                <label htmlFor="activity-type" className="block mb-2 text-sm font-medium text-white">Select Activity Type</label>
                <select 
                    id="activity-type"
                    name="activityType"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={fields.activityType}
                    onChange={(e) => updateForm(e)}
                >
                    {activityOptions.length > 0 && activityOptions.map((option) => <option key={option.id} value={(option.id).toString()}>{option.name}</option>)}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-white">Select Category</label>
                <select 
                    id="category"
                    name="category"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={fields.category}
                    onChange={(e) => updateForm(e)}
                >   
                    { !fields.category ? <option value="" disabled>Select a Category</option> : '' }
                    {categorySelectOptions}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                    Activity Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Acitivty Name"
                    required
                    value={fields.name}
                    onChange={(e) => updateForm(e)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-white">
                    Amount
                </label>
                <input
                    type="text"
                    inputMode="decimal"
                    id="amount"
                    name="amount"
                    pattern="[0-9]+(?:\.[0-9]{0,2})?"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                    required
                    value={fields.amount}
                    onChange={(e) => updateForm(e)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="payment-method" className="block mb-2 text-sm font-medium text-white">Select Payment Method</label>
                <select 
                    id="payment-method"
                    name="paymentMethod"
                    className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={fields.paymentMethod}
                    onChange={(e) => updateForm(e)}
                >
                    { !fields.paymentMethod ? <option value="" disabled>Select a Payment Method</option> : '' }
                    {paymentMethodSelectOptions}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-white">
                    Date
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    className="border xt-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    required
                    value={fields.date}
                    onChange={(e) => updateForm(e)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-white">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="border xt-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Optional: Write some notes about what this activity was for..."
                    rows={3}
                    value={fields.description}
                    onChange={(e) => updateForm(e)}
                >
                </textarea>
            </div>

            <SubmitButton />
        </form>
    );
}


export function getCategorySelectOptions(categoryOptions: CategoriesSorted) {
    return Object.keys(categoryOptions).map((key: string) => {
        const catId = parseInt(key);
        if (categoryOptions[catId].children.length > 0) {
            return (
                <optgroup key={catId} label={categoryOptions[catId].name}>
                    {categoryOptions[catId].children.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                </optgroup>
            );
        }
    });
}

export function getPaymentMethodSelectOptions(paymentMethodOptions: PaymentMethodObj[], activityTypeId: number) {
    if (paymentMethodOptions.length === 0) return (<option value="" disabled>No Payment Methods Available</option>);

    return paymentMethodOptions.map((option) => {
        return (option.activityType.id === activityTypeId 
            ? <option key={option.id} value={option.id}>{option.name}</option>
            : ''
        )
    });
}