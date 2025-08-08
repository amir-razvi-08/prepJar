import { connectDB } from "@/lib/db";
import { Interview } from "@/models/interview.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        connectDB();
        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        const res = await Interview.find({ user:userId }).sort({ createdAt: -1 });


    return NextResponse.json(res);

    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error on interview-session" }, { status: 500 });
    }
};
