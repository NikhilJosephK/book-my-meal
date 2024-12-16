import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {

    const req = await request.json();
    const { breakfast, lunch, dinner, email, listDay } = await req;

    const user = await prisma.user.findMany({
        where: {
            email: email
        }
    })

    if (user.length > 0) {
        await prisma.meal.create({
            data: {
                userId: user[0].id, // Foreign key linking the meal to the user
                breakfast: String(breakfast),
                lunch: String(lunch),
                dinner: String(dinner),
                listDay: listDay, // Provide a value for 'day' (required field)
            },
        });
    }

    const latestUserData = await prisma.user.findMany({
        where: {
            email: email
        },
        include: {
            meals: true
        }
    })

    return NextResponse.json(
        { message: 'Submitted successfully!', latestUserData },
        { status: 200 }
    );
}


export async function GET(request) {
    const { searchParams } = new URL(request.url); // Parse the request URL
    const email = searchParams.get('email'); // Get the 'email' parameter

    const latestUserData = await prisma.user.findMany({
        where: {
            email: email
        },
        include: {
            meals: true
        }
    })

    if (!email) {
        return new Response("Email is required", { status: 400 });
    }

    return new Response(JSON.stringify(latestUserData));
}
