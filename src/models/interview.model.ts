import mongoose, { Schema, model, Types, Document } from "mongoose";

interface IInterview extends Document {
    user: Types.ObjectId;
    feedbackId?: Types.ObjectId;
    jobTitle: string;
    technicalSkills: string[];
    interviewTitle:string,
    interviewType: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    questionList: object[];
    duration:number
    createdAt: Date;
    updatedAt: Date;
}

const InterviewSchema = new Schema<IInterview>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    feedbackId: {
        type: Schema.Types.ObjectId,
        ref: "Feedback",
    },
    jobTitle: {
        type: String,
        required: true,
    },
    technicalSkills: {
        type: [String],
        required: true,
    },
    interviewTitle: {
        type: String,
        required: true,
    },
    interviewType: {
        type: [String],
        enum: ["Technical", "HR", "Behavioral"],
        required: true,
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true,
    },
    questionList: {
        type: [Object],
    },
    duration:{
        type:Number
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const Interview = mongoose.models.Interview || model<IInterview>("Interview", InterviewSchema);
