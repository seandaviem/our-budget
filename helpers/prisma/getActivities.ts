import prisma from "@/lib/db";
import { getUserId } from "../getUserId";
import { ActivitiesObj } from "@/budget-types";
import { DateRangeProps } from "../getDateRangeObj";

export async function getActivities(limit = -1, dateRangeObj: DateRangeProps | null = null, startDate = '', endDate = ''): Promise<ActivitiesObj[]> {
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
            paymentMethod: true,
            reimbursements: true
        },
        orderBy: [
            {
                date: 'desc',
            },
            {
                id: 'desc'
            }
        ]
    }

    // Get start and end date from dateRangeObj if it exists, otherwise use startDate and endDate if it exists
    let dateQueryStart = '';
    let dateQueryEnd = '';
    if (dateRangeObj && dateRangeObj.hasRangeParams) {
        dateQueryStart = dateRangeObj.startDate;
        dateQueryEnd = dateRangeObj.endDate;
    } else if (startDate && endDate) {
        dateQueryStart = startDate;
        dateQueryEnd = endDate;
    } 
    // If dateQueryStart and dateQueryEnd are valid, add them to the query
    if (dateQueryStart && dateQueryEnd) {
        activityQuery["where"]["date"] = {
            gte: new Date(dateQueryStart),
            lte: new Date(dateQueryEnd)
        }
    }

    if (limit > 0) {
        activityQuery["take"] = limit;
    }

    const activities = await prisma.activity.findMany(activityQuery);

    return activities;
}