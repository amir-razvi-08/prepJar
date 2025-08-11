"use client";

import { useState } from "react";
import { PLANS } from "./components/Constants";
import RazorpayButton from "./components/RazorpayButton";

declare global {
    interface RazorpayPaymentResponse {
        razorpay_payment_id: string;
        razorpay_order_id: string;
        razorpay_signature: string;
    }
}

export default function Billing() {
    const [selectedPlan, setSelectedPlan] = useState(PLANS[0]);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            setError("Please enter your name");
            return false;
        }
        if (!formData.email.trim()) {
            setError("Please enter your email");
            return false;
        }
        if (!formData.phone.trim()) {
            setError("Please enter your phone number");
            return false;
        }
        if (typeof selectedPlan.price !== "number") {
            setError("Please contact us for custom pricing");
            return false;
        }
        setError("");
        return true;
    };

    const initiatePayment = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            if (!window.Razorpay) {
                await loadRazorpayScript();
            }

            const amount = selectedPlan.price * 100;

            const response = await fetch("/api/create-razorpay-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: amount,
                    currency: "INR",
                    planId: selectedPlan.id,
                    customer: {
                        name: formData.name,
                        email: formData.email,
                        contact: formData.phone,
                    },
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to create order");
            }

            const { orderId, amount: orderAmount, currency } = await response.json();

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
                amount: orderAmount,
                currency: currency,
                name: "Your Company",
                description: `Subscription: ${selectedPlan.name}`,
                order_id: orderId,
                handler: async function (response: RazorpayPaymentResponse) {
                    try {
                        const verification = await fetch("/api/verify-payment", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                planId: selectedPlan.id,
                                customer: formData,
                            }),
                        });

                        const result = await verification.json();
                        if (result.success) {
                            window.location.href = `/payment-success?payment_id=${response.razorpay_payment_id}&plan=${selectedPlan.id}`;
                        } else {
                            alert("Payment verification failed. Please contact support.");
                        }
                    } catch (err) {
                        console.error("Verification error:", err);
                        alert("There was an error verifying your payment. Please contact support.");
                    }
                },
                prefill: {
                    name: formData.name,
                    email: formData.email,
                    contact: formData.phone,
                },
                notes: {
                    plan: selectedPlan.name,
                },
                theme: {
                    color: "#6366f1",
                },
            };

            const rzp = new window.Razorpay!(options);
            rzp.on("payment.failed", function (response) {
                alert(`Payment failed: ${response.error.description}`);
            });
            rzp.open();
        } catch (error) {
            console.error("Payment error:", error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Payment failed. Please try again.");
            }
        }
    };

    const loadRazorpayScript = (): Promise<void> => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => {
                resolve();
            };
            script.onerror = () => {
                throw new Error("Failed to load Razorpay script");
            };
            document.body.appendChild(script);
        });
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">Simple, transparent pricing</h1>
                        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">Choose the perfect plan for your business needs</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
                        {PLANS.map((plan) => (
                            <div
                                key={plan.id}
                                className={`relative rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full ring-2 ring-indigo-500 md:-mt-2 md:mb-2`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg">
                                        Most Popular
                                    </div>
                                )}
                                <div className={`p-6 ${plan.color}`}>
                                    <h2 className={`text-lg font-semibold ${plan.textColor}`}>{plan.name}</h2>
                                    <div className="mb-4">
                                        {plan.discount > 0 ? (
                                            <>
                                                <p className="text-sm text-muted-foreground line-through">₹{plan.price}</p>
                                                <div className="flex items-end gap-1">
                                                    <h3 className="text-2xl font-bold">₹{(plan.price * (1 - plan.discount / 100)).toFixed(0)}</h3>
                                                    <span className="text-sm text-red-500 font-medium">({plan.discount}% OFF)</span>
                                                </div>
                                            </>
                                        ) : (
                                            <h3 className="text-2xl font-bold">₹{plan.price}</h3>
                                        )}
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <ul className="space-y-4 flex-grow">
                                        {plan.features.map((feature) => (
                                            <li key={feature} className="flex items-start">
                                                <svg className={`h-5 w-5 flex-shrink-0 ${plan.textColor}`} fill="currentColor" viewBox="0 0 20 20">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                                <span className="ml-3 text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8">
                                        <button
                                            onClick={() => setSelectedPlan(plan)}
                                            className={`w-full flex items-center justify-center px-6 py-3 border rounded-md text-base font-medium ${
                                                plan.id === selectedPlan.id
                                                    ? "bg-indigo-600 text-white border-indigo-600"
                                                    : "bg-white text-indigo-600 border-indigo-600 hover:bg-indigo-50"
                                            }`}
                                        >
                                            {plan.id === selectedPlan.id ? (
                                                <>
                                                    <svg
                                                        className="-ml-1 mr-2 h-5 w-5"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        viewBox="0 0 20 20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    Selected
                                                </>
                                            ) : (
                                                "Select Plan"
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Payment Form */}
                    <div className="mt-16 max-w-2xl mx-auto">
                        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                            <div className="p-8 sm:p-10">
                                <div className="text-center mb-8">
                                    <h2 className="text-2xl font-bold text-gray-900">Complete Your {selectedPlan.name} Subscription</h2>
                                    <p className="mt-2 text-gray-600">Enter your details to get started</p>
                                </div>

                                {error && <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-md">{error}</div>}

                                <form onSubmit={initiatePayment} className="space-y-6">
                                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                                Email Address
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="john@example.com"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                required
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="block w-full px-4 py-3 rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                                                placeholder="+91 9876543210"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="block text-sm font-medium text-gray-700">Selected Plan</label>
                                            <div className="px-4 py-3 bg-gray-50 rounded-md h-full flex flex-col justify-center">
                                                <p className="font-medium text-gray-900">{selectedPlan.name}</p>
                                                <p className="text-sm text-gray-500"></p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-4 w-full flex justify-center">
                                        <RazorpayButton
                                            amount={selectedPlan.price * (1 - selectedPlan.discount / 100)}
                                            credits={selectedPlan.credits}
                                            planName={selectedPlan.name}
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-16 text-center">
                        <div className="inline-flex flex-wrap justify-center items-center divide-x divide-gray-200">
                            <div className="px-5 py-2">
                                <svg className="h-8 w-8 mx-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M3 5a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm11 1H6v8l4-2 4 2V6z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">Secure Payments</p>
                            </div>
                            <div className="px-5 py-2">
                                <svg className="h-8 w-8 mx-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">Instant Activation</p>
                            </div>
                            <div className="px-5 py-2">
                                <svg className="h-8 w-8 mx-auto text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                                    <path
                                        fillRule="evenodd"
                                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <p className="mt-2 text-sm text-gray-500">24/7 Support</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
