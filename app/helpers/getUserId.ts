import { auth } from '@clerk/nextjs';

export function getUserId(): string {
    const authObj = auth();
    let userId = '';

    if (authObj && authObj.orgId !== undefined) {
        userId = authObj.orgId as string;
    } else if (authObj && authObj.orgId === undefined) {
        userId = authObj.userId as string;
    }

    return userId;
}