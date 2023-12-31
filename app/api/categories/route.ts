import { NextResponse } from "next/server";
import { CategoryObj } from "@/app/manage/categories/categoryHelpers";
import prisma from "@/app/lib/db";
import { getUserId } from "@/app/helpers/getUserId";


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

export async function getCategories() {
    const userId = getUserId();
    const categories: CategoryObj[] = await prisma.category.findMany({ 
        where: { userId: userId },
        select: {
            id: true,
            name: true,
            parentCategoryId: true
        },
        orderBy: [
            {
                parentCategoryId: 'asc',
            },
            {
                name: 'asc',
            },
        ],
    });

    return categories;
}