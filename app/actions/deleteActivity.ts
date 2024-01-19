'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/helpers/getUserId";
import { getErrorMessage } from "@/helpers/getErrorMessage";

export async function deleteActivity(activityId: number) {
    const userId = getUserId();

    try {
        await prisma.activity.delete({
            where: {
                userId: userId,
                id: activityId
            }
        });
    } catch(error) {
        return {
            error: getErrorMessage(error)
        }
    }

    revalidatePath("/activities");
    revalidatePath("/activities/add-activity");
}