import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { connectDB } from "@/lib/db";
import { Transaction } from "@/models/transaction.model";
import { User } from "@/models/user.model";

export async function POST(req: NextRequest) {
    try {
        await connectDB();
        const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
        const body = await req.text();

        const signature = req.headers.get("x-razorpay-signature");
        const expectedSignature = crypto.createHmac("sha256", secret).update(body).digest("hex");

        if (signature !== expectedSignature) {
            return NextResponse.json({ success: false, error: "Invalid webhook signature" }, { status: 400 });
        }

        const event = JSON.parse(body);

        if (event.event === "payment.captured") {
            const paymentInfo = event.payload.payment.entity;
            const paymentId = paymentInfo.id;

            const transaction = await Transaction.findOne({ paymentId });

            if (transaction) {
                if (transaction.status === "success" && transaction.creditApplied) {
                    return NextResponse.json({ success: true, message: "Credits already added for this transaction" });
                }

                const user = await User.findById(transaction.user);
                if (!user) {
                    return NextResponse.json({ success: false, message: "User not found in webhook" }, { status: 404 });
                }

                if (!transaction.creditApplied) {
                    user.credits += transaction.credits;
                    transaction.creditApplied = true;
                }

                transaction.status = "success";
                await user.save();
                await transaction.save();

                return NextResponse.json({ success: true, message: "Credits added from existing transaction" });
            }

            const notes = paymentInfo.notes;
            const userId = notes?.userId;
            const planName = notes?.planName;
            const credits = parseInt(notes?.credits);
            const currency = paymentInfo.currency || "INR";
            const amount = paymentInfo.amount / 100;

            if (!userId) {
                return NextResponse.json({ success: false, message: "Missing user ID in Razorpay notes" }, { status: 400 });
            }

            const user = await User.findById(userId);
            if (!user) {
                return NextResponse.json({ success: false, message: "User not found (from Razorpay notes)" }, { status: 404 });
            }

            const newTransaction = new Transaction({
                user: userId,
                orderId: paymentInfo.order_id,
                paymentId: paymentId,
                razorpaySignature: signature,
                amount,
                credits,
                creditApplied: true,
                planName,
                currency,
                status: "success",
            });

            user.credits += credits;

            await newTransaction.save();
            await user.save();

            return NextResponse.json({ success: true, message: "New transaction created and credits added via webhook" });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}
