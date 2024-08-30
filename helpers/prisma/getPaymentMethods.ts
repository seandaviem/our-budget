import prisma from "@/lib/db";
import { getUserId } from "../getUserId";
import { PaymentMethodObj } from "@/budget-types";

export async function getPaymentMethods() {
    const userId = getUserId();
    const paymentMethods: PaymentMethodObj[] = await prisma.paymentMethod.findMany({ 
        where: { userId: userId },
        select: {
            id: true,
            name: true,
            icon: true,
            activityType: true
        },
        orderBy: [
            {
                activityTypeId: 'asc',
            },
            {
                name: 'asc',
            },
        ],
    });

    return paymentMethods;
}