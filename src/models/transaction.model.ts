import mongoose, { Schema, model, Types, Document } from "mongoose";

interface ITransaction extends Document {
    user: Types.ObjectId;
    orderId: string;
    paymentId: string;
    razorpaySignature: string;
    amount: number;
    currency: string;
    credits: number;
    planName?: string;
    status: "success" | "failed" | "pending";
    creditApplied: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const transactionSchema = new mongoose.Schema<ITransaction>(
    {
        user: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        orderId: { type: String, required: true },
        paymentId: { type: String, required: true, unique: true },
        razorpaySignature: { type: String, required: true },
        amount: { type: Number, required: true },
        currency: { type: String, required: true },
        credits: { type: Number, required: true },
        planName: { type: String },
        status: {
            type: String,
            enum: ["success", "failed", "pending"],
            default: "pending",
        },
        creditApplied: { type: Boolean, default: false },
    },
    { timestamps: true }
);

export const Transaction = mongoose.models.Transaction || model<ITransaction>("Transaction", transactionSchema);
