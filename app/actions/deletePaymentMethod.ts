'use server'

import prisma from "@/lib/db";
import { revalidatePath } from "next/cache";
import { getUserId } from "@/helpers/getUserId";
import { getErrorMessage } from "@/helpers/getErrorMessage";

export async function deletePaymentMethod(deleteId: number, reassignId: number | null) {
    const userId = getUserId();

    if (!userId) {
        return new Response("Unauthorized", { status: 401 });
    }

    try {
        const childCounts = await prisma.paymentMethod.findUnique({
            where: {
                id: deleteId,
                userId: userId,
            },
            include: {
                _count: {
                    select: {
                        activities: true,
                        reimbursements: true,
                    }
                }
            }
        });

        const activityCount = childCounts?._count.activities || 0;
        const reimbursementCount = childCounts?._count.reimbursements || 0;
    
        if (activityCount > 0 && reassignId === null) {
            return {
                error: "This payment method has activities. Please reassign them before deleting."
            };
        }

        if (reimbursementCount > 0) {
            return {
                error: "This payment method has reimbursements. Please reassign them before deleting."
            };
        }

        const transactions = [];

        // reassign activities to new category if needed
        if (activityCount > 0 && reassignId !== null) {
            transactions.push(
                prisma.activity.updateMany({
                    where: {
                        paymentMethodId: deleteId,
                        userId: userId,
                    },
                    data: {
                        paymentMethodId: reassignId
                    }
                })
            );
        }

        // reassign reimbursements to new category if needed
        if (reimbursementCount > 0 && reassignId !== null) {
            transactions.push(
                prisma.reimbursement.updateMany({
                    where: {
                        paymentMethodId: deleteId,
                        userId: userId,
                    },
                    data: {
                        paymentMethodId: reassignId
                    }
                })
            );
        }

        // delete category
        transactions.push(
            prisma.paymentMethod.delete({
                where: {
                    id: deleteId,
                    userId: userId,
                }
            })
        );

        await prisma.$transaction(transactions);

        revalidatePath("/manage/payment-methods");

        return {
            success: true
        };
    } catch(error) {
        return {
            error: getErrorMessage(error)
        }
    }
}