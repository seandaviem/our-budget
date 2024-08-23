'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/helpers/getUserId";
import { getErrorMessage } from "@/helpers/getErrorMessage";

//TODO: Add validation here
export async function addActivity(formData: FormData) {
    const activityTypeId = formData.get("activityType");
    const categoryId = formData.get("category");
    const name = formData.get("name");
    const amount = formData.get("amount");
    const paymentMethodId = formData.get("paymentMethod");
    const date = formData.get("date");
    const isoDate = (new Date(date as string)).toISOString();
    const description = formData.get("description");
    const userId = getUserId();

    try {
        await prisma.activity.create({
            data: {
                activityTypeId: Number(activityTypeId),
                categoryId: Number(categoryId),
                title: String(name),
                amount: Number(amount),
                paymentMethodId: Number(paymentMethodId),
                date: isoDate,
                description: String(description),
                userId: userId
            }
        });
    } catch(error) {
        return {
            error: getErrorMessage(error)
        }
    }

    revalidatePath("/activities/add-activity");
}