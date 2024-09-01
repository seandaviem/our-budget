'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/helpers/getUserId";
import { getErrorMessage } from "@/helpers/getErrorMessage";

export async function deleteCategory(deleteId: number, reassignId: number | null) {
    const userId = getUserId();

    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const childCounts = await prisma.category.findUnique({
            where: {
                id: deleteId
            },
            include: {
                _count: {
                    select: {
                        activities: true,
                        category: true,
                    }
                }
            }
        });

        const activityCount = childCounts?._count.activities || 0;
        const categoryCount = childCounts?._count.category || 0;
    
        if (activityCount > 0 && reassignId === null) {
            return {
                error: "This category has activities. Please reassign them before deleting."
            };
        }

        if (categoryCount > 0) {
            return {
                error: "This category has subcategories. Please delete them before deleting."
            };
        }

        const transactions = [];

        // reassign activities to new category if needed
        if (reassignId !== null) {
            transactions.push(
                prisma.activity.updateMany({
                    where: {
                        categoryId: deleteId
                    },
                    data: {
                        categoryId: reassignId
                    }
                })
            );
        }

        // delete category
        transactions.push(
            prisma.category.delete({
                where: {
                    id: deleteId
                }
            })
        );

        await prisma.$transaction(transactions);

        revalidatePath("/manage/categories");

        return {
            success: true
        };
    } catch(error) {
        return {
            error: getErrorMessage(error)
        }
    }
}