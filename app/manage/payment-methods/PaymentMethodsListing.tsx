'use client'

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { SortedPaymentMethodsObj, PaymentMethodsSorted } from "./paymentMethodHelpers";
import AddPaymentMethod from "./AddPaymentMethod";
import { ActivityTypes } from "@/helpers/prisma/getGlobalActivityTypes";

export default function PaymentMethodsListing({paymentMethodsSorted, activityTypes}: {
    paymentMethodsSorted: PaymentMethodsSorted,
    activityTypes: ActivityTypes[]
}) {

    const [paymentMethods, setPaymentMethods] = useState<PaymentMethodsSorted>(paymentMethodsSorted);

    return (
        <>
            <div className="mb-3">
                <AddPaymentMethod 
                    activityTypeId={null} 
                    setPaymentMethods={setPaymentMethods} 
                    activityTypes={activityTypes}
                />
            </div>
            {Object.keys(paymentMethods).map((key: string) => {
                const id = parseInt(key);
                return (
                    <PaymentMethodsTable key={id} paymentMethods={paymentMethods[id]} setPaymentMethods={setPaymentMethods} />
                );
            })}
        </>
    )
}


function PaymentMethodsTable({ paymentMethods, setPaymentMethods }: 
    { 
        paymentMethods: SortedPaymentMethodsObj, 
        setPaymentMethods: Dispatch<SetStateAction<PaymentMethodsSorted>>
    }) {

    return (
        <>
            <div className="relative overflow-x-auto sm:rounded-lg mb-9">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Activity Type
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Payment Method
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentMethods.items.length > 0
                            ? paymentMethods.items.map((paymentMethod) => (
                                  <tr
                                      key={paymentMethod.id}
                                      className="border-b bg-gray-800 border-gray-700"
                                  >
                                      <th
                                          scope="row"
                                          className="px-6 py-4 font-medium whitespace-nowrap text-white"
                                      >
                                          {paymentMethod.activityType.name}
                                      </th>
                                      <td className="px-6 py-4">{paymentMethod.name}</td>
                                  </tr>
                              ))
                            : 
                            <tr className="border-b bg-gray-800 border-gray-700">
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                                >
                                   {paymentMethods.activityTypeName}
                                </td>
                                <td>No Payment Methods Available.</td>
                            </tr>
                        }
                        <tr className="border-b bg-gray-800 border-gray-700">
                            <td
                                scope="row"
                                className="px-6 py-4 font-medium whitespace-nowrap text-white"
                            >
                                Add {paymentMethods.activityTypeName} Payment Method</td>
                            <td className="px-6 py-4"><AddPaymentMethod activityTypeId={paymentMethods.activityTypeId} setPaymentMethods={setPaymentMethods} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}