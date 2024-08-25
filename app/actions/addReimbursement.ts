'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/helpers/getUserId";
import { getErrorMessage } from "@/helpers/getErrorMessage";

//TODO: Add validation here
export async function addReimbursement(formData: FormData, activityId: number) {
    const name = formData.get("name");
    const amount = formData.get("amount");
    const paymentMethodId = formData.get("paymentMethod");
    const date = formData.get("date");
    const isoDate = (new Date(date as string)).toISOString();
    const description = formData.get("description");
    const userId = getUserId();

    try {
        const response = await prisma.reimbursement.create({
            data: {
                activityId: activityId,
                title: String(name),
                amount: Number(amount),
                paymentMethodId: Number(paymentMethodId),
                date: isoDate,
                description: String(description),
                userId: userId
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