"use client"

import { ItemsDeletedResponse, ItemsObjType } from "./CategoryListingPage/CategoryListingPage";
import React, { useState } from "react";
import { ComboboxData, ComboboxItem, Select } from "@mantine/core";
import toast from "react-hot-toast";
import LoadButton from "./LoadButton";

interface EditCategoryFormProps<T> {
    category: ItemsObjType<T>;
    reassignOptions: ComboboxData;
    onUpdate: () => void;
    onDeleteCategory: (deleteId: number, reassignId: number | null) => ItemsDeletedResponse;
}

export default function DeleteCategoryForm<T>({ category, reassignOptions, onUpdate, onDeleteCategory }: EditCategoryFormProps<T>) {

    const [ reassignId, setReassignId ] = useState<number | null>(null);
    const [disableButton, setDisableButton] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);

    const deleteCategoryWithData = onDeleteCategory.bind(null, category.id, reassignId);

    async function handleDeleteCategory() {
        setIsDeleting(true);

        const result = await deleteCategoryWithData().then((res) => {
            setIsDeleting(false);
            return res;
        });

        if ("error" in result) {
            toast.error(result.error);
        } else {
            toast.success("Category has been deleted!");
        }

        onUpdate();

    }

    function handleSelectChange(_value: string | null, option: ComboboxItem) {
        setReassignId(parseInt(option.value) as number);
        setDisableButton(false);
    }

    return (
        <>
            <div className="categoryForm flex flex-col gap-4">
                <h3>The following items are associated with this category:</h3>
                <ul>
                    {Object.keys(category._count).map((key) => {
                        return (
                            <li key={key}>
                                {key}: {category._count[key]}
                            </li>
                        );
                    })}
                </ul>
                <Select
                    data={reassignOptions}
                    id="category"
                    name="category"
                    placeholder="Select Category"
                    required
                    value={reassignId?.toString()}
                    onChange={handleSelectChange}
                />
                <div className="mt-5 flex gap-3">
                    <LoadButton 
                        className="btn btn-red"
                        loadingText="Deleting..."
                        isLoading={isDeleting}
                        disabled={disableButton}
                        onClick={handleDeleteCategory}
                    >
                        Re-Assign and Delete
                    </LoadButton> 
                </div>
            </div>
        </>
    );
}