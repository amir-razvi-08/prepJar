import { NextResponse } from "next/server";
import { generateInterviewQuestions } from "@/controllers/question.controller";
import { connectDB } from "@/lib/db";
import { getServerUser } from "@/lib/getUser";
import { User } from "@/models/user.model";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        await connectDB();

        const user = await getServerUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const existingUser = await User.findById(user?.id);

        if (!existingUser) {
            return NextResponse.json({ error: "user not found in question generation" }, { status: 404 });
        }

        if (existingUser.credits <= 0) {
            console.log("not enought credits");
            return NextResponse.json({ error: "Not enough credits" }, { status: 403 });
        }

        const interviewData = await generateInterviewQuestions(body);
        if (!interviewData) return NextResponse.json({ error: "question not generated" }, { status: 402 });

        existingUser.credits -= 1;
        await existingUser.save();

        return NextResponse.json({ success: true, data: interviewData }, { status: 200 });
    } catch (error) {
        console.log("error in question generation", error);

        return NextResponse.json(
            {
                success: false,
                message:"error during quesiton generation",
            },
            { status: 500 }
        );
    }
}
