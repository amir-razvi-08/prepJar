import { generateFeedbackChain } from "@/lib/agents/interviewFeedbackAgent";
import { Feedback } from "@/models/feedback.model";
import { Interview } from "@/models/interview.model";
import { FeedbackConversation } from "@/controllers/type";
import { NextResponse } from "next/server";

export const generateFeedback = async (input: FeedbackConversation) => {
    const interviewId = input?.interviewId;
    const transcript = input?.transcript;
    const userId = input?.userId;
    console.log(userId);
    if (!transcript) {
        return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    console.log(transcript);

    const result = await generateFeedbackChain.invoke({ transcript });

    if (!result) throw new Error("Failed to generate interview questions");

    const {
        technicalKnowledge,
        problemSolvingSkills,
        communicationAndClarity,
        confidenceAndDelivery,
        fluencyAndFlow,
        overallScore,
        feedbackSummary,
        suggestionsForImprovement,
    } = result;

    const feedback = await Feedback.create({
        user:userId,
        overallScore,
        technicalKnowledge,
        communicationAndClarity,
        fluencyAndFlow,
        problemSolvingSkills,
        confidenceAndDelivery,
        feedbackSummary,
        suggestions: suggestionsForImprovement,
    });

    if (!feedback) {
        console.error("Feedback creation failed");
        throw new Error("Failed to save interview feedback.");
    }

    const interview = await Interview.findOneAndUpdate({ _id: interviewId }, { feedbackId: feedback._id }, { new: true });

    if (!interview) {
        console.error(`Interview not found or update failed for ID: ${interviewId}`);
        throw new Error("Failed to update interview with feedback ID.");
    }

    return feedback;
};
