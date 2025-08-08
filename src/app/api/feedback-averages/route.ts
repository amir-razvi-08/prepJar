import { connectDB } from "@/lib/db";
import { Feedback } from "@/models/feedback.model";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        await connectDB();

        const { searchParams } = new URL(req.url);
        const userId = searchParams.get("userId");

        if (!userId) {
            return NextResponse.json({ error: "Missing userId" }, { status: 400 });
        }

        const result = await Feedback.aggregate([
            { $match: { user: new mongoose.Types.ObjectId(userId) } },
            {
                $group: {
                    _id: null,
                    averageTechnicalKnowledge: { $avg: "$technicalKnowledge" },
                    averageCommunicationAndClarity: { $avg: "$communicationAndClarity" },
                    averageFluencyAndFlow: { $avg: "$fluencyAndFlow" },
                    averageProblemSolvingSkills: { $avg: "$problemSolvingSkills" },
                    averageConfidenceAndDelivery: { $avg: "$confidenceAndDelivery" },
                    averageOverallScore: { $avg: "$overallScore" },
                },
            },
            {
                $project: {
                    _id: 0,
                    averageTechnicalKnowledge: { $round: ["$averageTechnicalKnowledge", 0] },
                    averageCommunicationAndClarity: { $round: ["$averageCommunicationAndClarity", 0] },
                    averageFluencyAndFlow: { $round: ["$averageFluencyAndFlow", 0] },
                    averageProblemSolvingSkills: { $round: ["$averageProblemSolvingSkills", 0] },
                    averageConfidenceAndDelivery: { $round: ["$averageConfidenceAndDelivery", 0] },
                    averageOverallScore: 1,
                },
            },
        ]);

        return NextResponse.json(result[0] ?? {});
    } catch (error) {
        console.error("Error:", error);
        
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
};
