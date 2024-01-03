'use client'

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ActivitiesObj } from "@/helpers/prisma/getActivities";
import { getFormattedDate } from "@/helpers/getDate";

interface ActivityTableProps {
    activities: ActivitiesObj[];
}

interface SetStateProp {
    setSelectedActivity: Dispatch<SetStateAction<ActivitiesObj | null>>;
}

type FullActivityTableProps = ActivityTableProps & SetStateProp;

interface SingleActivityTableProps extends SetStateProp {
    activity: ActivitiesObj;
}

export default function ActivityTable({ activities }: ActivityTableProps) {

    const [selectedActivity, setSelectedActivity] = useState<ActivitiesObj | null>(null);

    return (
        <>
            { selectedActivity !== null ?
                <SingleActivityTable activity={selectedActivity} setSelectedActivity={setSelectedActivity} />
            :
                <FullActivityTable activities={activities} setSelectedActivity={setSelectedActivity} />
            }
        </>
    );
}


function FullActivityTable({ activities, setSelectedActivity }: FullActivityTableProps) {

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
                        return (
                            <tr key={activity.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {getFormattedDate(activity.date)}
                                </th>
                                <td className="px-6 py-4">
                                    {activity.title}
                                </td>
                                <td className={`px-6 py-4 ${activity.activityType?.name === 'Expense' ? 'text-red-500' : 'text-green-500'}`}>
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

function SingleActivityTable({ activity, setSelectedActivity }: SingleActivityTableProps) {

    const rowClasses = "odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700";
    const thClasses = "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white";
    const tdClasses= "px-6 py-4";

    return(
        <>
            <button
                className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                onClick={() => setSelectedActivity(null)}
            >
                View All Activities
            </button>
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
                                {activity.title ?? "No Name"}
                            </td>
                        </tr>
                        <tr className={rowClasses}>
                            <th scope="row" className={thClasses}>
                                Description
                            </th>
                            <td className={tdClasses}>
                                {activity.description ?? "No Description"}
                            </td>
                        </tr>
                        <tr className={rowClasses}>
                            <th scope="row" className={thClasses}>
                                Amount
                            </th>
                            <td className={tdClasses}>
                                {activity.amount ?? "$0.00"}
                            </td>
                        </tr>
                        <tr className={rowClasses}>
                            <th scope="row" className={thClasses}>
                                Date
                            </th>
                            <td className={tdClasses}>
                                {activity.date.toLocaleDateString() ?? "N/A"}
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
                                {activity.category?.name ?? "N/A"}
                            </td>
                        </tr>
                        <tr className={rowClasses}>
                            <th scope="row" className={thClasses}>
                                Payment Method
                            </th>
                            <td className={tdClasses}>
                                {activity.paymentMethod?.name ?? "N/A"}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}