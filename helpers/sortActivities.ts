import { ActivitiesObj } from "./prisma/getActivities";

interface SortedActivitiesObj {
    [activityTypeId: number]: {
        name: string;
        total: number;
        categories: {
            [categoryId: number]: {
                name: string;
                parentCategoryId: number | null;
                total: number;
                activities: ActivitiesObj[];
            }
        }
    }
}

export function sortActivities(activities: ActivitiesObj[]): SortedActivitiesObj {

    const sortedActivities: SortedActivitiesObj = {};

    for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        const activityTypeId = activity.activityType?.id || 0;
        const categoryId = activity.category?.id || 0;

        if (!sortedActivities[activityTypeId]) {
            sortedActivities[activityTypeId] = {
                name: activity.activityType?.name || 'Uncategorized',
                total: activity.amount,
                categories: {}
            }
        } else {
            sortedActivities[activityTypeId].total += activity.amount;
        }

        const activityType = sortedActivities[activityTypeId];

        if (!activityType.categories[categoryId]) {
            activityType.categories[categoryId] = {
                name: activity.category?.name || 'Uncategorized',
                parentCategoryId: activity.category?.parentCategoryId || null,
                total: activity.amount,
                activities: [activity]
            }
        } else {
            activityType.categories[categoryId].total += activity.amount;
            activityType.categories[categoryId].activities.push(activity);
        }

    }

    return sortedActivities;
}