'use client'

import { useState } from "react";
import LoadButton from "@/components/LoadButton";
import { TextInput } from "@mantine/core";
import { ItemsObjType, ItemsUpdatedResponse } from "@/components/CategoryListingPage/CategoryListingPage";

interface AddCategoryProps<T> {
    placeholder?: string;
    onAddCategory: (item: ItemsObjType<T>, parentId: number | null) => ItemsUpdatedResponse<T>;
}

export default function AddCategoryItemForm<T>({ placeholder = 'Add New Item', onAddCategory }: AddCategoryProps<T>) {

    const [item, setItem] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    const addCategoryWithData = onAddCategory.bind(null, {id: 0, icon: 'IconFileSave', name: item} as ItemsObjType<T>, null);

    function handleAddItem() {

        setIsAdding(true);

        addCategoryWithData().then(() => {
            setIsAdding(false);
            setItem("");
        }); 
    }

    return (
        <div className="flex items-center gap-3">

            <TextInput
                id="name"
                name="name"
                placeholder={placeholder}
                value={item}
                onChange={(e) => setItem(e.target.value)}
            />

            <LoadButton 
                type="button"
                className="btn btn-primary"
                disabled={isAdding} 
                onClick={handleAddItem} 
                isLoading={isAdding}
                withArrow={true}
            >
                Add
            </LoadButton>
        </div>
    )
}