import prisma from "@/app/lib/db";
import { getUserId } from "../getUserId";
import { CategoryObj } from "@/app/manage/categories/categoryHelpers";

export async function getCategories() {
    const userId = getUserId();
    const categories: CategoryObj[] = await prisma.category.findMany({ 
        where: { userId: userId },
        select: {
            id: true,
            name: true,
            parentCategoryId: true
        },
        orderBy: [
            {
                parentCategoryId: 'asc',
            },
            {
                name: 'asc',
            },
        ],
    });

    return categories;
}