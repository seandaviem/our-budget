import { NextResponse } from "next/server";
import prisma from "@/app/lib/db";
import { getUserId } from "@/app/helpers/getUserId";
import { getCategories } from "@/app/helpers/prisma/getCategories";


export async function POST(req: Request) {
    const userId = getUserId();

    if (!userId) {
        return new Response("Unauthroized", { status: 401 });
    }

    const { name, parentCategoryId } = await req.json();

    const res = await prisma.category.create({
        data: {
            userId,
            name,
            parentCategoryId
        }
    });

    if (res.id !== undefined) {
        const categories = await getCategories();

        return NextResponse.json({
            success: true,
            message: "Category successfully created",
            data: categories
        }, { status: 200 });
    }

    return NextResponse.json({success: false, message: "Something went wrong."}, { status: 500 });
}