import prisma from "../lib/db";

export interface ActivityTypes {
    id: number;
    name: string;
}

export async function getGlobalActivityTypes() {
    const activityTypes: ActivityTypes[] = await prisma.activityType.findMany({ 
        select: {
            id: true,
            name: true,
        },
    });

    return activityTypes || [];
}