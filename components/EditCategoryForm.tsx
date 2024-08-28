"use client"

import { useForm } from "@/helpers/hooks/useForm";
import { ItemsObjType } from "./CategoryListingPage/CategoryListingPage";
import { ChangeEvent, useRef, useState } from "react";
import { Grid, TextInput } from "@mantine/core";

export default function EditCategoryForm<T>({ category }: { category: ItemsObjType<T> }) {

    const { fields, updateForm } = useForm({
        id: category.id,
        name: category.name,
    });
    const usedInputRef = useRef(false);
    const [disableButton, setDisableButton] = useState(true);

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        updateForm({ key: name, value });

        if (!usedInputRef.current) {
            usedInputRef.current = true;
            setDisableButton(false);
        }
    }

    return (
        <div className="categoryForm">
            <TextInput
                id="name"
                name="name"
                label="Name"
                placeholder="Name"
                required
                value={fields.name}
                onChange={handleInputChange}
            />
            <div className="mt-5 flex gap-3">
                <button className="btn btn-primary" disabled={disableButton}>Save</button>
                <button className="btn btn-red">Delete</button>
            </div>
        </div>
    );
}