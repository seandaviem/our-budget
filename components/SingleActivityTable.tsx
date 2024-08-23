'use client'

import { ChangeEvent, useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ActivitiesObj } from "@/helpers/prisma/getActivities";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import { CategoriesSorted } from "@/app/manage/categories/categoryHelpers";
import { PaymentMethodObj } from "@/app/manage/payment-methods/paymentMethodHelpers";
import { getCategorySelectOptions, getPaymentMethodSelectOptions } from "@/helpers/selectOptionHelpers";
import { useForm } from "@/helpers/hooks/useForm";
import { updateActivity } from "@/app/actions/updateActivity";
import { deleteActivity } from "@/app/actions/deleteActivity";
import toast from "react-hot-toast";
import { Select, Table, TableTbody, TableTd, TableTh, TableThead, TableTr, Textarea, TextInput, UnstyledButton } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { toCurrency } from "@/helpers/toCurrency";


interface SetStateProp {
    setSelectedActivity: Dispatch<SetStateAction<ActivitiesObj | null>>;
}

interface SingleActivityTableProps extends SetStateProp {
    activity: ActivitiesObj;
    categoryOptions: CategoriesSorted;
    paymentMethodOptions: PaymentMethodObj[];
}


export default function SingleActivityTable({ activity, categoryOptions, paymentMethodOptions, setSelectedActivity }: SingleActivityTableProps) {

    const [isEditing, setIsEditing] = useState(false);
    
    const defaultFormInputs = {
        category: activity.category?.id?.toString() || '',
        name: activity.title || '',
        amount: activity.amount.toString(),
        paymentMethod: activity.paymentMethod?.id?.toString() || '',
        date: activity.date,
        description: activity.description || ''
    };
    const { fields, updateForm, resetForm } = useForm(defaultFormInputs);

    const categorySelectOptions = getCategorySelectOptions(categoryOptions);

    const paymentMethodSelectOptions = getPaymentMethodSelectOptions(paymentMethodOptions, activity.activityType?.id || -1);

    //TODO: UPDATE DATE
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

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        updateForm({ key: name, value });
    }

    return (
        <>
            <UnstyledButton
                fz={"sm"}
                className="font-medium text-blue-500 hover:underline"
                onClick={() => setSelectedActivity(null)}
            >
                View All Activities
            </UnstyledButton>
            <div className="activityInfo">
                {isEditing ? (
                    <ActivityEditButtons
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
                <Table className="single-activity-table">
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
                                        placeholder="Activity Name"
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
                                        placeholder="Optional: Write some notes about what this activity was for..."
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
                            <TableTh>Activity Type</TableTh>
                            <TableTd>{activity.activityType?.name ?? "N/A"}</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>Category</TableTh>
                            <TableTd>
                                {isEditing ? (
                                    <Select
                                        data={categorySelectOptions}
                                        id="category"
                                        name="category"
                                        placeholder="Select Category"
                                        required
                                        value={fields.category}
                                        onChange={(_value, option) => updateForm({key: 'category', value: option.value})}
                                    />
                                ) :
                                (
                                    activity.category?.name ?? "No Category Selected"
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
                                    activity.paymentMethod?.name ?? "Payment Method Selected"
                                )}
                            </TableTd>
                        </TableTr>
                    </TableTbody>
                </Table>
                
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