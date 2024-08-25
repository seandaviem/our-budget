'use client'

import { ChangeEvent, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import { ReimbursementsObj, HandleReimbursementsUpdateFunction } from "@/budget-types";
import { useForm } from "@/helpers/hooks/useForm";
import { updateReimbursement } from "@/app/actions/updateReimbursement";
import { deleteReimbursement } from "@/app/actions/deleteReimbursement";
import toast from "react-hot-toast";
import { ComboboxData, Select, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Textarea, TextInput, UnstyledButton } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { toCurrency } from "@/helpers/toCurrency";


interface SetStateProp {
    setSelectedReimbursement: Dispatch<SetStateAction<ReimbursementsObj | null>>;
}

interface SingleReimbursementTableProps extends SetStateProp {
    reimbursement: ReimbursementsObj;
    paymentMethodSelectOptions: ComboboxData;
    handleReimbursementsUpdate: HandleReimbursementsUpdateFunction;
}


export default function SingleReimbursementTable({ reimbursement, paymentMethodSelectOptions, setSelectedReimbursement, handleReimbursementsUpdate }: SingleReimbursementTableProps) {

    const [isEditing, setIsEditing] = useState(false);
    
    const defaultFormInputs = {
        name: reimbursement.title || '',
        amount: reimbursement.amount.toString(),
        paymentMethod: reimbursement.paymentMethod?.id?.toString() || '',
        date: reimbursement.date,
        description: reimbursement.description || ''
    };
    const { fields, updateForm, resetForm } = useForm(defaultFormInputs);

    const updateReimbursementWithData = updateReimbursement.bind(null, reimbursement.id, fields);
    const deleteReimbursementById = deleteReimbursement.bind(null, reimbursement.id);


    async function handleSaveChanges() {

        const result = await updateReimbursementWithData();

        if ("error" in result) {
            toast.error(result.error);
        } else {
            toast.success("Reimbursement has been updated!");
            handleReimbursementsUpdate(result, 'update');
        }

        setIsEditing(false);
        resetForm(defaultFormInputs);
        setSelectedReimbursement(null);
    }

    async function handleDelete() {

        if (confirm("Are you sure you want to delete this reimbursement?")) {
            const result = await deleteReimbursementById();

            if ("error" in result) {
                toast.error(result.error);
            } else {
                toast.success("Reimbursement has been deleted!");
                handleReimbursementsUpdate(result, 'delete');
            }

            setIsEditing(false);
            resetForm(defaultFormInputs);
            setSelectedReimbursement(null);
        }
    }

    function handleCancel() {
        setIsEditing(false);
        resetForm(defaultFormInputs);
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        updateForm({ key: name, value });
    }

    return (
        <>  
            <UnstyledButton
                fz={"sm"}
                className="font-medium text-blue-500 hover:underline"
                onClick={() => setSelectedReimbursement(null)}
            >
                View All Activities
            </UnstyledButton>
            <div className="reimbursementInfo">
                {isEditing ? (
                    <ReimbursementEditButtons
                        handleSaveChanges={handleSaveChanges}
                        handleDelete={handleDelete}
                        handleCancel={handleCancel}
                    />
                ) : (
                    <button
                        type="button"
                        className="btn btn-primary my-5"
                        onClick={() => setIsEditing(true)}
                    >
                        Edit
                    </button>
                )}
                <Table className="single-reimbursement-table">
                    <TableThead>
                        <TableTr>
                            <TableTh className="rounded-tl">Property</TableTh>
                            <TableTh className="rounded-tr">Value</TableTh>
                        </TableTr>
                    </TableThead>
                    <TableTbody>
                        <TableTr>
                            <TableTh>Name</TableTh>
                            <TableTd>
                                {isEditing ? (
                                    <TextInput
                                        id="name"
                                        name="name"
                                        placeholder="Reimbursement Name"
                                        required
                                        value={fields.name}
                                        onChange={(e) => handleInputChange(e)}
                                    />
                                ) :
                                (
                                    fields.name ?? "No Name"
                                )}
                            </TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>Description</TableTh>
                            <TableTd>
                                {isEditing ? (
                                    <Textarea
                                        id="description"
                                        name="description"
                                        placeholder="Optional: Write some notes about what this reimbursement was for..."
                                        rows={3}
                                        value={fields.description}
                                        onChange={handleInputChange}
                                    />
                                ) :
                                (
                                    fields.description ?? "No Description"
                                )}
                            </TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>Amount</TableTh>
                            <TableTd>
                                {isEditing ? (
                                    <TextInput
                                        inputMode="decimal"
                                        id="amount"
                                        name="amount"
                                        pattern="[0-9]+(?:\.[0-9]{0,2})?"
                                        placeholder="0.00"
                                        required
                                        value={fields.amount}
                                        onChange={handleInputChange}
                                    />
                                ) :
                                (
                                    toCurrency(parseFloat(fields.amount)) ?? "$0.00"
                                )}
                            </TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>Date</TableTh>
                            <TableTd>
                                {isEditing ? (
                                    <DateInput
                                        id="date"
                                        name="date"
                                        valueFormat="M/DD/YYYY"
                                        required
                                        value={fields.date}
                                        onChange={(e) => updateForm({key: "date", value: e})}
                                    />
                                ) :
                                (
                                    getFormattedDate(fields.date) ?? "N/A"
                                )}
                            </TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>Payment Method</TableTh>
                            <TableTd>
                                {isEditing ? (
                                    <Select
                                        data={paymentMethodSelectOptions}
                                        id="payment-method"
                                        name="paymentMethod"
                                        placeholder="Select Payment Method"
                                        required
                                        value={fields.paymentMethod}
                                        onChange={(_value, option) => updateForm({key: 'paymentMethod', value: option.value})}
                                    />
                                ) :
                                (
                                    reimbursement.paymentMethod?.name ?? "Payment Method Selected"
                                )}
                            </TableTd>
                        </TableTr>
                    </TableTbody>
                </Table>
                
                {isEditing ? (
                    <ReimbursementEditButtons
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

function ReimbursementEditButtons({ handleSaveChanges, handleDelete, handleCancel }: {handleSaveChanges: () => void, handleDelete: () => void, handleCancel: () => void}) {
    return (
        <div className="flex gap-3 my-5">
            <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSaveChanges}
            >
                Save Changes
            </button>
            <button
                type="submit"
                className="btn btn-red"
                onClick={handleDelete}
            >
                Delete
            </button>
            <UnstyledButton
                className="font-medium text-blue-500 hover:underline"
                onClick={handleCancel}
            >
                Cancel
            </UnstyledButton>
        </div>
    );
}