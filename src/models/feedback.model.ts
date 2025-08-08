import mongoose, { Schema, Document, model, Types } from "mongoose";

interface IFeedback extends Document {
    user: Types.ObjectId;
    overallScore: number;
    technicalKnowledge: number;
    communicationAndClarity: number;
    fluencyAndFlow: number;
    problemSolvingSkills: number;
    confidenceAndDelivery: number;
    feedbackSummary: string[];
    suggestions: string[];
}

const FeedbackSchema: Schema<IFeedback> = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        overallScore: {
            type: Number,
            required: true,
        },
        technicalKnowledge: {
            type: Number,
            required: true,
        },
        communicationAndClarity: {
            type: Number,
            required: true,
        },
        fluencyAndFlow: {
            type: Number,
            required: true,
        },
        problemSolvingSkills: {
            type: Number,
            required: true,
        },
        confidenceAndDelivery: {
            type: Number,
            required: true,
        },
        feedbackSummary: {
            type: [String],
            required: true,
        },
        suggestions: {
            type: [String],
            required: true,
        },
    },
    { timestamps: true }
);

export const Feedback = mongoose.models.Feedback || model<IFeedback>("Feedback", FeedbackSchema);
