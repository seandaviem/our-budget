import { auth } from '@clerk/nextjs';

export function getUserId() {
    const authObj = auth();

    return authObj.orgId === undefined ? authObj.userId : authObj.orgId;
}