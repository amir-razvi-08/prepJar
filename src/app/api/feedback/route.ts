import { connectDB } from "@/lib/db";
import { Feedback } from "@/models/feedback.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectDB()
        const { searchParams } = new URL(req.url);
        const feedbackId = searchParams.get("feedbackId");
    
        if (!feedbackId) {
            return NextResponse.json({ error: "Missing feedbackId" }, { status: 400 });
        }
        
        const feedback = await Feedback.findById(feedbackId);

        if(!feedback) NextResponse.json({error:"unable to fetch feedback"},{status:402})
            return NextResponse.json(feedback);
        
    } catch (error) {
        console.log("feedback route error",error)
        NextResponse.json({error:"feedback error"},{status:401})
    }
};
