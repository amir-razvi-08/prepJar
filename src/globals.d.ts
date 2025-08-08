import { NextResponse } from "next/server";

export {};

declare global {
    interface RazorpayPaymentResponse {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }
}

declare global {
    interface RazorpayOptions {
        key: string;
        amount: number;
        currency?: string;
        name?: string;
        description?: string;
        image?: string;
        order_id?: string;
        handler?: (response: RazorpayPaymentResponse) => void;
        prefill?: {
            name?: string;
            email?: string;
            contact?: string;
        };
        notes?: Record<string>;
        theme?: {
            color?: string;
        };
    }

    interface RazorpayInstance {
        open(): void;
        on(event: string, handler: (...args: any[]) => void): void;
        close(): void;
    }

    interface Window {
        Razorpay?: new (options: RazorpayOptions) => RazorpayInstance;
    }
}
