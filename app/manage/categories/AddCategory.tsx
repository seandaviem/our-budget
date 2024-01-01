'use client'

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { CategoriesSorted, sortCategories } from "./categoryHelpers";
import AddButton from "@/app/components/AddButton";

interface AddCategoryProps {
    parentId: number | null;
    setCategories: Dispatch<SetStateAction<CategoriesSorted>>
}

export default function AddCategory({parentId, setCategories}: AddCategoryProps) {

    const [category, setCategory] = useState("");

    function handleAddCategory() {

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
        });

    }

    return (
        <div className="flex items-center">
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Sub-Category Name"  value={category} onChange={(e) => setCategory(e.target.value)} />

            <AddButton handleAdd={handleAddCategory} />
        </div>
    )
}