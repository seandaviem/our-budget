'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/helpers/getUserId";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import { ItemsObjType, ItemsObj } from "@/components/CategoryListingPage/CategoryListingPage";

export async function addCategory(fields: ItemsObjType<ItemsObj>, parentId: number) {
    const userId = getUserId();

    if (!userId) {
        return new Response("Unauthroized", { status: 401 });
    }

    const name = fields.name;
    const icon = fields.icon;
    const parentCategoryId = parentId;

    if (!name || !icon || !parentId) {
        return {
            error: "Name, icon, and parent category are required."
        }
    }

    try {
        const response = await prisma.category.create({
            data: {
                userId,
                name: name as string,
                icon: icon,
                parentCategoryId
            },
            select: {
                id: true,
                name: true,
                icon: true
            }
        });

        revalidatePath("/manage/categories");

        return response;
    } catch(error) {
        return {
            error: getErrorMessage(error)
        }
    }
}