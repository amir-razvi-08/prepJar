"use client";

import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaCode, FaUserTie, FaCommentDots, FaTools } from "react-icons/fa";

interface TitleBreakdownItem {
    _id: string;
    count: number;
}

interface InterviewSummaryProps {
    interviewData?: { [key: number]: TitleBreakdownItem };
}

function InterviewSummary({ interviewData }: InterviewSummaryProps) {
    const interviews = { ...interviewData };
    const interviewTypes = Object.values(interviews);
    const iconMap: Record<string, ReactNode> = {
        "Technical Interview": <FaCode className="text-purple-600 w-4 h-4" />,
        "HR Interview": <FaUserTie className="text-blue-500 w-4 h-4" />,
        "Fluency Session": <FaCommentDots className="text-yellow-500 w-4 h-4" />,
        "Custom Interview": <FaTools className="text-teal-500 w-4 h-4" />,
    };

    const countMap: Record<string, number> = {};
    interviewTypes.forEach((item) => {
        countMap[item._id] = item.count;
    });

    const fixedTitles = ["Technical Interview", "HR Interview", "Fluency Session", "Custom Interview"];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Interview Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {fixedTitles.map((title) => (
                    <div key={title} className="flex items-center justify-between bg-muted/40 p-3 rounded-md border">
                        <div className="flex items-center gap-3 text-muted-foreground font-medium">
                            {iconMap[title] ?? <FaTools className="text-gray-400 w-4 h-4" />}
                            <span>{title}</span>
                        </div>
                        <div className="text-base font-semibold text-gray-900">{countMap[title] ?? 0}</div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default InterviewSummary;
