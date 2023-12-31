'use client'

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { CategoriesSorted, sortCategories } from "./categoryHelpers";

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

            <button 
                type="button" 
                className="ms-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleAddCategory}
            >
                Add
                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </button>
        </div>
    )
}