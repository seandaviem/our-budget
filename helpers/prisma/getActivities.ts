import prisma from "@/lib/db";
import { getUserId } from "../getUserId";
import { ActivitiesObj } from "@/budget-types";
import { DateRangeProps } from "../getDateRangeObj";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { Prisma } from "@prisma/client";

export async function getActivities(limit = -1, dateRangeObj: DateRangeProps | null = null, startDate = '', endDate = ''): Promise<ActivitiesObj[]> {
    const userId = getUserId();
    const activityQuery: Prisma.ActivityFindManyArgs<DefaultArgs> = {
        where: { 
            userId: userId,
            activityTypeId: {
                notIn: [3] // Exclude reimbursements
            }
        },
        select: {
            id: true,
            date: true,
            title: true,
            description: true,
            amount: true,
            activityType: true,
            category: true,
            paymentMethod: true,
            reimbursements: true,
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
        activityQuery.where!.date! = {
            gte: new Date(dateQueryStart),
            lte: new Date(dateQueryEnd)
        }
    }

    if (limit > 0) {
        activityQuery["take"] = limit;
    }

    //TODO: Fix - Something weird going on with the typing here...
    const activities: any = await prisma.activity.findMany(activityQuery);

    return activities;
}