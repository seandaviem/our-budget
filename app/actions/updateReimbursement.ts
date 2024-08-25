'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/helpers/getUserId";
import { getErrorMessage } from "@/helpers/getErrorMessage";

export async function updateReimbursement(reimbursementId: number, reimbursementFields: {[key : string] : any}) {
    const userId = getUserId();

    const dataFields: {[key: string] : any} = {};
    if (reimbursementFields.name) {
        dataFields["title"] = String(reimbursementFields.name);
    }
    if (reimbursementFields.amount) {
        dataFields["amount"] = Number(reimbursementFields.amount);
    }
    if (reimbursementFields.paymentMethod) {
        dataFields["paymentMethodId"] = Number(reimbursementFields.paymentMethod);
    }
    if (reimbursementFields.date) {
        dataFields["date"] = (reimbursementFields.date as Date).toISOString();
    }
    if (reimbursementFields.description) {
        dataFields["description"] = String(reimbursementFields.description);
    }

    try {
        const response = await prisma.reimbursement.update({
            where: {
                userId: userId,
                id: reimbursementId
            },
            data: dataFields
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