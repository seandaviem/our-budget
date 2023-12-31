import prisma from "@/app/lib/db";
import { getUserId } from "@/app/helpers/getUserId";
import CategoryListing from "./CategoryListing";
import { getCategories } from "@/app/api/categories/route";
import { sortCategories } from "./categoryHelpers";


export default async function ManageCategories() {
    const userId = getUserId();

    const categories = await getCategories();
    const categoriesSorted = sortCategories(categories);

    return (
        <main className="container mx-auto">
            <CategoryListing categoriesSorted={categoriesSorted} />
        </main>
    );

}