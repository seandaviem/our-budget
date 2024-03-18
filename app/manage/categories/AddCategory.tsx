'use client'

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { CategoriesSorted, sortCategories } from "./categoryHelpers";
import AddButton from "@/components/AddButton";

interface AddCategoryProps {
    parentId: number | null;
    setCategories: Dispatch<SetStateAction<CategoriesSorted>>
}

export default function AddCategory({parentId, setCategories}: AddCategoryProps) {

    const [category, setCategory] = useState("");
    const [isAdding, setIsAdding] = useState(false);

    function handleAddCategory() {

        setIsAdding(true);

        const postCategory = async () => {
            const body = {
                name: category,
                parentCategoryId: parentId
            }

            try {
                const response = await fetch("../../api/categories", {
                    method: "POST",
                    body: JSON.stringify(body)
                });
    
                const data = await response.json();

                return data;

            } catch(error) {
                console.log(error);
                return;
            }
        }

        postCategory().then((res) => {
            if (res.success) {
                const updatedCategories = sortCategories(res.data);
                setCategories(updatedCategories);
                setCategory('');
            }

            setIsAdding(false);
        });

    }

    return (
        <div className="flex items-center">
            <input type="text" className="border text-sm rounded-lg p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Sub-Category Name"  value={category} onChange={(e) => setCategory(e.target.value)} />

            <AddButton isAdding={isAdding} handleAdd={handleAddCategory} />
        </div>
    )
}