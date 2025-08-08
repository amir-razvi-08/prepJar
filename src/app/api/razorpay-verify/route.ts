import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/transaction.model";
import { getServerUser } from "@/lib/getUser";
import { User } from "@/models/user.model";

const generatedSignature = (orderId: string, paymentId: string) => {
    const secret = process.env.RAZORPAY_SECRET_KEY as string;
    const body = `${orderId}|${paymentId}`;
    return crypto.createHmac("sha256", secret).update(body).digest("hex");
};

export async function POST(req: NextRequest) {
    await connectDB();
    const user = await getServerUser();

    if (!user?.id) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const { orderId, paymentId, razorpaySignature, amount, credits, planName, currency } = await req.json();

    const signature = generatedSignature(orderId, paymentId);
    if (signature !== razorpaySignature) {
        return NextResponse.json({ success: false, message: "Invalid signature" }, { status: 400 });
    }

    const transaction = await Transaction.findOne({ paymentId });

    if (!transaction) {
        const newTransaction = new Transaction({
            user: user.id,
            orderId,
            paymentId,
            razorpaySignature,
            amount,
            credits,
            creditApplied: true,
            planName,
            currency,
            status: "success",
        });

        const existingUser = await User.findById(user.id);
        if (!existingUser) {
            return NextResponse.json({ success: false, message: "User not found during payment verification" }, { status: 404 });
        }

        existingUser.credits += credits;

        await existingUser.save();
        await newTransaction.save();

        return NextResponse.json({ success: true, message: "Payment verified and credits added" });
    }

    if (!transaction.creditApplied) {
        const existingUser = await User.findById(user.id);
        if (!existingUser) {
            return NextResponse.json({ success: false, message: "User not found during payment verification" }, { status: 404 });
        }

        existingUser.credits += credits;
        await existingUser.save();

        transaction.creditApplied = true;
        await transaction.save();

        return NextResponse.json({ success: true, message: "Credits added to existing payment" });
    }

    return NextResponse.json({ success: true, message: "Payment already processed and credits added" });
}
