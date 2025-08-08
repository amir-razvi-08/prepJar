import { connectDB } from "@/lib/db";
import { Interview } from "@/models/interview.model";
import { User } from "@/models/user.model";
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

        const user = await User.findById(userId).select("credits");
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const result = await Interview.aggregate([
            {
                $match: {
                    user: new mongoose.Types.ObjectId(userId),
                },
            },
            {
                $facet: {
                    totalSessions: [{ $count: "total" }],
                    titleBreakdown: [
                        {
                            $group: {
                                _id: "$interviewTitle",
                                count: { $sum: 1 },
                            },
                        },
                    ],
                    latestInterviews: [
                        { $sort: { createdAt: -1 } },
                        { $limit: 3 },
                        {
                            $project: {
                                _id: 1,
                                user: 1,
                                jobTitle: 1,
                                interviewTitle: 1,
                                technicalSkills: 1,
                                interviewType: 1,
                                duration: 1,
                                createdAt: 1,
                                updatedAt: 1,
                                feedbackId: 1,
                                questionList: 1,
                            },
                        },
                    ],
                },
            },
        ]);

        return NextResponse.json({ credits: user.credits, ...(result[0] ?? {}) });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error on interview-session" }, { status: 500 });
    }
};
