'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/helpers/getUserId";
import { getErrorMessage } from "@/helpers/getErrorMessage";

export async function updateActivity(activityId: number, activityFields: {[key : string] : any}) {
    const userId = getUserId();

    const dataFields: {[key: string] : any} = {};
    if (activityFields.activityType) {
        dataFields["activityTypeId"] = Number(activityFields.activityType);
    }
    if (activityFields.category) {
        dataFields["categoryId"] = Number(activityFields.category);
    }
    if (activityFields.name) {
        dataFields["title"] = String(activityFields.name);
    }
    if (activityFields.amount) {
        dataFields["amount"] = Number(activityFields.amount);
    }
    if (activityFields.paymentMethod) {
        dataFields["paymentMethodId"] = Number(activityFields.paymentMethod);
    }
    if (activityFields.date) {
        dataFields["date"] = (activityFields.date as Date).toISOString();
    }
    if (activityFields.description) {
        dataFields["description"] = String(activityFields.description);
    }

    try {
        await prisma.activity.update({
            where: {
                userId: userId,
                id: activityId
            },
            data: dataFields
        });
    } catch(error) {
        return {
            error: getErrorMessage(error)
        }
    }

    revalidatePath("/activities");
    revalidatePath("/activities/add-activity");
}