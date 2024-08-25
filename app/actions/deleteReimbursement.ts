'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/helpers/getUserId";
import { getErrorMessage } from "@/helpers/getErrorMessage";

export async function deleteReimbursement(reimbursementId: number) {
    const userId = getUserId();

    try {
        const response = await prisma.reimbursement.delete({
            where: {
                userId: userId,
                id: reimbursementId
            }
        });

        revalidatePath("/activities");
        revalidatePath("/activities/add-activity");

        return response;
    } catch(error) {
        return {
            error: getErrorMessage(error)
        }
    }
}