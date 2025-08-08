import { NextResponse } from "next/server";
import { generateFeedback } from "@/controllers/feedback.controller";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
    const body = await req.json();
    await connectDB();

    try {
        const feedback = await generateFeedback(body);

        return NextResponse.json({ success: true, data: feedback }, { status: 200 });
    } catch (error) {
        console.log("error in feedback generation", error);

        return NextResponse.json(
            {
                success: false,
                message: "Internal server error in feedback",
            },
            { status: 500 }
        );
    }
}
