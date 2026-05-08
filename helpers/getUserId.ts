import { auth } from "@clerk/nextjs/server";

export async function getUserId(): Promise<string> {
  const authObj = await auth();

  if (authObj.orgId) {
    return authObj.orgId;
  }

  if (authObj.userId) {
    return authObj.userId;
  }

  throw new Error("Unauthorized");
}