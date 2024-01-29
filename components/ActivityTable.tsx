'use client'

import { ReactNode, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ActivitiesObj } from "@/helpers/prisma/getActivities";
import { getFormattedDate } from "@/helpers/getDate";
import { CategoriesSorted } from "@/app/manage/categories/categoryHelpers";
import { PaymentMethodObj } from "@/app/manage/payment-methods/paymentMethodHelpers";
import { getCategorySelectOptions, getPaymentMethodSelectOptions } from "@/app/activities/add-activity/AddActivityForm";
import { useForm } from "@/helpers/hooks/useForm";
import { updateActivity } from "@/app/actions/updateActivity";
import { deleteActivity } from "@/app/actions/deleteActivity";
import toast from "react-hot-toast";

interface ActivityTableProps {
    activities: ActivitiesObj[];
    categoryOptions: CategoriesSorted;
    paymentMethodOptions: PaymentMethodObj[];
}

interface SetStateProp {
    setSelectedActivity: Dispatch<SetStateAction<ActivitiesObj | null>>;
}

interface FullActivityTableProps extends SetStateProp {
    activities: ActivitiesObj[];
}

interface SingleActivityTableProps extends SetStateProp {
    activity: ActivitiesObj;
    categoryOptions: CategoriesSorted;
    paymentMethodOptions: PaymentMethodObj[];
}

export default function ActivityTable({ activities, categoryOptions, paymentMethodOptions }: ActivityTableProps) {

    const [selectedActivity, setSelectedActivity] = useState<ActivitiesObj | null>(null);

    return (
        <>
            { selectedActivity !== null ?
                <SingleActivityTable 
                    activity={selectedActivity} 
                    categoryOptions={categoryOptions} 
                    paymentMethodOptions={paymentMethodOptions} 
                    setSelectedActivity={setSelectedActivity} 
                />
            :
                <FullActivityTable activities={activities} setSelectedActivity={setSelectedActivity} />
            }
        </>
    );
}


function FullActivityTable({ activities, setSelectedActivity }: FullActivityTableProps) {

    const priceColorOptions: {[key: string] : string} = {
        'expense': 'text-red-500',
        'income': 'text-green-500',
        'reimbursement': 'text-orange-500',
        'big expense': 'text-red-900'
    };

    return(
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Date
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Description
                        </th>
                        <th scope="col" className="px-6 py-3">
                            More Details
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {activities.length > 0 && activities.map(activity => {

                        const priceColor = activity.activityType?.name ? priceColorOptions[activity.activityType?.name.toLowerCase()] : '';

                        return (
                            <tr key={activity.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {getFormattedDate(activity.date)}
                                </th>
                                <td className="px-6 py-4">
                                    {activity.title}
                                </td>
                                <td className={`px-6 py-4 ${priceColor}`}>
                                    ${activity.amount}
                                </td>
                                <td className="px-6 py-4">
                                    {activity.description?.split(/\s+/).slice(0, 15).join(' ') + '...' ?? ''}
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        onClick={() => setSelectedActivity(activity)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    )
}

function SingleActivityTable({ activity, categoryOptions, paymentMethodOptions, setSelectedActivity }: SingleActivityTableProps) {

    const [isEditing, setIsEditing] = useState(false);

    const defaultFormInputs = {
        category: activity.category?.id?.toString() || '',
        name: activity.title || '',
        amount: activity.amount.toString(),
        paymentMethod: activity.paymentMethod?.id?.toString() || '',
        date: getFormattedDate(activity.date),
        description: activity.description || ''
    }
    const { fields, updateForm, resetForm } = useForm(defaultFormInputs);

    const rowClasses = "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";
    const thClasses = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
    const tdClasses= "px-6 py-4";

    const categorySelectOptions = getCategorySelectOptions(categoryOptions);

    const paymentMethodSelectOptions = getPaymentMethodSelectOptions(paymentMethodOptions, activity.activityType?.id || -1);

    const updateActivityWithData = updateActivity.bind(null, activity.id, fields);
    const deleteActivityById = deleteActivity.bind(null, activity.id);


    async function handleSaveChanges() {

        const result = await updateActivityWithData();

        if (result?.error) {
            toast.error(result.error);
        } else {
            toast.success("Activity has been updated!");
        }

        setIsEditing(false);
        resetForm(defaultFormInputs);
        setSelectedActivity(null);
    }

    async function handleDelete() {

        if (confirm("Are you sure you want to delete this activity?")) {
            const result = await deleteActivityById();

            if (result?.error) {
                toast.error(result.error);
            } else {
                toast.success("Activity has been deleted!");
            }

            setIsEditing(false);
            resetForm(defaultFormInputs);
            setSelectedActivity(null);
        }
    }

    function handleCancel() {
        setIsEditing(false);
        resetForm(defaultFormInputs);
    }

    return (
        <>
            <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => setSelectedActivity(null)}
            >
                View All Activities
            </button>
            <div className="activityInfo my-5">
                {isEditing ? (
                    <ActivityEditButtons
                        handleSaveChanges={handleSaveChanges}
                        handleDelete={handleDelete}
                        handleCancel={handleCancel}
                    />
                ) : (
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                )}
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Property
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Value
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={rowClasses}>
                                <th scope="row" className={thClasses}>
                                    Name
                                </th>
                                <td className={tdClasses}>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Acitivty Name"
                                            required
                                            value={fields.name}
                                            onChange={(e) => updateForm(e)}
                                        />
                                    ) : (
                                        fields.name ?? "No Name"
                                    )}
                                </td>
                            </tr>
                            <tr className={rowClasses}>
                                <th scope="row" className={thClasses}>
                                    Description
                                </th>
                                <td className={tdClasses}>
                                {isEditing ? (
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Optional: Write some notes about what this activity was for..."
                                        rows={3}
                                        value={fields.description}
                                        onChange={(e) => updateForm(e)}
                                    >
                                    </textarea>
                                    ) : (
                                        fields.description ?? "No Description"
                                    )}
                                </td>
                            </tr>
                            <tr className={rowClasses}>
                                <th scope="row" className={thClasses}>
                                    Amount
                                </th>
                                <td className={tdClasses}>
                                    {isEditing ? (
                                        <input
                                            type="text"
                                            inputMode="decimal"
                                            id="amount"
                                            name="amount"
                                            pattern="[0-9]+(?:\.[0-9]{0,2})?"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="0.00"
                                            required
                                            value={fields.amount}
                                            onChange={(e) => updateForm(e)}
                                        />
                                    ) : (
                                        fields.amount ?? "$0.00"
                                    )}
                                </td>
                            </tr>
                            <tr className={rowClasses}>
                                <th scope="row" className={thClasses}>
                                    Date
                                </th>
                                <td className={tdClasses}>
                                {isEditing ? (
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={new Date(fields.date).toISOString().split('T')[0]}
                                        onChange={(e) => updateForm(e)}
                                    />
                                    ) : (
                                        fields.date ??
                                        "N/A"
                                    )
                                }
                                </td>
                            </tr>
                            <tr className={rowClasses}>
                                <th scope="row" className={thClasses}>
                                    Activity Type
                                </th>
                                <td className={tdClasses}>
                                    {activity.activityType?.name ?? "N/A"}
                                </td>
                            </tr>
                            <tr className={rowClasses}>
                                <th scope="row" className={thClasses}>
                                    Category
                                </th>
                                <td className={tdClasses}>
                                {isEditing ? (
                                    <select 
                                        id="category"
                                        name="category"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        required
                                        value={fields.category}
                                        onChange={(e) => updateForm(e)}
                                    >   
                                        { !fields.category ? <option value="" disabled>Select a Category</option> : '' }
                                        {categorySelectOptions}
                                    </select>
                                    ) : (
                                        activity.category?.name ?? "N/A"
                                    )
                                }
                                </td>
                            </tr>
                            <tr className={rowClasses}>
                                <th scope="row" className={thClasses}>
                                    Payment Method
                                </th>
                                <td className={tdClasses}>
                                    {isEditing ? (
                                        <select 
                                            id="payment-method"
                                            name="paymentMethod"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            required
                                            value={fields.paymentMethod}
                                            onChange={(e) => updateForm(e)}
                                        >
                                            {paymentMethodSelectOptions}
                                        </select>
                                        ) : (
                                            activity.paymentMethod?.name ?? "N/A"
                                        )
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {isEditing ? (
                    <ActivityEditButtons
                        handleSaveChanges={handleSaveChanges}
                        handleDelete={handleDelete}
                        handleCancel={handleCancel}
                    />
                ) : (
                    ""
                )}
            </div>
        </>
    );
}

function ActivityEditButtons({ handleSaveChanges, handleDelete, handleCancel }: {handleSaveChanges: () => void, handleDelete: () => void, handleCancel: () => void}) {
    return (
        <>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={handleSaveChanges}
            >
                Save Changes
            </button>
            <button
                type="submit"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={handleDelete}
            >
                Delete
            </button>
            <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={handleCancel}
            >
                Cancel
            </button>
        </>
    );
}