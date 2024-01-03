'use client'

import { useState } from "react";
import { getCurrentDate } from "@/helpers/getCurrentDate";
import { ActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import { CategoriesSorted } from "@/app/manage/categories/categoryHelpers";
import { PaymentMethodObj } from "@/app/manage/payment-methods/paymentMethodHelpers";
import { addActivity } from "@/app/actions/addActivity";
import toast from "react-hot-toast";
import SubmitButton from "@/components/SubmitButton";

interface AddActivityFormProps {
    activityOptions: ActivityTypes[];
    categoryOptions: CategoriesSorted;
    paymentMethodOptions: PaymentMethodObj[];
}

export default function AddActivityForm({activityOptions, categoryOptions, paymentMethodOptions}: AddActivityFormProps) {

    const currentDate = getCurrentDate();

    const defaultFormInputs = {
        activityType: (activityOptions[1].id).toString(),
        category: '',
        name: '',
        amount: '',
        paymentMethod: '',
        date: currentDate,
        description: ''
    }
    const [ formInputs, setFormInputs ] = useState(defaultFormInputs);

    function handleFormChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        setFormInputs({
            ...formInputs,
            [event.target.name]: event.target.value
        });
    }

    const categorySelectOptions = Object.keys(categoryOptions).map((key: string) => {
        const catId = parseInt(key);
        if (categoryOptions[catId].children.length > 0) {
            return (
                <optgroup key={catId} label={categoryOptions[catId].name}>
                    {categoryOptions[catId].children.map(option => <option key={option.id} value={option.id}>{option.name}</option>)}
                </optgroup>
            );
        }
    });

    return (
        <form action={async (formData: FormData) => {
            setFormInputs(defaultFormInputs);

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
                <label htmlFor="activity-type" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Activity Type</label>
                <select 
                    id="activity-type"
                    name="activityType"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formInputs.activityType}
                    onChange={(e) => handleFormChange(e)}
                >
                    {activityOptions.length > 0 && activityOptions.map((option) => <option key={option.id} value={(option.id).toString()}>{option.name}</option>)}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Category</label>
                <select 
                    id="category"
                    name="category"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formInputs.category}
                    onChange={(e) => handleFormChange(e)}
                >
                    <option value="" disabled>Select a Category</option>
                    {categorySelectOptions}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Acitivty Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Acitivty Name"
                    required
                    value={formInputs.name}
                    onChange={(e) => handleFormChange(e)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="amount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Amount
                </label>
                <input
                    type="text"
                    inputMode="decimal"
                    id="amount"
                    name="amount"
                    pattern="[0-9]+(?:\.[0-9]{0,2})?"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0.00"
                    required
                    value={formInputs.amount}
                    onChange={(e) => handleFormChange(e)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="payment-method" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select Payment Method</label>
                <select 
                    id="payment-method"
                    name="paymentMethod"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formInputs.paymentMethod}
                    onChange={(e) => handleFormChange(e)}
                >
                    {paymentMethodOptions.length > 0 && paymentMethodOptions.map((option) => {
                        return (option.activityType.id === parseInt(formInputs.activityType) 
                            ? <option key={option.id} value={(option.id).toString()}>{option.name}</option>
                            : ''
                        )
                    })}
                </select>
            </div>
            <div className="mb-5">
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Date
                </label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    value={formInputs.date}
                    onChange={(e) => handleFormChange(e)}
                />
            </div>
            <div className="mb-5">
                <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Description
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Optional: Write some notes about what this activity was for..."
                    rows={3}
                    value={formInputs.description}
                    onChange={(e) => handleFormChange(e)}
                >
                </textarea>
            </div>

            <SubmitButton />
        </form>
    );
}