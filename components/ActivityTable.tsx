'use client'

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ActivitiesObj } from "@/helpers/prisma/getActivities";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import { CategoriesSorted } from "@/app/manage/categories/categoryHelpers";
import { PaymentMethodObj } from "@/app/manage/payment-methods/paymentMethodHelpers";
import SortedTable, { RowData, TableCol } from "./SortedTable/SortedTable";
import { TableTd, TableTr, UnstyledButton } from "@mantine/core";
import SingleActivityTable from "./SingleActivityTable";
import { toCurrency } from "@/helpers/toCurrency";
import { getExcerpt } from "@/helpers/getExcerpt";

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
        'expense': 'bg-red-700 bg-fff text-sm font-medium px-2.5 py-0.5 rounded-full',
        'income': 'bg-green-700 bg-fff text-sm font-medium px-2.5 py-0.5 rounded-full',
        'reimbursement': 'bg-orange-700 bg-fff text-sm font-medium px-2.5 py-0.5 rounded-full',
        'big expense': 'bg-red-900 bg-fff text-sm font-medium px-2.5 py-0.5 rounded-full'
    };

    const cols: TableCol[] = [
        ['date', 'Date', true],
        ['title', 'Title', true],
        ['amount', 'Amount', true],
        ['description', 'Description', false],
        ['details', 'Additional Info', false]
    ];

    const rowFunc = (activities: RowData[]) => {
        return activities.map((activity) => {
            const priceColor = activity.activityType?.name ? priceColorOptions[activity.activityType?.name.toLowerCase()] : '';
            const cells = cols.map((col) => {
                const [key] = col;
                switch (key) {
                    case 'date':
                        return <TableTd key={`${key}-${activity.id}`}>{getFormattedDate(activity['date'])}</TableTd>;
                    case 'title':
                        return <TableTd key={`${key}-${activity.id}`}>{activity['title']}</TableTd>
                    case 'amount':
                        return <TableTd key={`${key}-${activity.id}`}><span className={`${priceColor}`}>{toCurrency(activity['amount'])}</span></TableTd>;
                    case 'description':
                        return <TableTd key={`${key}-${activity.id}`}>{getExcerpt(activity['description'], '-')}</TableTd>;
                    case 'details':
                        return (
                            <TableTd key={`${key}-${activity.id}`}>
                                <UnstyledButton
                                    fz={"sm"}
                                    className="hover:underline" 
                                    onClick={() => setSelectedActivity(activity as ActivitiesObj)}>
                                        More Details
                                </UnstyledButton>
                            </TableTd>
                        );
                    default:
                        return <TableTd key={`${key}-${activity.id}`}></TableTd>

                }
            });

            return <TableTr key={`row-${activity.id}`}>{cells}</TableTr>;
        });
    }

    return <SortedTable data={activities} cols={cols} overrideRowsFunc={rowFunc} />

}