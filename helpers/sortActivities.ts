import { ActivitiesObj, ActivityTypes } from "@/budget-types";

interface SortedActivityCategoryObj {
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
export interface SortedActivitiesObj {
    [activityTypeId: number]: SortedActivityCategoryObj
}

export function sortActivities(activities: ActivitiesObj[], globalActivityTypes: ActivityTypes[]): SortedActivitiesObj {

    const sortedActivities: SortedActivitiesObj = {};

    // create base sorted activities object based on the available global activity types
    for (let i = 0; i < globalActivityTypes.length; i++) {
        const activityType = globalActivityTypes[i];
        sortedActivities[activityType.id] = {
            name: activityType.name,
            total: 0,
            categories: {}
        }
    }

    for (let i = 0; i < activities.length; i++) {
        const activity = activities[i];
        const activityTypeId = activity.activityType?.id || 0;
        const categoryId = activity.category?.id || 0;

        if (!sortedActivities[activityTypeId]) {
            sortedActivities[activityTypeId] = {
                name: activity.activityType?.name || 'Uncategorized',
                total: parseFloat(activity.amount.toFixed(2)),
                categories: {}
            }
        } else {
            sortedActivities[activityTypeId].total = parseFloat(sortedActivities[activityTypeId].total.toFixed(2)) + parseFloat(activity.amount.toFixed(2));
        }

        const activityType = sortedActivities[activityTypeId];

        if (!activityType.categories[categoryId]) {
            activityType.categories[categoryId] = {
                name: activity.category?.name || 'Uncategorized',
                parentCategoryId: activity.category?.parentCategoryId || null,
                total: parseFloat(activity.amount.toFixed(2)),
                activities: [activity]
            }
        } else {
            activityType.categories[categoryId].total = parseFloat(activityType.categories[categoryId].total.toFixed(2)) +  parseFloat(activity.amount.toFixed(2));
            activityType.categories[categoryId].activities.push(activity);
        }

    }

    return sortedActivities;
}