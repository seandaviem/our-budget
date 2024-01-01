'use client'

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { PaymentMethodsSorted, sortPaymentMethods } from "./paymentMethodHelpers";
import { ActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";
import AddButton from "@/components/AddButton";

interface AddPaymentMethodProps {
    activityTypeId: number | null;
    setPaymentMethods: Dispatch<SetStateAction<PaymentMethodsSorted>>;
    activityTypes?: ActivityTypes[];
}

export default function AddPaymentMethod({activityTypeId, setPaymentMethods, activityTypes = []}: AddPaymentMethodProps) {

    const [paymentMethod, setPaymentMethod] = useState("");
    const [activityId, setActivityId] = useState<number>(activityTypeId || 1);

    function handleAddPaymentMethod() {

        const postPaymentMethod = async () => {
            const body = {
                name: paymentMethod,
                activityTypeId: activityId
            }

            try {
                const response = await fetch("../../api/payment-methods", {
                    method: "POST",
                    body: JSON.stringify(body)
                });
    
                const data = await response.json();

                return data;

            } catch(error) {
                console.log(error);
                return;
            }
        }

        postPaymentMethod().then((res) => {
            if (res.success) {
                const updatedCategories = sortPaymentMethods(res.data);
                setPaymentMethods(updatedCategories);
                setPaymentMethod('');
            }
        });

    }

    return (
        <div className="flex items-center">
            { (activityTypeId === null && activityTypes.length > 0 ) ? 
                <select className="mr-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={activityId}
                onChange={(e) => setActivityId(parseInt(e.target.value))}
                >
                    {activityTypes.map((activity) => <option key={activity.id} value={activity.id}>{activity.name}</option>)}
                </select>
            : 
            ""
            }
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Payment Method Name"  value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />

            <AddButton handleAdd={handleAddPaymentMethod} />
        </div>
    )
}