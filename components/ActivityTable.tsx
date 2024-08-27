'use client'

//TODO: Decide if we want to make one general table component that can be used for all tables, or if we want to keep them separate

import { useState, Dispatch, SetStateAction  } from "react";
import { ActivitiesObj, PaymentMethodObj, CategoriesSorted, RowData, TableCol } from "@/budget-types";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import SortedTable from "./SortedTable/SortedTable";
import { TableTd, TableTr, UnstyledButton } from "@mantine/core";
import SingleActivityTable from "./SingleActivityTable";
import { getExcerpt } from "@/helpers/getExcerpt";
import PriceListing from "./PriceListing";

interface ActivityTableProps {
    activities: ActivitiesObj[];
    categoryOptions: CategoriesSorted;
    paymentMethodOptions: PaymentMethodObj[];
    showPagintion?: boolean;
    itemsPerPage?: number;
}

interface SetStateProp {
    setSelectedActivity: Dispatch<SetStateAction<ActivitiesObj | null>>;
}

interface FullActivityTableProps extends SetStateProp {
    activities: ActivitiesObj[];
    showPagination: boolean;
    itemsPerPage: number;
}

export default function ActivityTable({ activities, categoryOptions, paymentMethodOptions, showPagintion = false, itemsPerPage = 20 }: ActivityTableProps) {

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
                <FullActivityTable activities={activities} setSelectedActivity={setSelectedActivity} showPagination={showPagintion} itemsPerPage={itemsPerPage} />
            }
        </>
    );
}


function FullActivityTable({ activities, showPagination, itemsPerPage, setSelectedActivity }: FullActivityTableProps) {
    
    // Chunk Data (useMemo with activities as dependency)
    // add state for pagination
    // Add pagination component
    // switch chunk when the state changes



    const cols: TableCol[] = [
        ['date', 'Date', true],
        ['title', 'Title', true],
        ['amount', 'Amount', true],
        ['description', 'Description', false],
        ['details', 'Additional Info', false]
    ];

    const rowFunc = (activities: RowData[]) => {
        return activities.map((activity) => {
            const cells = cols.map((col) => {
                const [key] = col;
                switch (key) {
                    case 'date':
                        return <TableTd key={`${key}-${activity.id}`}>{getFormattedDate(activity['date'])}</TableTd>;
                    case 'title':
                        return <TableTd key={`${key}-${activity.id}`}>{activity['title']}</TableTd>
                    case 'amount':
                        return <TableTd key={`${key}-${activity.id}`}><PriceListing activity={activity as ActivitiesObj} /></TableTd>;
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

    return (
        <SortedTable 
            data={activities} 
            cols={cols} 
            overrideRowsFunc={rowFunc}
            showPagination={showPagination}
            itemsPerPage={itemsPerPage}
        />
    );

}