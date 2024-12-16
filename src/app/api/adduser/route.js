import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

// POST handler
export async function POST(request) {
    try {
        const body = await request.json();
        const { email } = body;
        let userExists;

        const user = await prisma.user.findMany({
            where: { email: { equals: email } },
        });

        if (user.length > 0) {
            userExists = "User Exist"
        } else {
            await prisma.user.create({
                data: {
                    email: email
                }
            });
            userExists = "User Added"
        }

        return NextResponse.json(
            { message: 'Submitted successfully!', userExists },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error handling POST request:', error);

        // Send an error response
        return NextResponse.json(
            { error: 'Something went wrong' },
            { status: 500 } // Internal Server Error
        );
    }
}

