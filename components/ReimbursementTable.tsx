'use client'

//TODO: Decide if we want to make one general table component that can be used for all tables, or if we want to keep them separate

import { useState, Dispatch, SetStateAction } from "react";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import { ReimbursementsObj, RowData, TableCol, HandleReimbursementsUpdateFunction } from "@/budget-types";
import SortedTable from "./SortedTable/SortedTable";
import { ComboboxData, TableTd, TableTr, UnstyledButton } from "@mantine/core";
import SingleReimbursementTable from "./SingleReimbursementTable";
import { toCurrency } from "@/helpers/toCurrency";
import { getExcerpt } from "@/helpers/getExcerpt";
import { getPriceColorOptions } from "@/helpers/getPriceColorOptions";

interface ReimbursementTableProps {
    reimbursements: ReimbursementsObj[];
    paymentMethodSelectOptions: ComboboxData;
    handleReimbursementsUpdate: HandleReimbursementsUpdateFunction;
}

interface SetStateProp {
    setSelectedReimbursement: Dispatch<SetStateAction<ReimbursementsObj | null>>;
}

interface FullReimbursementTableProps extends SetStateProp {
    reimbursements: ReimbursementsObj[];
}

export default function ReimbursementTable({ reimbursements, paymentMethodSelectOptions, handleReimbursementsUpdate }: ReimbursementTableProps) {

    const [selectedReimbursement, setSelectedReimbursement] = useState<ReimbursementsObj | null>(null);

    return (
        <>
            { selectedReimbursement !== null ?
                <SingleReimbursementTable 
                    reimbursement={selectedReimbursement} 
                    paymentMethodSelectOptions={paymentMethodSelectOptions} 
                    setSelectedReimbursement={setSelectedReimbursement} 
                    handleReimbursementsUpdate={handleReimbursementsUpdate}
                />
            :
                <FullReimbursementTable reimbursements={reimbursements} setSelectedReimbursement={setSelectedReimbursement} />
            }
        </>
    );
}


function FullReimbursementTable({ reimbursements, setSelectedReimbursement }: FullReimbursementTableProps) {

    const priceColorOptions: {[key: string] : string} = getPriceColorOptions();

    const cols: TableCol[] = [
        ['date', 'Date', true],
        ['title', 'Title', true],
        ['amount', 'Amount', true],
        ['description', 'Description', false],
        ['details', 'Additional Info', false]
    ];

    const rowFunc = (reimbursements: RowData[]) => {
        return reimbursements.map((reimbursement) => {
            
            const cells = cols.map((col) => {
                const [key] = col;
                switch (key) {
                    case 'date':
                        return <TableTd key={`${key}-${reimbursement.id}`}>{getFormattedDate(reimbursement['date'])}</TableTd>;
                    case 'title':
                        return <TableTd key={`${key}-${reimbursement.id}`}>{reimbursement['title']}</TableTd>
                    case 'amount':
                        return <TableTd key={`${key}-${reimbursement.id}`}><span className={`${priceColorOptions['reimbursement']}`}>{toCurrency(reimbursement['amount'])}</span></TableTd>;
                    case 'description':
                        return <TableTd key={`${key}-${reimbursement.id}`}>{getExcerpt(reimbursement['description'], '-')}</TableTd>;
                    case 'details':
                        return (
                            <TableTd key={`${key}-${reimbursement.id}`}>
                                <UnstyledButton
                                    fz={"sm"}
                                    className="hover:underline" 
                                    onClick={() => setSelectedReimbursement(reimbursement as ReimbursementsObj)}>
                                        More Details
                                </UnstyledButton>
                            </TableTd>
                        );
                    default:
                        return <TableTd key={`${key}-${reimbursement.id}`}></TableTd>

                }
            });

            return <TableTr key={`row-${reimbursement.id}`}>{cells}</TableTr>;
        });
    }

    return <SortedTable data={reimbursements} cols={cols} overrideRowsFunc={rowFunc} />

}