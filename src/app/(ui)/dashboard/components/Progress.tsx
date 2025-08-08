"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import React from "react";

interface FeedbackAverages {
    averageTechnicalKnowledge?: number;
    averageProblemSolvingSkills?: number;
    averageCommunicationAndClarity?: number;
    averageConfidenceAndDelivery?: number;
    averageFluencyAndFlow?: number;
    averageOverallScore?: number;
}

interface Props {
    avgScore: FeedbackAverages;
}

function Progress({ avgScore }: Props) {
    const progressData = [
        { label: "Technical Knowledge", value: avgScore.averageTechnicalKnowledge },
        { label: "Problem-Solving Ability", value: avgScore.averageProblemSolvingSkills },
        { label: "Communication and Clarity", value: avgScore.averageCommunicationAndClarity },
        { label: "Confidence and Delivery", value: avgScore.averageConfidenceAndDelivery },
        { label: "Fluency and Flow", value: avgScore.averageFluencyAndFlow },
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {progressData.map((skill, i) => (
                    <div key={i} className="space-y-1">
                        <div className="flex justify-between text-sm font-medium text-muted-foreground">
                            <span>{skill.label}</span>
                            <span>{skill.value}%</span>
                        </div>
                        <div className="w-full h-3 rounded-full bg-muted overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.value}%` }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="h-full rounded-full bg-purple-600"
                            />
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}

export default Progress;
