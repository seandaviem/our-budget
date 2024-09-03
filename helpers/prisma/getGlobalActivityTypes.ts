import prisma from "@/lib/db";
import { ActivityTypes } from "@/budget-types";

export async function getGlobalActivityTypes() {
    const activityTypes: ActivityTypes[] = await prisma.activityType.findMany({ 
        where: {
            id: {
                notIn: [3] // Exclude reimbursements
            }
        },
        select: {
            id: true,
            name: true,
        },
    });

    return activityTypes || [];
}