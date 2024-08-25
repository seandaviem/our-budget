'use client'

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { getFormattedDate } from "@/helpers/getFormattedDate";
import { addReimbursement } from "@/app/actions/addReimbursement";
import toast from "react-hot-toast";
import SubmitButton from "@/components/SubmitButton";
import { useForm } from "@/helpers/hooks/useForm";
import { ComboboxData, Select, Textarea, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { ReimbursementsObj } from "@/budget-types";
interface AddReimbursementFormProps {
    activityId: number;
    paymentMethodSelectOptions: ComboboxData;
    setShowReimbursementForm: Dispatch<SetStateAction<boolean>>;
    handleReimbursementsUpdate: (newReimbursement: ReimbursementsObj) => void;
}

export default function AddReimbursementForm({activityId, paymentMethodSelectOptions, setShowReimbursementForm, handleReimbursementsUpdate}: AddReimbursementFormProps) {

    const currentDate = new Date(getFormattedDate());

    const defaultFormInputs = {
        name: '',
        amount: '',
        paymentMethod: '',
        date: currentDate,
        description: ''
    }
    const { fields, updateForm, resetForm } = useForm(defaultFormInputs);

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        updateForm({ key: name, value });
    }

    return (
        <form
            action={async (formData: FormData) => {

                const result = await addReimbursement(formData, activityId);

                if ('error' in result) {
                    toast.error(result.error);
                } else {
                    toast.success("Reimbursement has been added!");

                    handleReimbursementsUpdate(result);
                    resetForm();
                    setShowReimbursementForm(false);
                }
            }}
        >
            <div className="mb-5">
                <TextInput
                    id="name"
                    name="name"
                    label="Reimbursement Name"
                    placeholder="Reimbursement Name"
                    required
                    value={fields.name}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-5">
                <TextInput
                    inputMode="decimal"
                    id="amount"
                    name="amount"
                    label="Amount"
                    pattern="[0-9]+(?:\.[0-9]{0,2})?"
                    placeholder="0.00"
                    required
                    value={fields.amount}
                    onChange={handleInputChange}
                />
            </div>
            <div className="mb-5">
                <Select
                    data={paymentMethodSelectOptions}
                    id="payment-method"
                    name="paymentMethod"
                    label="Payment Method"
                    placeholder="Select Payment Method"
                    required
                    value={fields.paymentMethod ? fields.paymentMethod : null}
                    onChange={(_value, option) => updateForm({key: 'paymentMethod', value: option.value})}
                />
            </div>
            <div className="mb-5">
                <DateInput
                    id="date"
                    name="date"
                    label="Date"
                    valueFormat="M/DD/YYYY"
                    required
                    value={fields.date}
                    onChange={(e) => updateForm({key: "date", value: e})}
                />
            </div>
            <div className="mb-5">
                <Textarea
                    id="description"
                    name="description"
                    label="Description"
                    placeholder="Optional: Write some notes about what this activity was for..."
                    rows={3}
                    value={fields.description}
                    onChange={handleInputChange}
                />
            </div>

            <SubmitButton />
        </form>
    );
}