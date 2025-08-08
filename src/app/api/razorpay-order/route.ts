import { getServerUser } from "@/lib/getUser";
import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET_KEY,
});

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { amount, credits, planName } = body;

        const user = await getServerUser();
        if (!user?.id) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const options = {
            amount: amount * 100,
            currency: "INR",
            receipt: `rcptid_${Date.now()}`,
            notes: {
                userId: user.id,
                credits: credits.toString(),
                planName,
            },
        };

        const order = await razorpay.orders.create(options);
        return NextResponse.json({ order });
        
    } catch (error) {
        console.log("razorpay error", error);
        return NextResponse.json({ error: "Order creation failed" }, { status: 500 });
    }
}
