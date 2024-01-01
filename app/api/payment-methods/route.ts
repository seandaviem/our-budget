import { NextResponse } from "next/server";
import { PaymentMethodObj } from "@/app/manage/payment-methods/paymentMethodHelpers";
import prisma from "@/app/lib/db";
import { getUserId } from "@/app/helpers/getUserId";


export async function POST(req: Request) {
    const userId = getUserId();

    if (!userId) {
        return new Response("Unauthroized", { status: 401 });
    }

    const { name, activityTypeId } = await req.json();

    const res = await prisma.paymentMethod.create({
        data: {
            userId,
            name,
            activityTypeId
        }
    });

    if (res.id !== undefined) {
        const paymentMethods = await getPaymentMethods();

        return NextResponse.json({
            success: true,
            message: "Payment Method successfully created",
            data: paymentMethods
        }, { status: 200 });
    }

    return NextResponse.json({success: false, message: "Something went wrong."}, { status: 500 });
}

export async function getPaymentMethods() {
    const userId = getUserId();
    const paymentMethods: PaymentMethodObj[] = await prisma.paymentMethod.findMany({ 
        where: { userId: userId },
        select: {
            id: true,
            name: true,
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