import prisma from "@/lib/db";
import { getUserId } from "../getUserId";
import { ActivityTypes } from "./getGlobalActivityTypes";
import { CategoryObj } from "@/app/manage/categories/categoryHelpers";
import { PaymentMethodObj } from "@/app/manage/payment-methods/paymentMethodHelpers";

export interface ActivitiesObj {
    id: number;
    date: Date;
    title: string;
    description: string | null;
    amount: number;
    activityType?: ActivityTypes;
    category?: CategoryObj;
    userId: string;
    paymentMethod?: PaymentMethodObj;
}

export async function getActivities(limit = -1, startDate = '', endDate = ''): Promise<ActivitiesObj[]> {
    const userId = getUserId();
    const activityQuery: any = {
        where: { userId: userId },
        select: {
            id: true,
            date: true,
            title: true,
            description: true,
            amount: true,
            activityType: true,
            category: true,
            paymentMethod: true
        },
        orderBy: {
            date: 'desc',
        }
    }

    if (limit > 0) {
        activityQuery["take"] = limit;
    }

    const activities = await prisma.activity.findMany(activityQuery);

    return activities;
}