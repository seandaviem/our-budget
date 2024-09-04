import { getUserId } from "@/helpers/getUserId";
import { getCategories } from "@/helpers/prisma/getCategories";
import { sortCategories } from "./categoryHelpers";
import { Metadata } from "next"
import CategoryListingPage from "@/components/CategoryListingPage/CategoryListingPage";
import { addCategory } from "@/app/actions/addCategory";
import { updateCategory } from "@/app/actions/updateCategory";
import { deleteCategory } from "@/app/actions/deleteCategory";
import { Toaster } from "react-hot-toast";
import { getCategorySelectOptions } from "@/helpers/selectOptionHelpers";

export const metadata: Metadata = {
    title: 'Manage Categories | Our Budget',
    description: 'Add and remove categories to your budget portal.',
}


export default async function ManageCategories() {
    const userId = getUserId();

    const categories = await getCategories();
    const categoriesSorted = sortCategories(categories);
    const categorySelectOptions = getCategorySelectOptions(categoriesSorted);

    return (
        <>
            <main className="container mx-auto max-sm:px-5">
                {/* <CategoryListing categoriesSorted={categoriesSorted} /> */}
                <div className="my-10">
                    <CategoryListingPage 
                        data={categoriesSorted} 
                        onAddCategory={addCategory}
                        onEditCategory={updateCategory}
                        onDeleteCategory={deleteCategory}
                        reassignOptions={categorySelectOptions}
                    />
                </div>
            </main>
            <Toaster />
        </>
    );

}