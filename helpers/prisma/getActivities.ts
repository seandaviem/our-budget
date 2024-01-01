import prisma from "@/lib/db";
import { getUserId } from "../getUserId";

// export async function getActivities(limit = -1, startDate = '', endDate = '') {
//     const userId = getUserId();
//     const activityQuery = {
//         where: { userId: userId },
        
//     }
//     const categories: CategoryObj[] = await prisma.category.findMany({ 
//         where: { userId: userId },
//         select: {
//             id: true,
//             name: true,
//             parentCategoryId: true
//         },
//         orderBy: [
//             {
//                 parentCategoryId: 'asc',
//             },
//             {
//                 name: 'asc',
//             },
//         ],
//     });

//     return categories;
// }