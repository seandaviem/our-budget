'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/helpers/getUserId";
import { getErrorMessage } from "@/helpers/getErrorMessage";
import { ActivityTypeEnum } from "@/budget-types";

//TODO: Add validation here
export async function addReimbursement(formData: FormData, activityId: number) {
    const name = formData.get("name");
    const amount = formData.get("amount");
    const paymentMethodId = formData.get("paymentMethod");
    const date = formData.get("date");
    const isoDate = (new Date(date as string)).toISOString();
    const description = formData.get("description");
    const userId = getUserId();

    // check to make sure activity is of type expense in db
    const activity = await prisma.activity.findUnique({
        where: {
            id: activityId,
            userId: userId,
            activityTypeId: ActivityTypeEnum.Expense || ActivityTypeEnum.BigExpense
        }
    });

    if (!activity) {
        return {
            error: "Activity does not exist or is not an expense."
        }
    }

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