'use client'

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { sortPaymentMethods } from "./paymentMethodHelpers";
import { PaymentMethodsSorted } from "@/budget-types";
import { ActivityTypes } from "@/budget-types";
import LoadButton from "@/components/LoadButton";

interface AddPaymentMethodProps {
    activityTypeId: number | null;
    setPaymentMethods: Dispatch<SetStateAction<PaymentMethodsSorted>>;
    activityTypes?: ActivityTypes[];
}

export default function AddPaymentMethod({activityTypeId, setPaymentMethods, activityTypes = []}: AddPaymentMethodProps) {

    const [paymentMethod, setPaymentMethod] = useState("");
    const [activityId, setActivityId] = useState<number>(activityTypeId || 1);
    const [isAdding, setIsAdding] = useState(false);

    function handleAddPaymentMethod() {

        const postPaymentMethod = async () => {
            setIsAdding(true);

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

            setIsAdding(false);
        });

    }

    return (
        <div className="flex items-center">
            { (activityTypeId === null && activityTypes.length > 0 ) ? 
                <select className="mr-3 border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                value={activityId}
                onChange={(e) => setActivityId(parseInt(e.target.value))}
                >
                    {activityTypes.map((activity) => <option key={activity.id} value={activity.id}>{activity.name}</option>)}
                </select>
            : 
            ""
            }
            <input type="text" className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Payment Method Name"  value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} />

            {/* <LoadButton 
                isLoading={isAdding} 
                handleAdd={handleAddPaymentMethod} 
            /> */}
        </div>
    )
}