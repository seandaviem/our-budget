import prisma from "@/lib/db";
import { getUserId } from "../getUserId";
import { CategoryObj } from "@/budget-types";

export async function getCategories() {
    const userId = getUserId();
    const categories: CategoryObj[] = await prisma.category.findMany({ 
        where: { userId: userId },
        select: {
            id: true,
            name: true,
            icon: true,
            parentCategoryId: true,
            _count: {
                select: {
                    activities: true
                }
            }
        },
        orderBy: [
            {
                id: 'asc',
            },
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