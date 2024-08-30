'use client'

import { useState } from "react";
import { Dispatch, SetStateAction } from "react";
import { ParentCategoryObj, CategoriesSorted } from "@/budget-types";
import AddCategory from "./AddCategory";

export default function CategoryListing({categoriesSorted}: {categoriesSorted: CategoriesSorted}) {

    const [categories, setCategories] = useState<CategoriesSorted>(categoriesSorted);

    return (
        <>
            <div className="flex gap-1 items-center mb-3">
                <p className="text-white">Add New Parent Category:</p>
                <AddCategory parentId={null} setCategories={setCategories} />
            </div>
            {Object.keys(categories).map((key: string) => {
                const id = parseInt(key);
                return (
                    <CategoryTable key={id} category={categories[id]} setCategories={setCategories} />
                );
            })}
        </>
    )
}


function CategoryTable({ category, setCategories }: {category: ParentCategoryObj, setCategories: Dispatch<SetStateAction<CategoriesSorted>>}) {

    return (
        <>
            <div className="relative overflow-x-auto sm:rounded-lg mb-9">
                <table className="w-full text-sm text-left rtl:text-right text-gray-400">
                    <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Parent Category
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Sub-Category
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.items.length > 0
                            ? category.items.map((subCat) => (
                                  <tr
                                      key={subCat.id}
                                      className="border-b bg-gray-800 border-gray-700"
                                  >
                                      <th
                                          scope="row"
                                          className="px-6 py-4 font-medium whitespace-nowrap text-white"
                                      >
                                          {category.name}
                                      </th>
                                      <td className="px-6 py-4">{subCat.name}</td>
                                  </tr>
                              ))
                            : 
                            <tr className="border-b bg-gray-800 border-gray-700">
                                <td
                                    scope="row"
                                    className="px-6 py-4 font-medium whitespace-nowrap text-white"
                                >
                                   {category.name}
                                </td>
                                <td>No Sub-Categories Available.</td>
                            </tr>
                        }
                        <tr className="border-b bg-gray-800 border-gray-700">
                            <td
                                scope="row"
                                className="px-6 py-4 font-medium whitespace-nowrap text-white"
                            >
                                Add {category.name} Sub-Category</td>
                            <td className="px-6 py-4"><AddCategory parentId={category.id} setCategories={setCategories} /></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}