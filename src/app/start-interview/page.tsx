"use client";
import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { useAppSelector } from "@/redux/hooks";
import { getVapiClient } from "@/lib/vapiClient";
import { startCall } from "./components/constant";
import { toast } from "sonner";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AlertConfirmation from "./components/ConfirmAlert";
import { Phone, User, Bot, Circle } from "lucide-react";
import { useRouter } from "next/navigation";
import Loading from "../components/Loading";
import { IinterviewData } from "./components/type";
import { IvapiMessage } from "./components/type";
import { ConversationMessage } from "./components/type";

interface IinterviewInfo {
    candidateName: string;
    jobPosition: string;
    questionList: string[];
}

console

export default function Home() {
    const vapi = getVapiClient();
    const interviewData: IinterviewData | null = useAppSelector((state) => state.interview.interviewData);
    const user = useAppSelector((state) => state.user.user);
    const [start, setStart] = useState(false);
    const [speaker, setSpeaker] = useState("");
    const conversation = useRef<ConversationMessage[]>([]);
    const [remainingTime, setRemainingTime] = useState((interviewData?.duration || 30) * 60);
    const interviewId = interviewData?._id;
    const userId = user?.id;
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const questionsOnly = interviewData?.questionList.map((q) => q.question) || [];

    const interviewInfo: IinterviewInfo = {
        candidateName: user?.name ?? "Unknown Candidate",
        jobPosition: interviewData?.jobTitle ?? "Unknown Role",
        questionList: questionsOnly,
    };

    const formatTime = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    useEffect(() => {
        if (start && remainingTime > 0) {
            const timer = setInterval(() => {
                setRemainingTime((prev) => {
                    if (prev <= 1) {
                        stopInterview();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [start, remainingTime]);

    useEffect(() => {
        if (questionsOnly.length!==0 && vapi && !start) {
            setStart(true);
            startCall(interviewInfo);
        }
    }, [questionsOnly, vapi]);

    useEffect(() => {
        if (!vapi) return;

        const handleMessage = (message: IvapiMessage) => {
            if (message?.conversation) {
                conversation.current = message.conversation.filter((msg: ConversationMessage) => msg.role !== "system");
            }
        };

        const handleCallStart = () => {
            toast("Call started...");
            setStart(true);
        };

        const handleCallEnd = () => {
            GenerateFeedback(buildTranscript());
        };

        const handleSpeechStart = () => setSpeaker("ai");
        const handleSpeechEnd = () => setSpeaker("user");

        vapi.on("message", handleMessage);
        vapi.on("call-start", handleCallStart);
        vapi.on("call-end", handleCallEnd);
        vapi.on("speech-start", handleSpeechStart);
        vapi.on("speech-end", handleSpeechEnd);

        return () => {
            vapi.off("message", handleMessage);
            vapi.off("call-start", handleCallStart);
            vapi.off("call-end", handleCallEnd);
            vapi.off("speech-start", handleSpeechStart);
            vapi.off("speech-end", handleSpeechEnd);
        };
    }, [vapi]);

    const buildTranscript = () => {
        return conversation.current
            .map((msg) => {
                const speaker = msg.role === "assistant" ? "Interviewer" : "Candidate";
                return `${speaker}: ${msg.content}`;
            })
            .join("\n");
    };

    const stopInterview = () => {
        vapi!.stop();
        GenerateFeedback(buildTranscript());
    };

    const GenerateFeedback = async (transcript: string) => {
        setIsLoading(true);
        try {
            const res = await axios.post("/api/interview-feedback", { transcript, interviewId, userId });
            console.log("feedback==", res.data);
        } catch (error) {
            console.error("Error generating feedback:", error);
        }
        setIsLoading(false);
        router.replace("/dashboard?showFeedback=true");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 overflow-hidden relative font-sans pt-8">
            <div className="fixed inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
                <div
                    className="absolute top-40 right-20 w-24 h-24 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
                    style={{ animationDelay: "1000ms" }}
                ></div>
                <div
                    className="absolute bottom-32 left-1/3 w-40 h-40 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"
                    style={{ animationDelay: "2000ms" }}
                ></div>
            </div>

            {/* Top Navigation Bar */}
            <header className="relative z-10 p-">
                <div className="max-w-7xl mx-auto ">
                    <Card className="bg-transparent rounded-2xl p-4 px-6 shadow-2xl border-white/20 ">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                            <div className="flex-1/2">
                                <h1 className="text-xl md:text-2xl font-bold text-white mb-2">Senior Frontend Developer</h1>
                                <p className="text-gray-300 text-sm md:text-base">Technical Interview • prepJar Inc.</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Circle className="w-4 h-4 fill-green-400 text-green-400 animate-pulse" />
                                <span className="text-green-400 text-lg font-medium">Live</span>
                            </div>
                            <div className="text-right flex-1/2">
                                <div className="text-2xl md:text-3xl font-bold text-green-400 timer-glow">{formatTime(remainingTime)}</div>
                            </div>
                        </div>
                    </Card>
                </div>
            </header>

            <main className="relative z-10 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-16 mt-8">
                        <Card className="bg-transparent rounded-3xl p-8 shadow-xl relative z-10 transition-all duration-500 hover:shadow-purple-400/10 border-white/20">
                            {/* AI Status Indicator */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <Circle className="w-3 h-3 fill-purple-400 text-purple-400 animate-pulse" />
                                    <span className="text-purple-400 text-sm font-medium uppercase tracking-wide">AI Recruiter</span>
                                </div>
                                <Bot className="text-purple-400 text-xl" />
                            </div>

                            {/* AI Avatar */}
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <Avatar className="w-32 h-32 shadow-2xl">
                                        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center">
                                            <Image src="/custom-ai.jpeg" width={120} height={120} className="rounded-full w-32" alt="profile" />
                                        </div>
                                    </Avatar>
                                    {/* Status ring */}
                                    <div
                                        className={`absolute -inset-2 border-4 border-purple-600 rounded-full animate-ping transition-opacity duration-300 ${
                                            speaker === "ai" ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                </div>

                                {/* AI Information */}
                                <h3 className="text-2xl font-bold text-white mb-2">prepJar AI</h3>
                                <p className="text-gray-400 mb-4">Senior Technical Recruiter</p>

                                {/* AI Speaking Status */}
                                <div
                                    className={`flex items-center space-x-2 transition-opacity duration-300 ${
                                        speaker === "ai" ? "opacity-100" : "opacity-0"
                                    }`}
                                >
                                    <div className="flex space-x-1 items-center">
                                        <div className="w-1 h-6 bg-purple-400 rounded-full animate-pulse"></div>
                                        <div className="w-1 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "100ms" }}></div>
                                        <div className="w-1 h-8 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "200ms" }}></div>
                                        <div className="w-1 h-5 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
                                        <div className="w-1 h-7 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "200ms" }}></div>
                                        <div className="w-1 h-4 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
                                    </div>
                                    <span className="text-purple-400 text-sm font-medium">Speaking...</span>
                                </div>
                            </div>
                        </Card>

                        <Card className="bg-transparent rounded-3xl p-8 shadow-xl relative z-10 transition-all duration-500 hover:shadow-green-400/10 border-white/20">
                            {/* Candidate Status Indicator */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center space-x-3">
                                    <Circle className="w-3 h-3 fill-green-400 text-green-400 animate-pulse" />
                                    <span className="text-green-400 text-sm font-medium uppercase tracking-wide">Candidate</span>
                                </div>
                                <User className="text-green-400 text-xl" />
                            </div>

                            {/* Candidate Avatar */}
                            <div className="flex flex-col items-center text-center">
                                <div className="relative mb-4">
                                    <Avatar className="w-32 h-32 shadow-2xl">
                                        <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
                                            <span className="text-white text-4xl font-bold">
                                                <Image
                                                    src={user?.image ?? "/avatar.png"}
                                                    width={120}
                                                    height={120}
                                                    className="rounded-full w-32"
                                                    alt="user_profile"
                                                />
                                            </span>
                                        </div>
                                    </Avatar>
                                    {/* Status ring */}
                                    <div
                                        className={`absolute -inset-2 border-4 border-green-400 rounded-full animate-ping transition-opacity duration-300 ${
                                            speaker === "user" ? "opacity-100" : "opacity-0"
                                        }`}
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-white mb-2">{user?.name}</h3>
                                <p className="text-gray-400 mb-4">{interviewData?.jobTitle ?? "Software Engineer"}</p>

                                <div
                                    className={`flex items-center space-x-2 transition-opacity duration-300 ${
                                        speaker === "user" ? "opacity-100" : "opacity-0"
                                    }`}
                                >
                                    <div className="flex space-x-1 items-center">
                                        <div className="w-1 h-6 bg-green-400 rounded-full animate-pulse"></div>
                                        <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "100ms" }}></div>
                                        <div className="w-1 h-8 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "200ms" }}></div>
                                        <div className="w-1 h-5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
                                        <div className="w-1 h-7 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "200ms" }}></div>
                                        <div className="w-1 h-4 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "300ms" }}></div>
                                    </div>
                                    <span className="text-green-400 text-sm font-medium">Speaking...</span>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </main>
            <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <AlertConfirmation stopInterview={stopInterview}>
                    <Button
                        className="floating-button bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl shadow-2xl transition-all duration-300 hover:shadow-red-500/30 hover:scale-105 glassmorphism border-red-400 border"
                        size="lg"
                    >
                        <Phone className="mr-3 h-5 w-5 rotate-180" />
                        <span className="font-semibold text-lg">End Interview</span>
                    </Button>
                </AlertConfirmation>
            </div>
            {isLoading && <Loading content="Your interview is being submitted. Please wait..." />}
        </div>
    );
}
