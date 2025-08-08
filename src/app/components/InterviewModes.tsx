"use client";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setInterview } from "@/redux/features/interviewSlice";
import { useState } from "react";
import { FaLaptopCode, FaUserTie, FaLanguage, FaArrowRight, FaCheckCircle } from "react-icons/fa";
import Loading from "./Loading";
import { toast } from "sonner";

const InterviewModes = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state?.user.user);
    const [isLoading, setIsLoading] = useState(false);

    const handleMode = async (title: string) => {
        if (!user?.email) {
            toast.error("Please login first");
            return;
        }
        setIsLoading(true);
        try {
            if (title === "Technical Interview") {
                const response = await axios.post("/api/interview-ques", {
                    jobTitle: modes[0].jobTitle!,
                    technicalSkills: modes[0].skillSet,
                    interviewTitle: modes[0].title,
                    interviewType: modes[0].interviewType,
                    difficulty: modes[0].difficulty!,
                    duration: modes[0].duration,
                    userEmail: user?.email,
                });
                dispatch(setInterview(response.data.data));
                router.replace("/start-interview");
            } else if (title === "HR Interview") {
                const response = await axios.post("/api/interview-ques", {
                    jobTitle: modes[1].jobTitle!,
                    technicalSkills: modes[1].skillSet,
                    interviewTitle: modes[1].title,
                    interviewType: modes[1].interviewType,
                    difficulty: modes[1].difficulty!,
                    duration: modes[1].duration,
                    userEmail: user?.email,
                });
                dispatch(setInterview(response.data.data));
                router.replace("/start-interview");
            } else {
                toast.info("please wait for upcoming update");
                setIsLoading(false);
                return;
            }
        } catch (error) {
            console.error("Error generating questions:", error);
            setIsLoading(false);
            return;
        }
        setIsLoading(false);
        // router.replace("/start-interview");
    };

    return (
        <section className="py-16 bg-gray-100 text-black" id="modes">
            <div className="container mx-auto px-4 flex flex-col items-center gap-12">
                <h2 className="text-3xl font-bold text-center">Choose Your Interview Mode</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-8">
                    {modes.map((mode, idx) => (
                        <div
                            key={idx}
                            className="interview-card bg-white rounded-xl overflow-hidden 
                            shadow-xl border border-gray-100 transition-transform duration-300"
                        >
                            <div className={`${mode.color} p-6 text-white`}>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{mode.title}</h3>
                                        <p className="opacity-90">{mode.desc}</p>
                                    </div>
                                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">{mode.icon}</div>
                                </div>
                            </div>
                            <div className="p-6">
                                {mode.skillSet.length > 0 && (
                                    <div className="mb-4">
                                        <h4 className="font-semibold mb-2">{"Focus Areas"}</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {mode.skillSet.map((badge, i) => (
                                                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                                                    {badge}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                <div className="mb-6">
                                    <h4 className="font-semibold mb-2">Features</h4>
                                    <ul className="space-y-2 text-sm text-gray-600">
                                        {mode.features.map((feature, i) => (
                                            <li key={i} className="flex items-center">
                                                <FaCheckCircle className="text-green-500 mr-2" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    className={`w-full py-3 cursor-pointer ${mode.buttonClass} text-white rounded-lg font-semibold`}
                                    onClick={() => handleMode(mode.title)}
                                >
                                    {mode.buttonText} <FaArrowRight className="inline ml-2" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-full flex justify-center px-4 md:px-8">
                    <Button
                        className=" w-full h-16 cursor-pointer bg-gradient-to-br from-[#436df6] to-[#a700e3] hover:from-[#355ad2] hover:to-[#9b02d2] font-bold text-xl md:text-2xl transition-all duration-300"
                        onClick={() => router.push("/custom-interview")}
                    >
                        + Custom Interview Practice
                    </Button>
                </div>
            </div>
            {isLoading && <Loading content="Generating interview questions..." />}
        </section>
    );
};

export default InterviewModes;

const modes = [
    {
        title: "Technical Interview",
        jobTitle: "Software Engineer",
        desc: "Coding challenges & system design",
        icon: <FaLaptopCode className="text-2xl text-black" />,
        color: "bg-purple-700",
        skillSet: ["Data Structures", "Algorithms", "Operating Systems", "Computer Networks", "DBMS", "OOPs", "System Design"],
        features: ["Problem Solving & Logic Building", "Computer Science Core Concepts", "Question variety across core CS subjects"],
        buttonClass: "bg-purple-600 hover:bg-purple-700",
        buttonText: "Start Technical Practice",
        interviewType: ["Technical"],
        difficulty: "Medium",
        duration: "30 mins",
    },
    {
        title: "HR Interview",
        jobTitle: "Software Engineer",
        desc: "Behavioral & situational questions",
        icon: <FaUserTie className="text-2xl text-black" />,
        color: "bg-sky-700",
        skillSet: ["Strengths & Weaknesses", "Situational Questions", "Teamwork & Leadership", "Conflict Resolution", "Communication Skills"],
        features: ["Voice response analysis", "STAR method evaluation", "Confidence & tone metrics"],
        buttonClass: "bg-sky-600 hover:bg-sky-700",
        buttonText: "Start HR Practice",
        interviewType: ["HR"],
        difficulty: "Easy",
        duration: "20 mins",
    },
    {
        title: "English Practice",
        desc: "Fluency & pronunciation training",
        icon: <FaLanguage className="text-2xl text-black" />,
        color: "bg-green-600",
        skillSet: ["Fluency Practice", "Voice Interaction", "Real-world Topics", "Grammar Feedback", "Short Sessions", "Speaking Summary"],
        features: ["Real-time corrections", "Accent neutralization", "Conversational practice"],
        buttonClass: "bg-green-600 hover:bg-green-700",
        buttonText: "Start English Practice",
        interviewType: ["english"],
        duration: "20 mins",
    },
];
