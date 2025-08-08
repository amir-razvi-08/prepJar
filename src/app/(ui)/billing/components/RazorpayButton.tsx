"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

interface RazorpayButtonProps {
    amount: number;
    credits: number;
    planName: string;
}

interface RazorpayPaymentResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
}

export default function RazorpayButton({ amount, credits, planName }: RazorpayButtonProps) {
    const [loading, setLoading] = useState(false);
    const handlePayment = async () => {
        setLoading(true);
        try {
            const orderRes = await axios.post("/api/razorpay-order", { amount, credits, planName });
            const order = orderRes.data.order;
            console.log("order", order);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount: order.amount,
                currency: "INR",
                name: "PrepJar",
                description: `Purchase ${planName} to add ${credits} Credits`,
                order_id: order.id,
                handler: async function (response: RazorpayPaymentResponse) {
                    try {
                        const verifyRes = await axios.post("/api/razorpay-verify", {
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            razorpaySignature: response.razorpay_signature,
                            amount,
                            credits,
                            planName,
                            currency: "INR",
                        });

                        if (verifyRes.data.success) {
                            toast.success("Payment verified and successful!");
                        } else {
                            toast.warning("Payment verification failed!");
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        toast.warning("Payment verification failed (server error).");
                    }
                },
                prefill: {
                    name: "Test User",
                    email: "test@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            if (typeof window !== "undefined" && window.Razorpay) {
                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                toast.error("Razorpay SDK not loaded. Please try again later.");
            }
        } catch (err) {
            console.error("Order creation failed:", err);
            toast.warning("Unable to initiate payment. Try again.");
        }
        setLoading(false);
    };

    return (
        <Button className="w-full h-12 text-xl cursor-pointer" onClick={handlePayment}>
            {loading ? (
                <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                </>
            ) : (
                `Pay ₹${amount}`
            )}
        </Button>
    );
}
