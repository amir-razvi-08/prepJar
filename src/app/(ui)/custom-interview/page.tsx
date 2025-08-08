"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SkillSelector from "./components/SkillSelector";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { setInterview } from "@/redux/features/interviewSlice";
import Loading from "@/app/components/Loading";
import { useRouter } from "next/navigation";

const INTERVIEW_TYPES = ["Technical", "HR", "Behavioral", "Managerial", "System Design", "Problem Solving", "Case Study"];
const DIFFICULTY_LEVELS = ["Easy", "Medium", "Hard"];
const DURATIONS = ["5 mins", "15 mins", "30 mins", "45 mins", "60 mins"];

export default function InterviewSetupForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const interviewTitle = "Custom Interview";
    const [formData, setFormData] = useState({
        interviewType: [] as string[],
        jobTitle: "",
        technicalSkills: [] as string[],
        duration: "",
        difficulty: "",
    });

    type formValue = string|string[];

    const handleChange = (field: string, value: formValue) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const toggleInterviewType = (type: string) => {
        setFormData((prev) => {
            const selected = prev.interviewType.includes(type)
                ? prev.interviewType.filter((t) => t !== type)
                : prev.interviewType.length < 3
                ? [...prev.interviewType, type]
                : prev.interviewType;
            return { ...prev, interviewType: selected };
        });
    };

    const user = useAppSelector((state) => state?.user.user);
    const handleSubmit = async () => {
        if (!user?.email) {
            console.error("User email is missing");
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.post("/api/interview-ques", {
                jobTitle: formData.jobTitle,
                technicalSkills: formData.technicalSkills,
                interviewTitle: interviewTitle,
                interviewType: formData.interviewType,
                difficulty: formData.difficulty,
                duration: formData.duration,
                userEmail: user?.email,
            });

            dispatch(setInterview(response.data.data));
        } catch (error) {
            console.error("Error generating questions:", error);
        }
        setIsLoading(false);
        router.replace("/start-interview");
    };

    return (
        <div className="p-8 pt-16 bg-gray-100">
            <div className="w-full space-y-6 p-8 border rounded-2xl shadow-xl bg-white">
                <h2 className="text-2xl font-bold mb-4">Custom Interview Setup</h2>

                <div>
                    <Label className="mb-2">Job Title</Label>
                    <Input placeholder="e.g. Frontend Developer" value={formData.jobTitle} onChange={(e) => handleChange("jobTitle", e.target.value)} />
                </div>

                <div>
                    <Label className="mb-2">Technical Skills</Label>
                    <SkillSelector selected={formData.technicalSkills} onChange={(val) => handleChange("technicalSkills", val)} />
                </div>

                <div>
                    <Label className="mb-2">Interview Type (max 3)</Label>
                    <div className="flex gap-3 flex-wrap mt-2">
                        {INTERVIEW_TYPES.map((type) => {
                            const isSelected = formData.interviewType.includes(type);
                            const isDisabled = !isSelected && formData.interviewType.length >= 3;
                            return (
                                <div
                                    key={type}
                                    onClick={() => !isDisabled && toggleInterviewType(type)}
                                    className={`cursor-pointer flex items-center gap-2 p-1 px-3 rounded-2xl border shadow-sm text-sm
                    ${isSelected ? "bg-purple-100 text-purple-600 border-purple-400" : "bg-white text-gray-800"}
                    ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}
                    hover:bg-gray-100 transition-colors`}
                                >
                                    {type}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Duration */}
                    <div>
                        <Label className="mb-2">Interview Duration</Label>
                        <Select onValueChange={(val) => handleChange("duration", val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Duration" />
                            </SelectTrigger>
                            <SelectContent>
                                {DURATIONS.map((duration) => (
                                    <SelectItem key={duration} value={duration}>
                                        {duration}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Difficulty */}
                    <div>
                        <Label className="mb-2">Difficulty Level</Label>
                        <Select onValueChange={(val) => handleChange("difficulty", val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select Difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                                {DIFFICULTY_LEVELS.map((level) => (
                                    <SelectItem key={level} value={level}>
                                        {level}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Submit */}

                <div className="flex justify-end">
                    <Button className="mt-4" onClick={handleSubmit}>
                        Generate Interview
                    </Button>
                </div>
            </div>
            {isLoading && <Loading content="Generating interview questions..." />}
        </div>
    );
}
